import { Router } from 'express';
import { all, one, run, transaction } from '../db.js';
import { uid, nowISO, todayISO } from '../lib/util.js';
import { scopeForUser } from '../lib/authMiddleware.js';
import { ah } from '../lib/asyncHandler.js';

const router = Router();

function serialize(t) {
  return {
    id: t.id, leadId: t.lead_id, leadName: t.lead_name, title: t.title, type: t.type, dueDate: t.due_date,
    dueTime: t.due_time, assignedUserId: t.assigned_user_id, assignedUserName: t.assigned_user_name,
    note: t.note, status: t.status, createdAt: t.created_at, completedAt: t.completed_at,
  };
}

router.get('/tasks', ah(async (req, res) => {
  const scope = scopeForUser(req.user);
  const clauses = [];
  const params = [];
  if (scope.ownerUserId) { clauses.push('tasks.assigned_user_id = ?'); params.push(scope.ownerUserId); }
  if (req.query.assignedUserId) { clauses.push('tasks.assigned_user_id = ?'); params.push(req.query.assignedUserId); }
  if (req.query.status) { clauses.push('tasks.status = ?'); params.push(req.query.status); }
  if (req.query.leadId) { clauses.push('tasks.lead_id = ?'); params.push(req.query.leadId); }
  if (req.query.scope === 'today') { clauses.push('tasks.due_date <= ?'); params.push(todayISO()); clauses.push("tasks.status = 'Pendente'"); }
  if (req.query.scope === 'overdue') { clauses.push('tasks.due_date < ?'); params.push(todayISO()); clauses.push("tasks.status = 'Pendente'"); }
  if (req.query.scope === 'upcoming') { clauses.push('tasks.due_date > ?'); params.push(todayISO()); clauses.push("tasks.status = 'Pendente'"); }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const rows = await all(
    `SELECT tasks.*, leads.name as lead_name, u.name as assigned_user_name
     FROM tasks LEFT JOIN leads ON leads.id = tasks.lead_id LEFT JOIN users u ON u.id = tasks.assigned_user_id
     ${where} ORDER BY tasks.due_date ASC`,
    params
  );
  res.json({ tasks: rows.map(serialize) });
}));

router.post('/tasks', ah(async (req, res) => {
  const b = req.body || {};
  if (!b.title || !b.dueDate) return res.status(400).json({ error: 'Título e data são obrigatórios' });
  const id = uid('tsk');
  const now = nowISO();
  await run(
    `INSERT INTO tasks (id, lead_id, title, type, due_date, due_time, assigned_user_id, note, status, created_at, updated_at, completed_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,NULL)`,
    [id, b.leadId || null, b.title, b.type || 'Outro', b.dueDate, b.dueTime || null, b.assignedUserId || req.user.id, b.note || '', 'Pendente', now, now]
  );
  res.status(201).json({ id });
}));

router.put('/tasks/:id', ah(async (req, res) => {
  const task = await one('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
  const b = req.body || {};
  const now = nowISO();
  const fields = { title: 'title', type: 'type', dueDate: 'due_date', dueTime: 'due_time', assignedUserId: 'assigned_user_id', note: 'note', status: 'status' };
  const sets = [];
  const params = [];
  for (const [key, col] of Object.entries(fields)) {
    if (key in b) { sets.push(`${col} = ?`); params.push(b[key]); }
  }
  sets.push('updated_at = ?'); params.push(now);
  if (b.status === 'Concluída') { sets.push('completed_at = ?'); params.push(now); }
  params.push(task.id);
  await run(`UPDATE tasks SET ${sets.join(', ')} WHERE id = ?`, params);
  res.json({ ok: true });
}));

router.delete('/tasks/:id', ah(async (req, res) => {
  await run('DELETE FROM tasks WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
}));

router.post('/tasks/bulk-delete', ah(async (req, res) => {
  const ids = [...new Set(req.body?.ids || [])];
  if (!ids.length) return res.status(400).json({ error: 'Nenhuma tarefa selecionada' });
  await transaction(async () => {
    for (const id of ids) await run('DELETE FROM tasks WHERE id = ?', [id]);
  });
  res.json({ ok: true, count: ids.length });
}));

export default router;
