import { Router } from 'express';
import { all, one, run } from '../db.js';
import { uid, nowISO } from '../lib/util.js';
import { requireRole } from '../lib/authMiddleware.js';
import { hashPassword } from '../lib/password.js';

const router = Router();

function serialize(u) {
  return { id: u.id, name: u.name, email: u.email, role: u.role, teacherId: u.teacher_id, active: !!u.active };
}

router.get('/users', (req, res) => {
  res.json({ users: all('SELECT * FROM users ORDER BY role, name').map(serialize) });
});

router.post('/users', requireRole('admin'), (req, res) => {
  const b = req.body || {};
  if (!b.name || !b.email || !b.role) return res.status(400).json({ error: 'Nome, e-mail e perfil são obrigatórios' });
  if (!['admin', 'manager', 'agent', 'teacher'].includes(b.role)) return res.status(400).json({ error: 'Perfil inválido' });
  const existing = one('SELECT id FROM users WHERE email = ?', [b.email.toLowerCase()]);
  if (existing) return res.status(409).json({ error: 'Já existe um usuário com este e-mail' });
  const id = uid('usr');
  const now = nowISO();
  run(
    'INSERT INTO users (id, name, email, password_hash, role, teacher_id, active, created_at, updated_at) VALUES (?,?,?,?,?,?,1,?,?)',
    [id, b.name, b.email.toLowerCase(), hashPassword(b.password || 'upfront123'), b.role, b.teacherId || null, now, now]
  );
  res.status(201).json({ id });
});

router.put('/users/:id', requireRole('admin'), (req, res) => {
  const u = one('SELECT * FROM users WHERE id = ?', [req.params.id]);
  if (!u) return res.status(404).json({ error: 'Usuário não encontrado' });
  const b = req.body || {};
  run('UPDATE users SET name=?, role=?, teacher_id=?, active=?, updated_at=? WHERE id=?', [
    b.name ?? u.name, b.role ?? u.role, b.teacherId ?? u.teacher_id, b.active === undefined ? u.active : (b.active ? 1 : 0), nowISO(), u.id,
  ]);
  res.json({ ok: true });
});

export default router;
