// Small reference-data resources: sources, teachers, packages, tags.
import { Router } from 'express';
import { all, one, run, transaction } from '../db.js';
import { uid, nowISO } from '../lib/util.js';
import { requireRole } from '../lib/authMiddleware.js';
import { ah } from '../lib/asyncHandler.js';

const router = Router();

// ---- sources ---------------------------------------------------------------
router.get('/sources', ah(async (req, res) => {
  const rows = await all('SELECT * FROM sources ORDER BY name');
  res.json({ sources: rows.map((s) => ({ id: s.id, name: s.name, icon: s.icon })) });
}));
router.post('/sources', requireRole('admin', 'manager'), ah(async (req, res) => {
  const { name, icon } = req.body || {};
  if (!name) return res.status(400).json({ error: 'Nome obrigatório' });
  const id = uid('src');
  await run('INSERT INTO sources (id, name, icon, created_at) VALUES (?,?,?,?)', [id, name, icon || null, nowISO()]);
  res.status(201).json({ id });
}));
async function deleteSourceCascade(id) {
  await run('UPDATE leads SET source_id = NULL WHERE source_id = ?', [id]);
  await run('DELETE FROM sources WHERE id = ?', [id]);
}

router.delete('/sources/:id', requireRole('admin', 'manager'), ah(async (req, res) => {
  await transaction(() => deleteSourceCascade(req.params.id));
  res.json({ ok: true });
}));

router.post('/sources/bulk-delete', requireRole('admin', 'manager'), ah(async (req, res) => {
  const ids = [...new Set(req.body?.ids || [])];
  if (!ids.length) return res.status(400).json({ error: 'Nenhuma fonte selecionada' });
  await transaction(async () => { for (const id of ids) await deleteSourceCascade(id); });
  res.json({ ok: true, count: ids.length });
}));

// ---- teachers ---------------------------------------------------------------
router.get('/teachers', ah(async (req, res) => {
  const rows = await all('SELECT * FROM teachers ORDER BY name');
  res.json({ teachers: rows.map((t) => ({ id: t.id, name: t.name, email: t.email, levels: t.levels, active: !!t.active })) });
}));
router.post('/teachers', requireRole('admin', 'manager'), ah(async (req, res) => {
  const b = req.body || {};
  if (!b.name) return res.status(400).json({ error: 'Nome obrigatório' });
  const id = uid('tch');
  const now = nowISO();
  await run('INSERT INTO teachers (id, name, email, levels, active, created_at, updated_at) VALUES (?,?,?,?,1,?,?)', [id, b.name, b.email || '', b.levels || '', now, now]);
  res.status(201).json({ id });
}));
router.put('/teachers/:id', requireRole('admin', 'manager'), ah(async (req, res) => {
  const t = await one('SELECT * FROM teachers WHERE id = ?', [req.params.id]);
  if (!t) return res.status(404).json({ error: 'Professor não encontrado' });
  const b = req.body || {};
  await run('UPDATE teachers SET name=?, email=?, levels=?, active=?, updated_at=? WHERE id=?', [
    b.name ?? t.name, b.email ?? t.email, b.levels ?? t.levels, b.active === undefined ? t.active : (b.active ? 1 : 0), nowISO(), t.id,
  ]);
  res.json({ ok: true });
}));

// Deleting a teacher clears the reference from anything that pointed to
// them (leads, trial classes, enrollments, and any user account linked as
// this teacher) rather than blocking — those records stay, just without a
// teacher assigned.
async function deleteTeacherCascade(id) {
  await run('UPDATE leads SET teacher_id = NULL WHERE teacher_id = ?', [id]);
  await run('UPDATE trial_classes SET teacher_id = NULL WHERE teacher_id = ?', [id]);
  await run('UPDATE enrollments SET teacher_id = NULL WHERE teacher_id = ?', [id]);
  await run('UPDATE users SET teacher_id = NULL WHERE teacher_id = ?', [id]);
  await run('DELETE FROM teachers WHERE id = ?', [id]);
}

