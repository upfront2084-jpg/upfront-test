// Leads perdidos agrupados por motivo — dá ao time uma forma rápida de
// puxar o WhatsApp de cada lead perdido para reengajar manualmente,
// separados por categoria em vez de uma lista única sem contexto.
import { Router } from 'express';
import { queryLeads, countLeads } from '../lib/leadQuery.js';
import { LOST_REASONS } from '../lib/constants.js';
import { scopeForUser } from '../lib/authMiddleware.js';
import { ah } from '../lib/asyncHandler.js';

const router = Router();

router.get('/lost/summary', ah(async (req, res) => {
  const scope = scopeForUser(req.user);
  const reasons = await Promise.all(LOST_REASONS.map(async (r) => ({
    key: r.key,
    label: r.label,
    count: await countLeads({ ...scope, status: ['perdido'], lostReason: r.key }),
  })));
  const total = await countLeads({ ...scope, status: ['perdido'] });
  res.json({ reasons, total });
}));

router.get('/lost/leads', ah(async (req, res) => {
  const scope = scopeForUser(req.user);
  const filters = {
    ...scope,
    status: ['perdido'],
    ...(req.query.lostReason ? { lostReason: req.query.lostReason } : {}),
    ...(req.query.sourceId ? { sourceId: req.query.sourceId } : {}),
    ...(req.query.search ? { search: req.query.search } : {}),
  };
  const rows = await queryLeads(filters, { orderBy: 'leads.last_stage_change_at DESC' });
  res.json({
    leads: rows.map((l) => ({
      id: l.id, name: l.name, whatsapp: l.whatsapp, email: l.email, lostReason: l.lost_reason,
      sourceName: l.source_name, lastContactDate: l.last_contact_date, lastStageChangeAt: l.last_stage_change_at,
      ownerName: l.owner_name, objective: l.objective,
    })),
  });
}));

export default router;
