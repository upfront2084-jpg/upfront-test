import { Router } from 'express';
import { db, one, all, run, transaction } from '../db.js';
import { uid, nowISO, todayISO } from '../lib/util.js';
import { queryLeads, countLeads, buildLeadWhere } from '../lib/leadQuery.js';
import { scopeForUser, requireRole } from '../lib/authMiddleware.js';
import { STAGE_LABELS } from '../lib/constants.js';

const router = Router();

function leadTagIds(leadId) {
  return all('SELECT tag_id FROM lead_tags WHERE lead_id = ?', [leadId]).map((r) => r.tag_id);
}

function logInteraction({ leadId, type, note, userId }) {
  const row = { id: uid('int'), leadId, type, note: note || '', userId: userId || null, datetime: nowISO() };
  run('INSERT INTO interactions (id, lead_id, type, note, user_id, datetime) VALUES (?,?,?,?,?,?)', [
    row.id, row.leadId, row.type, row.note, row.userId, row.datetime,
  ]);
  return row;
}

function serializeLead(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    whatsapp: row.whatsapp,
    email: row.email,
    entryDate: row.entry_date,
    sourceId: row.source_id,
    sourceName: row.source_name,
    sourceIcon: row.source_icon,
    campaignOrigin: row.campaign_origin,
    ownerUserId: row.owner_user_id,
    ownerName: row.owner_name,
    teacherId: row.teacher_id,
    teacherName: row.teacher_name,
    city: row.city,
    age: row.age,
    englishLevel: row.english_level,
    objective: row.objective,
    notes: row.notes,
    status: row.status,
    lastContactDate: row.last_contact_date,
    nextContactDate: row.next_contact_date,
    nextAction: row.next_action,
    optOut: !!row.opt_out,
    lastStageChangeAt: row.last_stage_change_at,
    lastProposalStatus: row.last_proposal_status,
    trialsDone: row.trials_done,
    lastCampaignId: row.last_campaign_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    tagIds: leadTagIds(row.id),
  };
}

function parseListFilters(q) {
  const f = {};
  if (q.status) f.status = String(q.status).split(',').filter(Boolean);
  if (q.excludeStatus) f.excludeStatus = String(q.excludeStatus).split(',').filter(Boolean);
  if (q.sourceId) f.sourceId = q.sourceId;
  if (q.ownerUserId) f.ownerUserId = q.ownerUserId;
  if (q.teacherId) f.teacherId = q.teacherId;
  if (q.objective) f.objective = q.objective;
  if (q.englishLevel) f.englishLevel = q.englishLevel;
  if (q.city) f.city = q.city;
  if (q.entryDateFrom) f.entryDateFrom = q.entryDateFrom;
  if (q.entryDateTo) f.entryDateTo = q.entryDateTo;
  if (q.daysSinceContactMin) f.daysSinceContactMin = Number(q.daysSinceContactMin);
  if (q.daysSinceContactMax) f.daysSinceContactMax = Number(q.daysSinceContactMax);
  if (q.hadTrial === 'true') f.hadTrial = true;
  if (q.notEnrolled === 'true') f.notEnrolled = true;
  if (q.proposalStatus) f.proposalStatus = q.proposalStatus;
  if (q.tagId) f.tagId = q.tagId;
  if (q.lastCampaignId) f.lastCampaignId = q.lastCampaignId;
  if (q.search) f.search = q.search;
  return f;
}

// GET /api/leads
router.get('/leads', (req, res) => {
  const scope = scopeForUser(req.user);
  const filters = { ...parseListFilters(req.query), ...scope };
  const page = Math.max(1, Number(req.query.page) || 1);
  const pageSize = Math.min(200, Number(req.query.pageSize) || 50);
  const orderBy = req.query.sort === 'name' ? 'leads.name ASC'
    : req.query.sort === 'nextContact' ? 'leads.next_contact_date ASC'
    : req.query.sort === 'lastContact' ? 'leads.last_contact_date ASC'
    : 'leads.entry_date DESC';
  const rows = queryLeads(filters, { orderBy, limit: pageSize, offset: (page - 1) * pageSize });
  const total = countLeads(filters);
  res.json({ leads: rows.map(serializeLead), total, page, pageSize });
});

// GET /api/leads/kanban -- all open leads grouped, ignoring pagination
router.get('/leads/kanban', (req, res) => {
  const scope = scopeForUser(req.user);
  const rows = queryLeads(scope, { orderBy: 'leads.last_stage_change_at DESC' });
  res.json({ leads: rows.map(serializeLead) });
});