router.delete('/teachers/:id', requireRole('admin', 'manager'), ah(async (req, res) => {
  await transaction(() => deleteTeacherCascade(req.params.id));
  res.json({ ok: true });
}));

router.post('/teachers/bulk-delete', requireRole('admin', 'manager'), ah(async (req, res) => {
  const ids = [...new Set(req.body?.ids || [])];
  if (!ids.length) return res.status(400).json({ error: 'Nenhum professor selecionado' });
  await transaction(async () => { for (const id of ids) await deleteTeacherCascade(id); });
  res.json({ ok: true, count: ids.length });
}));

// ---- packages ---------------------------------------------------------------
router.get('/packages', ah(async (req, res) => {
  const rows = await all('SELECT * FROM packages ORDER BY price');
  res.json({ packages: rows.map((p) => ({ id: p.id, name: p.name, description: p.description, hoursPerWeek: p.hours_per_week, durationMonths: p.duration_months, price: p.price })) });
}));
router.post('/packages', requireRole('admin', 'manager'), ah(async (req, res) => {
  const b = req.body || {};
  if (!b.name) return res.status(400).json({ error: 'Nome obrigatório' });
  const id = uid('pkg');
  await run('INSERT INTO packages (id, name, description, hours_per_week, duration_months, price, created_at) VALUES (?,?,?,?,?,?,?)', [
    id, b.name, b.description || '', b.hoursPerWeek || null, b.durationMonths || null, b.price || null, nowISO(),
  ]);
  res.status(201).json({ id });
}));

router.put('/packages/:id', requireRole('admin', 'manager'), ah(async (req, res) => {
  const p = await one('SELECT * FROM packages WHERE id = ?', [req.params.id]);
  if (!p) return res.status(404).json({ error: 'Pacote não encontrado' });
  const b = req.body || {};
  await run('UPDATE packages SET name=?, description=?, hours_per_week=?, duration_months=?, price=? WHERE id=?', [
    b.name ?? p.name, b.description ?? p.description,
    b.hoursPerWeek === undefined ? p.hours_per_week : (Number(b.hoursPerWeek) || null),
    b.durationMonths === undefined ? p.duration_months : (Number(b.durationMonths) || null),
    b.price === undefined ? p.price : (Number(b.price) || null),
    p.id,
  ]);
  res.json({ ok: true });
}));

async function deletePackageCascade(id) {
  await run('UPDATE proposals SET package_id = NULL WHERE package_id = ?', [id]);
  await run('UPDATE enrollments SET package_id = NULL WHERE package_id = ?', [id]);
  await run('DELETE FROM packages WHERE id = ?', [id]);
}

router.delete('/packages/:id', requireRole('admin', 'manager'), ah(async (req, res) => {
  await transaction(() => deletePackageCascade(req.params.id));
  res.json({ ok: true });
}));

router.post('/packages/bulk-delete', requireRole('admin', 'manager'), ah(async (req, res) => {
  const ids = [...new Set(req.body?.ids || [])];
  if (!ids.length) return res.status(400).json({ error: 'Nenhum pacote selecionado' });
  await transaction(async () => { for (const id of ids) await deletePackageCascade(id); });
  res.json({ ok: true, count: ids.length });
}));

// ---- tags ---------------------------------------------------------------------
router.get('/tags', ah(async (req, res) => {
  res.json({ tags: await all('SELECT * FROM tags ORDER BY name') });
}));
router.post('/tags', requireRole('admin', 'manager', 'agent'), ah(async (req, res) => {
  const { name, color } = req.body || {};
  if (!name) return res.status(400).json({ error: 'Nome obrigatório' });
  const id = uid('tag');
  await run('INSERT INTO tags (id, name, color) VALUES (?,?,?)', [id, name, color || '#2F6FED']);
  res.status(201).json({ id });
}));

export default router;
