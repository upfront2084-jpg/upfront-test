import { Router } from 'express';
import { one } from '../db.js';
import { verifyPassword } from '../lib/password.js';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Informe e-mail e senha' });
  const user = one('SELECT * FROM users WHERE email = ?', [String(email).toLowerCase().trim()]);
  if (!user || !user.active || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'E-mail ou senha inválidos' });
  }
  req.session.userId = user.id;
  const { password_hash, ...safe } = user;
  res.json({ user: safe });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

router.get('/me', (req, res) => {
  if (!req.session?.userId) return res.json({ user: null });
  const user = one('SELECT id, name, email, role, teacher_id, active FROM users WHERE id = ?', [req.session.userId]);
  res.json({ user: user && user.active ? user : null });
});

export default router;
