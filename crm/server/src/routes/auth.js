import { Router } from 'express';
import { one } from '../db.js';
import { verifyPassword } from '../lib/password.js';
import { ah } from '../lib/asyncHandler.js';

const router = Router();

router.post('/login', ah(async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha' });
  const user = await one('SELECT * FROM users WHERE username = ?', [String(username).toLowerCase().trim()]);
  if (!user || !user.active || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }
  req.session.userId = user.id;
  const { password_hash, ...safe } = user;
  res.json({ user: safe });
}));

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

router.get('/me', ah(async (req, res) => {
  if (!req.session?.userId) return res.json({ user: null });
  const user = await one('SELECT id, name, username, email, role, teacher_id, active FROM users WHERE id = ?', [req.session.userId]);
  res.json({ user: user && user.active ? user : null });
}));

export default router;