router.get('/leads/:id', (req, res) => {
  const row = queryLeads({ ids: [req.params.id] })[0];
  if (!row) return res.status(404).json({ error: 'Lead não encontrado' });
  const scope = scopeForUser(req.user);
  if (scope.ownerUserId && row.owner_user_id !== scope.ownerUserId) return res.status(403).json({ error: 'Sem acesso a este lead' });
  if (scope.teacherId && row.teacher_id !== scope.teacherId) return res.status(403).json({ error: 'Sem acesso a este lead' });

  const lead = serializeLead(row);
  lead.trials = all(
    'SELECT t.*, teachers.name as teacher_name FROM trial_classes t LEFT JOIN teachers ON teachers.id = t.teacher_id WHERE t.lead_id = ? ORDER BY t.date DESC, t.created_at DESC',
    [lead.id]
  ).map((t) => ({ id: t.id, status: t.status, date: t.date, time: t.time, teacherId: t.teacher_id, teacherName: t.teacher_name, levelIdentified: t.level_identified, objective: t.objective, teacherNotes: t.teacher_notes, result: t.result, createdAt: t.created_at, updatedAt: t.updated_at }));
  lead.proposals = all('SELECT * FROM proposals WHERE lead_id = ? ORDER BY date DESC', [lead.id])
    .map((p) => ({ id: p.id, date: p.date, packageId: p.package_id, packageLabel: p.package_label, value: p.value, paymentMethod: p.payment_method, specialCondition: p.special_condition, decisionDate: p.decision_date, status: p.status }));
  lead.enrollment = one('SELECT * FROM enrollments WHERE lead_id = ? ORDER BY enrollment_date DESC LIMIT 1', [lead.id]);
  if (lead.enrollment) {
    lead.enrollment = {
      id: lead.enrollment.id, enrollmentDate: lead.enrollment.enrollment_date, startDate: lead.enrollment.start_date,
      packageId: lead.enrollment.package_id, teacherId: lead.enrollment.teacher_id, frequency: lead.enrollment.frequency,
      scheduleText: lead.enrollment.schedule_text, monthlyValue: lead.enrollment.monthly_value,
      paymentMethod: lead.enrollment.payment_method, startingClass: lead.enrollment.starting_class, notes: lead.enrollment.notes,
    };
  }
  lead.student = one('SELECT * FROM students WHERE lead_id = ?', [lead.id]);
  lead.notes_list = all('SELECT * FROM notes WHERE lead_id = ? ORDER BY datetime DESC', [lead.id])
    .map((n) => ({ id: n.id, text: n.text, userId: n.user_id, datetime: n.datetime }));
  const interactions = all('SELECT * FROM interactions WHERE lead_id = ? ORDER BY datetime ASC', [lead.id])
    .map((i) => ({ id: i.id, type: i.type, note: i.note, userId: i.user_id, datetime: i.datetime }));
  lead.timeline = interactions;
  lead.tasks = all('SELECT * FROM tasks WHERE lead_id = ? ORDER BY due_date ASC', [lead.id])
    .map((t) => ({ id: t.id, title: t.title, type: t.type, dueDate: t.due_date, dueTime: t.due_time, assignedUserId: t.assigned_user_id, note: t.note, status: t.status }));
  res.json({ lead });
});

