import { one } from '../db.js';
import { ah } from './asyncHandler.js';

// Wrapped with ah() here (rather than at each call site) since this is
// used directly as app-level middleware, not through a router.METHOD
// registration — nothing else would catch a rejected lookup.
export const requireAuth = ah(async (req, res, next) => {
  const userId = req.session?.userId;
  if (!userId) return res.status(401).json({ error: 'Não autenticado' });
  const user = await one('SELECT id, name, username, email, role, teacher_id, active FROM users WHERE id = ?', [userId]);
  if (!user || !user.active) return res.status(401).json({ error: 'Não autenticado' });
  req.user = user;
  next();
});

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Não autenticado' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Sem permissão para esta ação' });
    }
    next();
  };
}

// Teachers only see leads/trials tied to them; agents only see leads they
// own; managers/admins see everything. Applied where list endpoints need
// row-level scoping.
export function scopeForUser(user) {
  if (user.role === 'admin' || user.role === 'manager') return {};
  if (user.role === 'agent') return { ownerUserId: user.id };
  if (user.role === 'teacher') return { teacherId: user.teacher_id };
  return {};
}
