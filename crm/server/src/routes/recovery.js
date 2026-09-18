import { Router } from 'express';
import { queryLeads, countLeads, recoveryEligibleFilters } from '../lib/leadQuery.js';
import { RECOVERY_BUCKETS } from '../lib/constants.js';
import { scopeForUser } from '../lib/authMiddleware.js';
import { ah } from '../lib/asyncHandler.js';

const router = Router();

function bucketFilters(bucketKey) {
  const bucket = RECOVERY_BUCKETS.find((b) => b.key === bucketKey);
  if (!bucket) return {};
  return { daysSinceContactMin: bucket.min, daysSinceContactMax: isFinite(bucket.max) ? bucket.max : undefined };
}

router.get('/recovery/summary', ah(async (req, res) => {
  const scope = scopeForUser(req.user);
  const summary = await Promise.all(RECOVERY_BUCKETS.map(async (b) => ({
    key: b.key,
    label: b.label,
    count: await countLeads(recoveryEligibleFilters({ ...scope, ...bucketFilters(b.key) })),
  })));
  res.json({ buckets: summary });
}));

router.get('/recovery/leads', ah(async (req, res) => {
  const scope = scopeForUser(req.user);
  const filters = recoveryEligibleFilters({
    ...scope,
    ...(req.query.bucket ? bucketFilters(req.query.bucket) : { daysSinceContactMin: 7 }),
    ...(req.query.sourceId ? { sourceId: req.query.sourceId } : {}),
    ...(req.query.objective ? { objective: req.query.objective } : {}),
    ...(req.query.search ? { search: req.query.search } : {}),
  });
  const rows = await queryLeads(filters, { orderBy: 'leads.last_contact_date ASC' });
  res.json({
    leads: rows.map((l) => ({
      id: l.id, name: l.name, whatsapp: l.whatsapp, status: l.status, sourceName: l.source_name,
      lastContactDate: l.last_contact_date, trialsDone: l.trials_done, lastProposalStatus: l.last_proposal_status,
      ownerName: l.owner_name, objective: l.objective,
    })),
  });
}));

export default router;
