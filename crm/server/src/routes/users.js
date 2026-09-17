import { Router } from 'express';
import { all, one, run } from '../db.js';
import { uid, nowISO } from '../lib/util.js';
import { requireRole } from '../lib/authMiddleware.js';
import { hashPassword } from '../lib/password.js';

const router = Router();

function serialize(u) {
  return { id: u.id, name: u.name, username: u.username, email: u.email, role: u.role, teacherId: u.teacher_id, active: !!u.active };
}

function normalizeUsername(v) {
  return String(v || '').toLowerCase().trim();
}

router.get('/users', (req, res) => {
  res.json({ users: all('SELECT * FROM users ORDER BY role, name').map(serialize) });
});

router.post('/users', requireRole('admin'), (req, res) => {
  const b = req.body || {};
  const username = normalizeUsername(b.username);
  if (!b.name || !username || !b.role) return res.status(400).json({ error: 'Nome, usuário e perfil são obrigatórios' });
  if (!b.password || b.password.length < 4) return res.status(400).json({ error: 'Defina uma senha com pelo menos 4 caracteres' });
  if (!['admin', 'manager', 'agent', 'teacher'].includes(b.role)) return res.status(400).json({ error: 'Perfil inválido' });
  if (!/^[a-z0-9._-]+$/.test(username)) return res.status(400).json({ error: 'Usuário deve ter só letras, números, ponto, hífen ou underline' });
  const existing = one('SELECT id FROM users WHERE username = ?', [username]);
  if (existing) return res.status(409).json({ error: 'Já existe um usuário com esse nome de login' });
  const id = uid('usr');
  const now = nowISO();
  run(
    'INSERT INTO users (id, name, username, email, password_hash, role, teacher_id, active, created_at, updated_at) VALUES (?,?,?,?,?,?,?,1,?,?)',
    [id, b.name, username, b.email || null, hashPassword(b.password), b.role, b.teacherId || null, now, now]
  );
  res.status(201).json({ id });
});

router.put('/users/:id', requireRole('admin'), (req, res) => {
  const u = one('SELECT * FROM users WHERE id = ?', [req.params.id]);
  if (!u) return res.status(404).json({ error: 'Usuário não encontrado' });
  const b = req.body || {};
  let username = u.username;
  if (b.username !== undefined) {
    username = normalizeUsername(b.username);
    if (!username) return res.status(400).json({ error: 'Usuário não pode ficar vazio' });
    if (!/^[a-z0-9._-]+$/.test(username)) return res.status(400).json({ error: 'Usuário deve ter só letras, números, ponto, hífen ou underline' });
    const clash = one('SELECT id FROM users WHERE username = ? AND id != ?', [username, u.id]);
    if (clash) return res.status(409).json({ error: 'Já existe um usuário com esse nome de login' });
  }
  run('UPDATE users SET name=?, username=?, role=?, teacher_id=?, active=?, updated_at=? WHERE id=?', [
    b.name ?? u.name, username, b.role ?? u.role, b.teacherId ?? u.teacher_id, b.active === undefined ? u.active : (b.active ? 1 : 0), nowISO(), u.id,
  ]);
  res.json({ ok: true });
});

// Admin resets/sets a user's password directly (this app has no self-serve
// "forgot password" flow — the admin owns and hands out credentials).
router.put('/users/:id/password', requireRole('admin'), (req, res) => {
  const u = one('SELECT id FROM users WHERE id = ?', [req.params.id]);
  if (!u) return res.status(404).json({ error: 'Usuário não encontrado' });
  const { password } = req.body || {};
  if (!password || password.length < 4) return res.status(400).json({ error: 'Defina uma senha com pelo menos 4 caracteres' });
  run('UPDATE users SET password_hash=?, updated_at=? WHERE id=?', [hashPassword(password), nowISO(), u.id]);
  res.json({ ok: true });
});

export default router;
