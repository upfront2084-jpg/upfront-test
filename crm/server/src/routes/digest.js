// Single-purpose endpoint for the scheduled daily check-in: returns exactly
// what that summary needs (overdue/due-today tasks, long-stalled leads,
// recently lost leads) in one call, authenticated with a static bearer
// token (DIGEST_TOKEN env var) instead of a user login — this runs
// unattended from a scheduled job, not from a person's browser session.
import { Router } from 'express';
import { all } from '../db.js';
import { todayISO } from '../lib/util.js';
import { queryLeads } from '../lib/leadQuery.js';
import { recoveryEligibleFilters } from '../lib/leadQuery.js';
import { ah } from '../lib/asyncHandler.js';

const router = Router();

function requireDigestToken(req, res, next) {
  const token = process.env.DIGEST_TOKEN;
  if (!token) return res.status(503).json({ error: 'DIGEST_TOKEN não configurado no servidor' });
  const header = req.headers.authorization || '';
  const provided = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (provided !== token) return res.status(401).json({ error: 'Token inválido' });
  next();
}

router.get('/digest', requireDigestToken, ah(async (req, res) => {
  const today = todayISO();

  const taskRows = await all(
    `SELECT tasks.*, leads.name as lead_name FROM tasks
     LEFT JOIN leads ON leads.id = tasks.lead_id
     WHERE tasks.status = 'Pendente' AND tasks.due_date <= ?
     ORDER BY tasks.due_date ASC`,
    [today]
  );
  const overdue = taskRows.filter((t) => t.due_date < today).map(serializeTask);
  const dueToday = taskRows.filter((t) => t.due_date === today).map(serializeTask);

  const staleRows = await queryLeads(
    recoveryEligibleFilters({ daysSinceContactMin: 60 }),
    { orderBy: 'leads.last_contact_date ASC' }
  );
  const staleLeads = staleRows.map((l) => ({
    name: l.name, whatsapp: l.whatsapp, lastContactDate: l.last_contact_date, ownerName: l.owner_name,
  }));

  const threeDaysAgo = new Date(Date.now() - 3 * 86400000).toISOString();
  const lostRows = await queryLeads({ status: ['perdido'] }, { orderBy: 'leads.last_stage_change_at DESC' });
  const recentLost = lostRows
    .filter((l) => l.last_stage_change_at >= threeDaysAgo)
    .map((l) => ({ name: l.name, lostReason: l.lost_reason, lastStageChangeAt: l.last_stage_change_at }));

  res.json({ generatedAt: new Date().toISOString(), tasks: { overdue, dueToday }, staleLeads, recentLost });
}));

function serializeTask(t) {
  return { title: t.title, leadName: t.lead_name, dueDate: t.due_date };
}

export default router;
