import { Router } from 'express';
import { all, one, run } from '../db.js';
import { uid, nowISO } from '../lib/util.js';
import { queryLeads, countLeads } from '../lib/leadQuery.js';
import { requireRole } from '../lib/authMiddleware.js';
import { ah } from '../lib/asyncHandler.js';

const router = Router();

router.get('/segments', ah(async (req, res) => {
  const raw = await all('SELECT * FROM segments ORDER BY name');
  const rows = raw.map((s) => ({
    id: s.id, name: s.name, description: s.description, filters: JSON.parse(s.filters_json || '{}'),
  }));
  const segments = await Promise.all(rows.map(async (s) => ({ ...s, count: await countLeads(s.filters) })));
  res.json({ segments });
}));

router.post('/segments', requireRole('admin', 'manager', 'agent'), ah(async (req, res) => {
  const b = req.body || {};
  if (!b.name || !b.filters) return res.status(400).json({ error: 'Nome e filtros são obrigatórios' });
  const id = uid('seg');
  const now = nowISO();
  await run('INSERT INTO segments (id, name, description, filters_json, created_at, updated_at) VALUES (?,?,?,?,?,?)', [
    id, b.name, b.description || '', JSON.stringify(b.filters), now, now,
  ]);
  res.status(201).json({ id });
}));

router.delete('/segments/:id', requireRole('admin', 'manager', 'agent'), ah(async (req, res) => {
  await run('DELETE FROM segments WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
}));

router.post('/segments/bulk-delete', requireRole('admin', 'manager', 'agent'), ah(async (req, res) => {
  const ids = [...new Set(req.body?.ids || [])];
  if (!ids.length) return res.status(400).json({ error: 'Nenhum segmento selecionado' });
  for (const id of ids) await run('DELETE FROM segments WHERE id = ?', [id]);
  res.json({ ok: true, count: ids.length });
}));

router.get('/segments/:id/leads', ah(async (req, res) => {
  const s = await one('SELECT * FROM segments WHERE id = ?', [req.params.id]);
  if (!s) return res.status(404).json({ error: 'Segmento não encontrado' });
  const filters = JSON.parse(s.filters_json || '{}');
  const rows = await queryLeads(filters);
  res.json({
    leads: rows.map((l) => ({ id: l.id, name: l.name, whatsapp: l.whatsapp, status: l.status, sourceName: l.source_name, objective: l.objective })),
  });
}));

export default router;
