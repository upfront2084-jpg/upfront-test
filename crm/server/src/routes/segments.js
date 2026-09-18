import { Router } from 'express';
import { all, one, run } from '../db.js';
import { uid, nowISO } from '../lib/util.js';
import { queryLeads, countLeads } from '../lib/leadQuery.js';
import { requireRole } from '../lib/authMiddleware.js';

const router = Router();

router.get('/segments', (req, res) => {
  const rows = all('SELECT * FROM segments ORDER BY name').map((s) => ({
    id: s.id, name: s.name, description: s.description, filters: JSON.parse(s.filters_json || '{}'),
  }));
  res.json({
    segments: rows.map((s) => ({ ...s, count: countLeads(s.filters) })),
  });
});

router.post('/segments', requireRole('admin', 'manager', 'agent'), (req, res) => {
  const b = req.body || {};
  if (!b.name || !b.filters) return res.status(400).json({ error: 'Nome e filtros são obrigatórios' });
  const id = uid('seg');
  const now = nowISO();
  run('INSERT INTO segments (id, name, description, filters_json, created_at, updated_at) VALUES (?,?,?,?,?,?)', [
    id, b.name, b.description || '', JSON.stringify(b.filters), now, now,
  ]);
  res.status(201).json({ id });
});

router.delete('/segments/:id', requireRole('admin', 'manager', 'agent'), (req, res) => {
  run('DELETE FROM segments WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

router.post('/segments/bulk-delete', requireRole('admin', 'manager', 'agent'), (req, res) => {
  const ids = [...new Set(req.body?.ids || [])];
  if (!ids.length) return res.status(400).json({ error: 'Nenhum segmento selecionado' });
  for (const id of ids) run('DELETE FROM segments WHERE id = ?', [id]);
  res.json({ ok: true, count: ids.length });
});

router.get('/segments/:id/leads', (req, res) => {
  const s = one('SELECT * FROM segments WHERE id = ?', [req.params.id]);
  if (!s) return res.status(404).json({ error: 'Segmento não encontrado' });
  const filters = JSON.parse(s.filters_json || '{}');
  const rows = queryLeads(filters);
  res.json({
    leads: rows.map((l) => ({ id: l.id, name: l.name, whatsapp: l.whatsapp, status: l.status, sourceName: l.source_name, objective: l.objective })),
  });
});

export default router;
