// Small reference-data resources: sources, teachers, packages, tags.
import { Router } from 'express';
import { all, one, run } from '../db.js';
import { uid, nowISO } from '../lib/util.js';
import { requireRole } from '../lib/authMiddleware.js';

const router = Router();

// ---- sources ---------------------------------------------------------------
router.get('/sources', (req, res) => {
  res.json({ sources: all('SELECT * FROM sources ORDER BY name').map((s) => ({ id: s.id, name: s.name, icon: s.icon })) });
});
router.post('/sources', requireRole('admin', 'manager'), (req, res) => {
  const { name, icon } = req.body || {};
  if (!name) return res.status(400).json({ error: 'Nome obrigatório' });
  const id = uid('src');
  run('INSERT INTO sources (id, name, icon, created_at) VALUES (?,?,?,?)', [id, name, icon || '✨', nowISO()]);
  res.status(201).json({ id });
});
router.delete('/sources/:id', requireRole('admin', 'manager'), (req, res) => {
  try {
    run('DELETE FROM sources WHERE id = ?', [req.params.id]);
  } catch {
    return res.status(409).json({ error: 'Esta fonte já está sendo usada por leads cadastrados e não pode ser removida.' });
  }
  res.json({ ok: true });
});

// ---- teachers ---------------------------------------------------------------
router.get('/teachers', (req, res) => {
  res.json({ teachers: all('SELECT * FROM teachers ORDER BY name').map((t) => ({ id: t.id, name: t.name, email: t.email, levels: t.levels, active: !!t.active })) });
});
router.post('/teachers', requireRole('admin', 'manager'), (req, res) => {
  const b = req.body || {};
  if (!b.name) return res.status(400).json({ error: 'Nome obrigatório' });
  const id = uid('tch');
  const now = nowISO();
  run('INSERT INTO teachers (id, name, email, levels, active, created_at, updated_at) VALUES (?,?,?,?,1,?,?)', [id, b.name, b.email || '', b.levels || '', now, now]);
  res.status(201).json({ id });
});
router.put('/teachers/:id', requireRole('admin', 'manager'), (req, res) => {
  const t = one('SELECT * FROM teachers WHERE id = ?', [req.params.id]);
  if (!t) return res.status(404).json({ error: 'Professor não encontrado' });
  const b = req.body || {};
  run('UPDATE teachers SET name=?, email=?, levels=?, active=?, updated_at=? WHERE id=?', [
    b.name ?? t.name, b.email ?? t.email, b.levels ?? t.levels, b.active === undefined ? t.active : (b.active ? 1 : 0), nowISO(), t.id,
  ]);
  res.json({ ok: true });
});

// ---- packages ---------------------------------------------------------------
router.get('/packages', (req, res) => {
  res.json({ packages: all('SELECT * FROM packages ORDER BY price').map((p) => ({ id: p.id, name: p.name, description: p.description, hoursPerWeek: p.hours_per_week, durationMonths: p.duration_months, price: p.price })) });
});
router.post('/packages', requireRole('admin', 'manager'), (req, res) => {
  const b = req.body || {};
  if (!b.name) return res.status(400).json({ error: 'Nome obrigatório' });
  const id = uid('pkg');
  run('INSERT INTO packages (id, name, description, hours_per_week, duration_months, price, created_at) VALUES (?,?,?,?,?,?,?)', [
    id, b.name, b.description || '', b.hoursPerWeek || null, b.durationMonths || null, b.price || null, nowISO(),
  ]);
  res.status(201).json({ id });
});

// ---- tags ---------------------------------------------------------------------
router.get('/tags', (req, res) => {
  res.json({ tags: all('SELECT * FROM tags ORDER BY name') });
});
router.post('/tags', requireRole('admin', 'manager', 'agent'), (req, res) => {
  const { name, color } = req.body || {};
  if (!name) return res.status(400).json({ error: 'Nome obrigatório' });
  const id = uid('tag');
  run('INSERT INTO tags (id, name, color) VALUES (?,?,?)', [id, name, color || '#2F6FED']);
  res.status(201).json({ id });
});

export default router;
