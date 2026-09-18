import { Router } from 'express';
import { all, one, run, transaction } from '../db.js';
import { uid, nowISO, todayISO } from '../lib/util.js';
import { queryLeads, countLeads, recoveryEligibleFilters } from '../lib/leadQuery.js';
import { requireRole } from '../lib/authMiddleware.js';
import { ah } from '../lib/asyncHandler.js';

const router = Router();

function resolveFilters(f = {}) {
  // Campaign audiences are always opt-out-respecting recovery-style filters.
  return recoveryEligibleFilters(f);
}

// POST /api/campaigns/preview -- "antes de enviar, mostrar quantos contatos serão atingidos"
router.post('/campaigns/preview', ah(async (req, res) => {
  const filters = resolveFilters(req.body?.filters || {});
  const total = await countLeads(filters);
  const rows = await queryLeads(filters, { limit: 8 });
  const sample = rows.map((l) => ({ id: l.id, name: l.name, status: l.status, lastContactDate: l.last_contact_date }));
  res.json({ total, sample });
}));

router.get('/campaigns', ah(async (req, res) => {
  const rows = await all(
    `SELECT c.*, u.name as responsible_name,
       (SELECT COUNT(*) FROM campaign_recipients r WHERE r.campaign_id = c.id) as recipient_count,
       (SELECT COUNT(*) FROM campaign_recipients r WHERE r.campaign_id = c.id AND r.responded = 1) as responded_count,
       (SELECT COUNT(*) FROM campaign_recipients r WHERE r.campaign_id = c.id AND r.enrolled = 1) as enrolled_count,
       (SELECT COUNT(*) FROM campaign_recipients r WHERE r.campaign_id = c.id AND r.scheduled_trial = 1) as scheduled_count
     FROM campaigns c LEFT JOIN users u ON u.id = c.responsible_user_id ORDER BY c.date DESC`
  );
  res.json({
    campaigns: rows.map((c) => ({
      id: c.id, name: c.name, targetDescription: c.target_description, date: c.date, message: c.message,
      channel: c.channel, responsibleUserId: c.responsible_user_id, responsibleName: c.responsible_name,
      status: c.status, recipientCount: c.recipient_count, respondedCount: c.responded_count,
      enrolledCount: c.enrolled_count, scheduledCount: c.scheduled_count,
    })),
  });
}));

router.get('/campaigns/:id', ah(async (req, res) => {
  const c = await one('SELECT * FROM campaigns WHERE id = ?', [req.params.id]);
  if (!c) return res.status(404).json({ error: 'Campanha não encontrada' });
  const recipients = await all(
    `SELECT r.*, l.name as lead_name, l.whatsapp, l.status as lead_status FROM campaign_recipients r
     JOIN leads l ON l.id = r.lead_id WHERE r.campaign_id = ? ORDER BY l.name`,
    [c.id]
  );
  res.json({
    campaign: {
      id: c.id, name: c.name, targetDescription: c.target_description, date: c.date, message: c.message,
      channel: c.channel, responsibleUserId: c.responsible_user_id, filters: JSON.parse(c.filters_json || '{}'), status: c.status,
    },
    recipients: recipients.map((r) => ({
      id: r.id, leadId: r.lead_id, leadName: r.lead_name, whatsapp: r.whatsapp, leadStatus: r.lead_status,
      sentStatus: r.sent_status, responded: !!r.responded, interested: !!r.interested,
      scheduledTrial: !!r.scheduled_trial, enrolled: !!r.enrolled, respondedAt: r.responded_at,
    })),
  });
}));

