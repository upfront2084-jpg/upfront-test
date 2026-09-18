import { Router } from 'express';
import { all, one, run, transaction } from '../db.js';
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

// Hard delete. The leads/tasks/campaigns this person owned belong to the
// school, not to their user account, so they're never deleted with it:
// they're reassigned to `reassignToUserId` when given, or left unassigned
// otherwise. Notes/interactions are historical log entries (who wrote
// what, when) — those always just lose the author reference, never get
// reassigned, since re-attributing past history to someone else would be
// inaccurate.
router.delete('/users/:id', requireRole('admin'), (req, res) => {
  const u = one('SELECT * FROM users WHERE id = ?', [req.params.id]);
  if (!u) return res.status(404).json({ error: 'Usuário não encontrado' });
  if (u.id === req.user.id) return res.status(400).json({ error: 'Você não pode excluir seu próprio usuário' });
  if (u.role === 'admin') {
    const otherAdmins = one("SELECT COUNT(*) as n FROM users WHERE role = 'admin' AND active = 1 AND id != ?", [u.id]);
    if (otherAdmins.n === 0) return res.status(400).json({ error: 'Não é possível excluir o único administrador ativo' });
  }
  const { reassignToUserId } = req.body || {};
  let targetId = null;
  if (reassignToUserId) {
    const target = one('SELECT id FROM users WHERE id = ? AND active = 1', [reassignToUserId]);
    if (!target) return res.status(400).json({ error: 'Usuário de destino inválido' });
    if (target.id === u.id) return res.status(400).json({ error: 'Escolha um usuário diferente do que está sendo excluído' });
    targetId = target.id;
  }
  transaction(() => {
    run('UPDATE leads SET owner_user_id = ? WHERE owner_user_id = ?', [targetId, u.id]);
    run('UPDATE tasks SET assigned_user_id = ? WHERE assigned_user_id = ?', [targetId, u.id]);
    run('UPDATE campaigns SET responsible_user_id = ? WHERE responsible_user_id = ?', [targetId, u.id]);
    run('UPDATE interactions SET user_id = NULL WHERE user_id = ?', [u.id]);
    run('UPDATE notes SET user_id = NULL WHERE user_id = ?', [u.id]);
    run('DELETE FROM users WHERE id = ?', [u.id]);
  });
  res.json({ ok: true });
});

export default router;