router.post('/leads', requireRole('admin', 'manager', 'agent'), (req, res) => {
  const b = req.body || {};
  if (!b.name) return res.status(400).json({ error: 'Nome é obrigatório' });
  const id = uid('lead');
  const now = nowISO();
  const today = todayISO();
  run(
    `INSERT INTO leads (id, name, whatsapp, email, entry_date, source_id, campaign_origin, owner_user_id, teacher_id,
       city, age, english_level, objective, notes, status, last_contact_date, next_contact_date, next_action,
       opt_out, last_stage_change_at, created_at, updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id, b.name, b.whatsapp || '', b.email || '', b.entryDate || today, b.sourceId || null, b.campaignOrigin || '',
      b.ownerUserId || req.user.id, b.teacherId || null, b.city || '', b.age || null, b.englishLevel || '',
      b.objective || '', b.notes || '', 'novo_lead', today, b.nextContactDate || today, b.nextAction || 'Fazer primeiro contato',
      b.optOut ? 1 : 0, now, now, now,
    ]
  );
  logInteraction({ leadId: id, type: 'criacao', note: `Lead cadastrado manualmente${b.sourceId ? '' : ''}`, userId: req.user.id });
  const row = queryLeads({ ids: [id] })[0];
  res.status(201).json({ lead: serializeLead(row) });
});

const EDITABLE_FIELDS = {
  name: 'name', whatsapp: 'whatsapp', email: 'email', entryDate: 'entry_date', sourceId: 'source_id',
  campaignOrigin: 'campaign_origin', ownerUserId: 'owner_user_id', teacherId: 'teacher_id', city: 'city',
  age: 'age', englishLevel: 'english_level', objective: 'objective', notes: 'notes',
  lastContactDate: 'last_contact_date', nextContactDate: 'next_contact_date', nextAction: 'next_action',
  optOut: 'opt_out',
};

router.put('/leads/:id', (req, res) => {
  const lead = one('SELECT * FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  if (req.user.role === 'teacher') return res.status(403).json({ error: 'Professores não podem editar dados do lead' });

  const b = req.body || {};
  const sets = [];
  const params = [];
  for (const [key, col] of Object.entries(EDITABLE_FIELDS)) {
    if (key in b) {
      sets.push(`${col} = ?`);
      params.push(key === 'optOut' ? (b[key] ? 1 : 0) : b[key]);
    }
  }
  if (!sets.length) return res.json({ lead: serializeLead(queryLeads({ ids: [lead.id] })[0]) });
  sets.push('updated_at = ?');
  params.push(nowISO());
  params.push(lead.id);
  run(`UPDATE leads SET ${sets.join(', ')} WHERE id = ?`, params);
  res.json({ lead: serializeLead(queryLeads({ ids: [lead.id] })[0]) });
});

// Removes a lead and everything tied to it (trial classes, proposals,
// enrollment/student record, campaign participation, tasks, notes,
// interaction log). Deliberately destructive — a real delete, not a soft
// one — shared by the single-lead and bulk-delete routes below.
function cascadeDeleteLead(id) {
  run('DELETE FROM campaign_recipients WHERE lead_id = ?', [id]);
  run('DELETE FROM enrollments WHERE lead_id = ?', [id]);
  run('DELETE FROM students WHERE lead_id = ?', [id]);
  run('DELETE FROM proposals WHERE lead_id = ?', [id]);
  run('DELETE FROM trial_classes WHERE lead_id = ?', [id]);
  run('DELETE FROM tasks WHERE lead_id = ?', [id]);
  run('DELETE FROM notes WHERE lead_id = ?', [id]);
  run('DELETE FROM interactions WHERE lead_id = ?', [id]);
  run('DELETE FROM lead_tags WHERE lead_id = ?', [id]);
  run('DELETE FROM leads WHERE id = ?', [id]);
}

router.delete('/leads/:id', requireRole('admin', 'manager'), (req, res) => {
  const lead = one('SELECT id FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  transaction(() => cascadeDeleteLead(lead.id));
  res.json({ ok: true });
});

// Bulk delete: either an explicit list of ids (checkboxes on the current
// page), or the same filter shape the leads list uses (the "select all N
// that match this filter" case) so we never have to ship thousands of ids
// to the client just to select them.
router.post('/leads/bulk-delete', requireRole('admin', 'manager'), (req, res) => {
  const { ids, filters } = req.body || {};
  let targetIds = [];
  if (Array.isArray(ids) && ids.length) {
    targetIds = [...new Set(ids)];
  } else if (filters) {
    const scope = scopeForUser(req.user);
    targetIds = queryLeads({ ...parseListFilters(filters), ...scope }).map((r) => r.id);
  }
  if (targetIds.length === 0) return res.status(400).json({ error: 'Nenhum lead selecionado' });
  transaction(() => { for (const id of targetIds) cascadeDeleteLead(id); });
  res.json({ ok: true, count: targetIds.length });
});

// ---- stage transitions (Kanban) -----------------------------------------
router.post('/leads/:id/stage', (req, res) => {
  const lead = one('SELECT * FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  if (req.user.role === 'teacher') return res.status(403).json({ error: 'Sem permissão' });
  const { status, note } = req.body || {};
  const valid = ['novo_lead', 'primeiro_contato', 'em_conversa', 'experimental_agendada', 'experimental_realizada', 'proposta_enviada', 'negociacao', 'matriculado', 'perdido', 'recuperacao'];
  if (!valid.includes(status)) return res.status(400).json({ error: 'Etapa inválida' });
  const now = nowISO();
  run('UPDATE leads SET status = ?, last_stage_change_at = ?, last_contact_date = ?, updated_at = ? WHERE id = ?', [
    status, now, todayISO(), now, lead.id,
  ]);
  logInteraction({
    leadId: lead.id, type: 'etapa',
    note: note || `Etapa alterada de "${STAGE_LABELS[lead.status] || lead.status}" para "${STAGE_LABELS[status] || status}"`,
    userId: req.user.id,
  });
  res.json({ lead: serializeLead(queryLeads({ ids: [lead.id] })[0]) });
});

// ---- notes ---------------------------------------------------------------
router.post('/leads/:id/notes', (req, res) => {
  const lead = one('SELECT id FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  const text = (req.body?.text || '').trim();
  if (!text) return res.status(400).json({ error: 'Nota vazia' });
  const id = uid('note');
  const dt = nowISO();
  run('INSERT INTO notes (id, lead_id, user_id, text, datetime) VALUES (?,?,?,?,?)', [id, lead.id, req.user.id, text, dt]);
  logInteraction({ leadId: lead.id, type: 'nota', note: text, userId: req.user.id });
  res.status(201).json({ note: { id, leadId: lead.id, userId: req.user.id, text, datetime: dt } });
});

// ---- tags ------------------------------------------------------------------
router.post('/leads/:id/tags', (req, res) => {
  const { tagId } = req.body || {};
  if (!tagId) return res.status(400).json({ error: 'tagId obrigatório' });
  run('INSERT OR IGNORE INTO lead_tags (lead_id, tag_id) VALUES (?,?)', [req.params.id, tagId]);
  res.json({ tagIds: leadTagIds(req.params.id) });
});
router.delete('/leads/:id/tags/:tagId', (req, res) => {
  run('DELETE FROM lead_tags WHERE lead_id = ? AND tag_id = ?', [req.params.id, req.params.tagId]);
  res.json({ tagIds: leadTagIds(req.params.id) });
});

// ---- trial classes ---------------------------------------------------------
router.post('/leads/:id/trials', (req, res) => {
  const lead = one('SELECT * FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  const b = req.body || {};
  const id = uid('trl');
  const now = nowISO();
  run(
    `INSERT INTO trial_classes (id, lead_id, status, date, time, teacher_id, level_identified, objective, teacher_notes, result, created_at, updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [id, lead.id, b.status || 'Agendada', b.date || null, b.time || null, b.teacherId || lead.teacher_id || null,
      b.levelIdentified || null, b.objective || lead.objective || '', b.teacherNotes || null, b.result || null, now, now]
  );
  if (b.teacherId && b.teacherId !== lead.teacher_id) {
    run('UPDATE leads SET teacher_id = ? WHERE id = ?', [b.teacherId, lead.id]);
  }
  if (lead.status !== 'experimental_agendada' && (b.status === 'Agendada' || !b.status)) {
    run('UPDATE leads SET status = ?, last_stage_change_at = ? WHERE id = ?', ['experimental_agendada', now, lead.id]);
  }
  logInteraction({ leadId: lead.id, type: 'experimental', note: `Aula experimental agendada para ${b.date || 'data a definir'}`, userId: req.user.id });
  res.status(201).json({ trial: { id, leadId: lead.id, status: b.status || 'Agendada', date: b.date, time: b.time, teacherId: b.teacherId || lead.teacher_id, levelIdentified: b.levelIdentified, objective: b.objective, teacherNotes: b.teacherNotes, result: b.result } });
});

router.put('/trials/:id', (req, res) => {
  const trial = one('SELECT * FROM trial_classes WHERE id = ?', [req.params.id]);
  if (!trial) return res.status(404).json({ error: 'Aula experimental não encontrada' });
  const b = req.body || {};
  const now = nowISO();
  const fields = {
    status: 'status', date: 'date', time: 'time', teacherId: 'teacher_id', levelIdentified: 'level_identified',
    objective: 'objective', teacherNotes: 'teacher_notes', result: 'result',
  };
  const sets = [];
  const params = [];
  for (const [key, col] of Object.entries(fields)) {
    if (key in b) { sets.push(`${col} = ?`); params.push(b[key]); }
  }
  sets.push('updated_at = ?'); params.push(now); params.push(trial.id);
  run(`UPDATE trial_classes SET ${sets.join(', ')} WHERE id = ?`, params);

  const lead = one('SELECT * FROM leads WHERE id = ?', [trial.lead_id]);
  if (b.status === 'Realizada' && lead) {
    run('UPDATE leads SET status = ?, last_stage_change_at = ?, last_contact_date = ? WHERE id = ?', ['experimental_realizada', now, todayISO(), lead.id]);
    logInteraction({ leadId: lead.id, type: 'experimental', note: `Aula experimental realizada${b.result ? ' — resultado: ' + b.result : ''}`, userId: req.user.id });
  } else if (b.status && lead) {
    logInteraction({ leadId: lead.id, type: 'experimental', note: `Aula experimental atualizada: ${b.status}`, userId: req.user.id });
  }
  res.json({ ok: true });
});

// ---- proposals ---------------------------------------------------------------
router.post('/leads/:id/proposals', requireRole('admin', 'manager', 'agent'), (req, res) => {
  const lead = one('SELECT * FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  const b = req.body || {};
  const id = uid('prp');
  const now = nowISO();
  run(
    `INSERT INTO proposals (id, lead_id, date, package_id, package_label, value, payment_method, special_condition, decision_date, status, created_at, updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [id, lead.id, b.date || todayISO(), b.packageId || null, b.packageLabel || '', b.value || null, b.paymentMethod || '',
      b.specialCondition || '', b.decisionDate || null, b.status || 'Enviada', now, now]
  );
  run('UPDATE leads SET status = ?, last_stage_change_at = ?, last_contact_date = ?, updated_at = ? WHERE id = ?', [
    'proposta_enviada', now, todayISO(), now, lead.id,
  ]);
  logInteraction({ leadId: lead.id, type: 'proposta', note: `Proposta enviada${b.packageLabel ? ' — ' + b.packageLabel : ''}`, userId: req.user.id });
  res.status(201).json({ proposal: { id, leadId: lead.id, ...b } });
});

router.put('/proposals/:id', (req, res) => {
  const proposal = one('SELECT * FROM proposals WHERE id = ?', [req.params.id]);
  if (!proposal) return res.status(404).json({ error: 'Proposta não encontrada' });
  const b = req.body || {};
  const now = nowISO();
  const fields = { date: 'date', packageId: 'package_id', packageLabel: 'package_label', value: 'value', paymentMethod: 'payment_method', specialCondition: 'special_condition', decisionDate: 'decision_date', status: 'status' };
  const sets = [];
  const params = [];
  for (const [key, col] of Object.entries(fields)) {
    if (key in b) { sets.push(`${col} = ?`); params.push(b[key]); }
  }
  sets.push('updated_at = ?'); params.push(now); params.push(proposal.id);
  run(`UPDATE proposals SET ${sets.join(', ')} WHERE id = ?`, params);
  if (b.status) {
    logInteraction({ leadId: proposal.lead_id, type: 'proposta', note: `Status da proposta atualizado para "${b.status}"`, userId: req.user.id });
    if (b.status === 'Em negociação') {
      run('UPDATE leads SET status = ?, last_stage_change_at = ? WHERE id = ?', ['negociacao', now, proposal.lead_id]);
    } else if (b.status === 'Recusada' || b.status === 'Sem resposta') {
      run('UPDATE leads SET status = ?, last_stage_change_at = ? WHERE id = ?', ['recuperacao', now, proposal.lead_id]);
    }
  }
  res.json({ ok: true });
});

// ---- enrollment / matrícula ----------------------------------------------
router.post('/leads/:id/enroll', requireRole('admin', 'manager', 'agent'), (req, res) => {
  const lead = one('SELECT * FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  const b = req.body || {};
  const now = nowISO();
  let student = one('SELECT * FROM students WHERE lead_id = ?', [lead.id]);
  if (!student) {
    student = { id: uid('stu'), lead_id: lead.id, name: lead.name, whatsapp: lead.whatsapp, email: lead.email };
    run('INSERT INTO students (id, lead_id, name, whatsapp, email, created_at) VALUES (?,?,?,?,?,?)', [
      student.id, student.lead_id, student.name, student.whatsapp, student.email, now,
    ]);
  }
  const enrollmentId = uid('enr');
  run(
    `INSERT INTO enrollments (id, lead_id, student_id, enrollment_date, start_date, package_id, teacher_id, frequency, schedule_text, monthly_value, payment_method, starting_class, notes, created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [enrollmentId, lead.id, student.id, b.enrollmentDate || todayISO(), b.startDate || null, b.packageId || null,
      b.teacherId || lead.teacher_id || null, b.frequency || '', b.scheduleText || '', b.monthlyValue || null,
      b.paymentMethod || '', b.startingClass || '', b.notes || '', now]
  );
  run('UPDATE leads SET status = ?, last_stage_change_at = ?, last_contact_date = ?, updated_at = ? WHERE id = ?', [
    'matriculado', now, todayISO(), now, lead.id,
  ]);
  logInteraction({ leadId: lead.id, type: 'matricula', note: `Matrícula confirmada${b.packageId ? '' : ''}`, userId: req.user.id });
  res.status(201).json({ enrollmentId, studentId: student.id });
});

export default router;
