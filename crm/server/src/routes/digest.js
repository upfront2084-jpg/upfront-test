// Token-authenticated endpoints for the automation that runs outside a
// person's browser session (the scheduled daily check-in, and quick lead
// creation from a chat with Claude) — both use a static bearer token
// (DIGEST_TOKEN env var) instead of a user login.
import { Router } from 'express';
import { all, one, run, transaction } from '../db.js';
import { uid, nowISO, todayISO } from '../lib/util.js';
import { queryLeads } from '../lib/leadQuery.js';
import { recoveryEligibleFilters } from '../lib/leadQuery.js';
import { STAGE_KEYS } from '../lib/constants.js';
import { ah } from '../lib/asyncHandler.js';

async function logQuickInteraction(leadId, type, note) {
  await run('INSERT INTO interactions (id, lead_id, type, note, user_id, datetime) VALUES (?,?,?,?,?,?)', [
    uid('int'), leadId, type, note, null, nowISO(),
  ]);
}

// Logging something that "already happened" (a trial, a proposal) should
// never move a lead backward in the pipeline — e.g. the proposal was
// already sent and now the (earlier) trial gets logged retroactively.
// "perdido"/"recuperacao" are side branches, not further along the main
// sequence, so a lead recovering from either always counts as forward.
function isForwardStage(fromStatus, toStatus) {
  if (fromStatus === 'perdido' || fromStatus === 'recuperacao') return true;
  const fromIdx = STAGE_KEYS.indexOf(fromStatus);
  const toIdx = STAGE_KEYS.indexOf(toStatus);
  if (fromIdx === -1 || toIdx === -1) return true;
  return toIdx > fromIdx;
}

const router = Router();

function requireDigestToken(req, res, next) {
  const token = process.env.DIGEST_TOKEN;
  if (!token) return res.status(503).json({ error: 'DIGEST_TOKEN não configurado no servidor' });
  const header = req.headers.authorization || '';
  const provided = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (provided !== token) return res.status(401).json({ error: 'Token inválido' });
  next();
}

router.get('/digest', requireDigestToken, ah(async (req, res) => {
  const today = todayISO();

  const taskRows = await all(
    `SELECT tasks.*, leads.name as lead_name FROM tasks
     LEFT JOIN leads ON leads.id = tasks.lead_id
     WHERE tasks.status = 'Pendente' AND tasks.due_date <= ?
     ORDER BY tasks.due_date ASC`,
    [today]
  );
  const overdue = taskRows.filter((t) => t.due_date < today).map(serializeTask);
  const dueToday = taskRows.filter((t) => t.due_date === today).map(serializeTask);

  const staleRows = await queryLeads(
    recoveryEligibleFilters({ daysSinceContactMin: 60 }),
    { orderBy: 'leads.last_contact_date ASC' }
  );
  const staleLeads = staleRows.map((l) => ({
    name: l.name, whatsapp: l.whatsapp, lastContactDate: l.last_contact_date, ownerName: l.owner_name,
  }));

  const threeDaysAgo = new Date(Date.now() - 3 * 86400000).toISOString();
  const lostRows = await queryLeads({ status: ['perdido'] }, { orderBy: 'leads.last_stage_change_at DESC' });
  const recentLost = lostRows
    .filter((l) => l.last_stage_change_at >= threeDaysAgo)
    .map((l) => ({ name: l.name, lostReason: l.lost_reason, lastStageChangeAt: l.last_stage_change_at }));

  res.json({ generatedAt: new Date().toISOString(), tasks: { overdue, dueToday }, staleLeads, recentLost });
}));

function serializeTask(t) {
  return { title: t.title, leadName: t.lead_name, dueDate: t.due_date };
}

