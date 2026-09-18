import { Router } from 'express';
import { queryLeads } from '../lib/leadQuery.js';
import { scopeForUser } from '../lib/authMiddleware.js';
import { ah } from '../lib/asyncHandler.js';

const router = Router();

router.get('/search', ah(async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json({ leads: [] });
  const scope = scopeForUser(req.user);
  const rows = await queryLeads({ ...scope, search: q }, { limit: 12 });
  res.json({
    leads: rows.map((l) => ({ id: l.id, name: l.name, whatsapp: l.whatsapp, email: l.email, status: l.status })),
  });
}));

export default router;
