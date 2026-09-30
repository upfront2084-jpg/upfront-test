// Token-authenticated endpoints for the automation that runs outside a
// person's browser session (the scheduled daily check-in, and quick lead
// creation from a chat with Claude) — both use a static bearer token
// (DIGEST_TOKEN env var) instead of a user login.
import { Router } from 'express';
import { all, one, run } from '../db.js';
import { uid, nowISO, todayISO } from '../lib/util.js';
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

// Quick lead creation for the "talk to Claude, it fills the CRM" flow —
// Claude parses the free text itself and posts the structured fields here.
// sourceName is resolved case-insensitively against the sources table so
// Claude doesn't need to look up ids first.
router.post('/quick-lead', requireDigestToken, ah(async (req, res) => {
  const b = req.body || {};
  if (!b.name) return res.status(400).json({ error: 'Nome é obrigatório' });

  let sourceId = b.sourceId || null;
  if (!sourceId && b.sourceName) {
    const src = await one('SELECT id FROM sources WHERE LOWER(name) = LOWER(?)', [b.sourceName]);
    sourceId = src?.id || null;
  }

  const id = uid('lead');
  const now = nowISO();
  const today = todayISO();
  await run(
    `INSERT INTO leads (id, name, whatsapp, email, entry_date, source_id, campaign_origin, owner_user_id, teacher_id,
       city, age, english_level, objective, notes, status, last_contact_date, next_contact_date, next_action,
       opt_out, last_stage_change_at, created_at, updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id, b.name, b.whatsapp || '', b.email || '', today, sourceId, b.campaignOrigin || '',
      null, null, b.city || '', b.age || null, b.englishLevel || '',
      b.objective || '', b.notes || '', 'novo_lead', today, today, 'Fazer primeiro contato',
      0, now, now, now,
    ]
  );
  await run('INSERT INTO interactions (id, lead_id, type, note, user_id, datetime) VALUES (?,?,?,?,?,?)', [
    uid('int'), id, 'criacao', 'Lead cadastrado via assistente Claude', null, now,
  ]);

  const row = (await queryLeads({ ids: [id] }))[0];
  res.status(201).json({ id, name: row.name, sourceName: row.source_name });
}));

export default router;