// Quick lead creation for the "talk to Claude, it fills the CRM" flow —
// Claude parses the free text itself and posts the structured fields here.
// sourceName is resolved case-insensitively against the sources table so
// Claude doesn't need to look up ids first.
router.post('/quick-lead', requireDigestToken, ah(async (req, res) => {
  const b = req.body || {};
  if (!b.name) return res.status(400).json({ error: 'Nome é obrigatório' });

  let sourceId = b.sourceId || null;
  if (!sourceId && b.sourceName) {
    const src = await one('SELECT id FROM sources WHERE LOWER(name) = LOWER(?)', [b.sourceName]);
    sourceId = src?.id || null;
  }

  const id = uid('lead');
  const now = nowISO();
  const today = todayISO();
  await run(
    `INSERT INTO leads (id, name, whatsapp, email, entry_date, source_id, campaign_origin, owner_user_id, teacher_id,
       city, age, english_level, objective, notes, status, last_contact_date, next_contact_date, next_action,
       opt_out, last_stage_change_at, created_at, updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id, b.name, b.whatsapp || '', b.email || '', today, sourceId, b.campaignOrigin || '',
      null, null, b.city || '', b.age || null, b.englishLevel || '',
      b.objective || '', b.notes || '', 'novo_lead', today, today, 'Fazer primeiro contato',
      0, now, now, now,
    ]
  );
  await run('INSERT INTO interactions (id, lead_id, type, note, user_id, datetime) VALUES (?,?,?,?,?,?)', [
    uid('int'), id, 'criacao', 'Lead cadastrado via assistente Claude', null, now,
  ]);

  const row = (await queryLeads({ ids: [id] }))[0];
  res.status(201).json({ id, name: row.name, sourceName: row.source_name });
}));

// Looks up a lead by (partial, case-insensitive) name so Claude can find
// the right lead from a chat message without needing to remember its id
// across conversations.
router.get('/quick-lead/find', requireDigestToken, ah(async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ error: 'Parâmetro name é obrigatório' });
  const rows = await all(
    "SELECT id, name, whatsapp, status FROM leads WHERE LOWER(name) LIKE LOWER(?) ORDER BY created_at DESC LIMIT 10",
    [`%${name}%`]
  );
  res.json({ leads: rows.map((l) => ({ id: l.id, name: l.name, whatsapp: l.whatsapp, status: l.status })) });
}));

// Lets Claude resolve a teacher mentioned by name before assigning one on a
// trial/proposal/enrollment, the same way sourceName is resolved on create.
router.get('/quick-teachers', requireDigestToken, ah(async (req, res) => {
  const rows = await all('SELECT id, name FROM teachers ORDER BY name');
  res.json({ teachers: rows });
}));

const QUICK_EDITABLE_FIELDS = {
  whatsapp: 'whatsapp', email: 'email', sourceId: 'source_id', campaignOrigin: 'campaign_origin',
  teacherId: 'teacher_id', city: 'city', age: 'age', englishLevel: 'english_level', objective: 'objective',
  notes: 'notes',
};

// Updates an existing lead's fields — for when a later chat message adds or
// corrects details on a lead Claude already created (source, level, teacher
// suggestion, etc.) instead of creating a duplicate.
router.put('/quick-lead/:id', requireDigestToken, ah(async (req, res) => {
  const lead = await one('SELECT * FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  const b = req.body || {};

  let sourceId = b.sourceId;
  if (!sourceId && b.sourceName) {
    const src = await one('SELECT id FROM sources WHERE LOWER(name) = LOWER(?)', [b.sourceName]);
    sourceId = src?.id || null;
  }
  if (sourceId !== undefined) b.sourceId = sourceId;

  const sets = [];
  const params = [];
  for (const [key, col] of Object.entries(QUICK_EDITABLE_FIELDS)) {
    if (key in b) { sets.push(`${col} = ?`); params.push(b[key]); }
  }
  if (sets.length) {
    sets.push('updated_at = ?');
    params.push(nowISO());
    params.push(lead.id);
    await run(`UPDATE leads SET ${sets.join(', ')} WHERE id = ?`, params);
  }
  const row = (await queryLeads({ ids: [lead.id] }))[0];
  res.json({ id: lead.id, name: row.name, sourceName: row.source_name, teacherName: row.teacher_name });
}));

// Logs a trial class — by default already-completed ("Realizada"), since
// this is for retroactively recording what Claude is told happened, not
// scheduling a future one (use the CRM itself for that).
router.post('/quick-lead/:id/trial', requireDigestToken, ah(async (req, res) => {
  const lead = await one('SELECT * FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  const b = req.body || {};
  const id = uid('trl');
  const now = nowISO();
  const status = b.status || 'Realizada';
  await run(
    `INSERT INTO trial_classes (id, lead_id, status, date, time, teacher_id, level_identified, objective, teacher_notes, result, created_at, updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [id, lead.id, status, b.date || todayISO(), b.time || null, b.teacherId || lead.teacher_id || null,
      b.levelIdentified || null, b.objective || lead.objective || '', b.teacherNotes || null, b.result || null, now, now]
  );
  const targetStatus = status === 'Realizada' ? 'experimental_realizada' : 'experimental_agendada';
  if (isForwardStage(lead.status, targetStatus)) {
    await run('UPDATE leads SET status = ?, last_stage_change_at = ?, last_contact_date = ?, updated_at = ? WHERE id = ?', [
      targetStatus, now, todayISO(), now, lead.id,
    ]);
  }
  if (status === 'Realizada') {
    await logQuickInteraction(lead.id, 'experimental', `Aula experimental realizada${b.result ? ' — resultado: ' + b.result : ''} (via assistente Claude)`);
  } else {
    await logQuickInteraction(lead.id, 'experimental', `Aula experimental agendada para ${b.date || 'data a definir'} (via assistente Claude)`);
  }
  res.status(201).json({ id, leadId: lead.id, status });
}));

// Updates the lead's most recent trial class — e.g. moving an "Agendada"
// one to "Realizada" with a result — instead of logging a second one.
router.put('/quick-lead/:id/trial', requireDigestToken, ah(async (req, res) => {
  const lead = await one('SELECT * FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  const trial = await one('SELECT * FROM trial_classes WHERE lead_id = ? ORDER BY created_at DESC LIMIT 1', [lead.id]);
  if (!trial) return res.status(404).json({ error: 'Nenhuma aula experimental encontrada para este lead' });

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
  if (sets.length > 1) await run(`UPDATE trial_classes SET ${sets.join(', ')} WHERE id = ?`, params);

  if (b.status === 'Realizada' && isForwardStage(lead.status, 'experimental_realizada')) {
    await run('UPDATE leads SET status = ?, last_stage_change_at = ?, last_contact_date = ?, updated_at = ? WHERE id = ?', [
      'experimental_realizada', now, todayISO(), now, lead.id,
    ]);
    await logQuickInteraction(lead.id, 'experimental', `Aula experimental realizada${b.result ? ' — resultado: ' + b.result : ''} (via assistente Claude)`);
  } else if (b.status) {
    await logQuickInteraction(lead.id, 'experimental', `Aula experimental atualizada: ${b.status} (via assistente Claude)`);
  }
  res.json({ id: trial.id, leadId: lead.id });
}));

// Creates a follow-up task for the lead (e.g. "send availability and price
// table") — TASK_TYPES doesn't have a dedicated category for this, so it
// defaults to "Outro" unless a specific type is given.
router.post('/quick-lead/:id/task', requireDigestToken, ah(async (req, res) => {
  const lead = await one('SELECT * FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  const b = req.body || {};
  if (!b.title) return res.status(400).json({ error: 'Título é obrigatório' });
  const id = uid('tsk');
  const now = nowISO();
  await run(
    `INSERT INTO tasks (id, lead_id, title, type, due_date, due_time, assigned_user_id, note, status, created_at, updated_at, completed_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,NULL)`,
    [id, lead.id, b.title, b.type || 'Outro', b.dueDate || todayISO(), b.dueTime || null, null, b.note || '', 'Pendente', now, now]
  );
  res.status(201).json({ id, leadId: lead.id });
}));

// Logs a proposal and moves the lead to "Proposta Enviada".
router.post('/quick-lead/:id/proposal', requireDigestToken, ah(async (req, res) => {
  const lead = await one('SELECT * FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  const b = req.body || {};
  const id = uid('prp');
  const now = nowISO();
  await run(
    `INSERT INTO proposals (id, lead_id, date, package_id, package_label, value, payment_method, special_condition, decision_date, status, created_at, updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [id, lead.id, b.date || todayISO(), b.packageId || null, b.packageLabel || '', b.value || null, b.paymentMethod || '',
      b.specialCondition || '', b.decisionDate || null, b.status || 'Enviada', now, now]
  );
  if (isForwardStage(lead.status, 'proposta_enviada')) {
    await run('UPDATE leads SET status = ?, last_stage_change_at = ?, last_contact_date = ?, updated_at = ? WHERE id = ?', [
      'proposta_enviada', now, todayISO(), now, lead.id,
    ]);
  }
  await logQuickInteraction(lead.id, 'proposta', `Proposta enviada${b.packageLabel ? ' — ' + b.packageLabel : ''}${b.value ? ' — R$ ' + b.value : ''} (via assistente Claude)`);
  res.status(201).json({ id, leadId: lead.id });
}));

// Confirms enrollment: creates the student record (first time) and the
// enrollment, and moves the lead to "Matriculado" — mirrors POST
// /api/leads/:id/enroll, just token-authenticated instead of session-based.
router.post('/quick-lead/:id/enroll', requireDigestToken, ah(async (req, res) => {
  const lead = await one('SELECT * FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  const b = req.body || {};
  const now = nowISO();
  let student = await one('SELECT * FROM students WHERE lead_id = ?', [lead.id]);
  if (!student) {
    student = { id: uid('stu'), lead_id: lead.id, name: lead.name, whatsapp: lead.whatsapp, email: lead.email };
    await run('INSERT INTO students (id, lead_id, name, whatsapp, email, created_at) VALUES (?,?,?,?,?,?)', [
      student.id, student.lead_id, student.name, student.whatsapp, student.email, now,
    ]);
  }
  const enrollmentId = uid('enr');
  await run(
    `INSERT INTO enrollments (id, lead_id, student_id, enrollment_date, start_date, package_id, teacher_id, frequency, schedule_text, monthly_value, discount_value, payment_method, starting_class, notes, created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [enrollmentId, lead.id, student.id, b.enrollmentDate || todayISO(), b.startDate || null, b.packageId || null,
      b.teacherId || lead.teacher_id || null, b.frequency || '', b.scheduleText || '', b.monthlyValue || null,
      b.discountValue || null, b.paymentMethod || '', b.startingClass || '', b.notes || '', now]
  );
  if (isForwardStage(lead.status, 'matriculado')) {
    await run('UPDATE leads SET status = ?, last_stage_change_at = ?, last_contact_date = ?, updated_at = ? WHERE id = ?', [
      'matriculado', now, todayISO(), now, lead.id,
    ]);
  }
  await logQuickInteraction(lead.id, 'matricula', 'Matrícula confirmada (via assistente Claude)');
  res.status(201).json({ enrollmentId, studentId: student.id });
}));

// Deletes a lead and everything tied to it — mirrors the cascade in
// routes/leads.js's DELETE /leads/:id, token-authenticated instead of
// session-based so Claude can remove a lead created by mistake from chat.
async function cascadeDeleteLead(id) {
  await run('DELETE FROM campaign_recipients WHERE lead_id = ?', [id]);
  await run('DELETE FROM enrollments WHERE lead_id = ?', [id]);
  await run('DELETE FROM students WHERE lead_id = ?', [id]);
  await run('DELETE FROM proposals WHERE lead_id = ?', [id]);
  await run('DELETE FROM trial_classes WHERE lead_id = ?', [id]);
  await run('DELETE FROM tasks WHERE lead_id = ?', [id]);
  await run('DELETE FROM notes WHERE lead_id = ?', [id]);
  await run('DELETE FROM interactions WHERE lead_id = ?', [id]);
  await run('DELETE FROM lead_tags WHERE lead_id = ?', [id]);
  await run('DELETE FROM leads WHERE id = ?', [id]);
}

router.delete('/quick-lead/:id', requireDigestToken, ah(async (req, res) => {
  const lead = await one('SELECT id, name FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });
  await transaction(() => cascadeDeleteLead(lead.id));
  res.json({ ok: true, name: lead.name });
}));

export default router;