router.post('/campaigns', requireRole('admin', 'manager', 'agent'), ah(async (req, res) => {
  const b = req.body || {};
  if (!b.name) return res.status(400).json({ error: 'Nome da campanha é obrigatório' });
  const filters = resolveFilters(b.filters || {});
  const leadIds = b.leadIds?.length ? b.leadIds : (await queryLeads(filters)).map((l) => l.id);
  if (!leadIds.length) return res.status(400).json({ error: 'Nenhum lead corresponde ao público selecionado' });

  const id = uid('cmp');
  const now = nowISO();
  await run(
    `INSERT INTO campaigns (id, name, target_description, date, message, channel, responsible_user_id, filters_json, status, created_at, updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [id, b.name, b.targetDescription || '', b.date || todayISO(), b.message || '', b.channel || 'WhatsApp',
      b.responsibleUserId || req.user.id, JSON.stringify(b.filters || {}), 'Enviada', now, now]
  );
  const recStmt = `INSERT INTO campaign_recipients (id, campaign_id, lead_id, sent_status, responded, interested, scheduled_trial, enrolled, responded_at, created_at) VALUES (?,?,?,?,0,0,0,0,NULL,?)`;
  for (const leadId of leadIds) {
    await run(recStmt, [uid('crc'), id, leadId, 'Enviado', now]);
    await run('INSERT INTO interactions (id, lead_id, type, note, user_id, datetime) VALUES (?,?,?,?,?,?)', [
      uid('int'), leadId, 'campanha', `Incluído na campanha "${b.name}"`, req.user.id, now,
    ]);
  }
  res.status(201).json({ id, recipientCount: leadIds.length });
}));

router.put('/campaigns/:id', requireRole('admin', 'manager', 'agent'), ah(async (req, res) => {
  const c = await one('SELECT * FROM campaigns WHERE id = ?', [req.params.id]);
  if (!c) return res.status(404).json({ error: 'Campanha não encontrada' });
  const b = req.body || {};
  await run('UPDATE campaigns SET name=?, message=?, channel=?, status=?, updated_at=? WHERE id=?', [
    b.name ?? c.name, b.message ?? c.message, b.channel ?? c.channel, b.status ?? c.status, nowISO(), c.id,
  ]);
  res.json({ ok: true });
}));

// record a recipient's outcome (responded / interested / scheduled trial / enrolled)
router.put('/campaigns/:id/recipients/:recipientId', ah(async (req, res) => {
  const rec = await one('SELECT * FROM campaign_recipients WHERE id = ? AND campaign_id = ?', [req.params.recipientId, req.params.id]);
  if (!rec) return res.status(404).json({ error: 'Destinatário não encontrado' });
  const b = req.body || {};
  const now = nowISO();
  await run(
    'UPDATE campaign_recipients SET responded=?, interested=?, scheduled_trial=?, enrolled=?, responded_at=? WHERE id=?',
    [
      b.responded !== undefined ? (b.responded ? 1 : 0) : rec.responded,
      b.interested !== undefined ? (b.interested ? 1 : 0) : rec.interested,
      b.scheduledTrial !== undefined ? (b.scheduledTrial ? 1 : 0) : rec.scheduled_trial,
      b.enrolled !== undefined ? (b.enrolled ? 1 : 0) : rec.enrolled,
      b.responded || b.interested || b.scheduledTrial || b.enrolled ? now : rec.responded_at,
      rec.id,
    ]
  );
  // A lead that responds positively to a recovery campaign comes back to
  // an active stage automatically (future automation hook, applied inline for now).
  if (b.interested || b.scheduledTrial) {
    const lead = await one('SELECT * FROM leads WHERE id = ?', [rec.lead_id]);
    if (lead && lead.status === 'recuperacao') {
      await run('UPDATE leads SET status = ?, last_stage_change_at = ?, last_contact_date = ? WHERE id = ?', [
        b.scheduledTrial ? 'experimental_agendada' : 'em_conversa', now, todayISO(), lead.id,
      ]);
      await run('INSERT INTO interactions (id, lead_id, type, note, user_id, datetime) VALUES (?,?,?,?,?,?)', [
        uid('int'), lead.id, 'campanha', 'Lead recuperado através de campanha de recuperação', req.user.id, now,
      ]);
    }
  }
  res.json({ ok: true });
}));

async function deleteCampaignCascade(id) {
  await run('DELETE FROM campaign_recipients WHERE campaign_id = ?', [id]);
  await run('DELETE FROM campaigns WHERE id = ?', [id]);
}

router.delete('/campaigns/:id', requireRole('admin', 'manager'), ah(async (req, res) => {
  const c = await one('SELECT id FROM campaigns WHERE id = ?', [req.params.id]);
  if (!c) return res.status(404).json({ error: 'Campanha não encontrada' });
  await transaction(() => deleteCampaignCascade(c.id));
  res.json({ ok: true });
}));

router.post('/campaigns/bulk-delete', requireRole('admin', 'manager'), ah(async (req, res) => {
  const ids = [...new Set(req.body?.ids || [])];
  if (!ids.length) return res.status(400).json({ error: 'Nenhuma campanha selecionada' });
  await transaction(async () => {
    for (const id of ids) await deleteCampaignCascade(id);
  });
  res.json({ ok: true, count: ids.length });
}));

export default router;
