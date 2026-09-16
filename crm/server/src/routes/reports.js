import { Router } from 'express';
import { all, one } from '../db.js';
import { todayISO, monthKey, daysBetween } from '../lib/util.js';
import { scopeForUser } from '../lib/authMiddleware.js';

const router = Router();

function periodFromQuery(q) {
  const today = todayISO();
  return { from: q.from || addYears(today, -1), to: q.to || today };
}
function addYears(dateStr, years) {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCFullYear(d.getUTCFullYear() + years);
  return d.toISOString().slice(0, 10);
}

router.get('/reports/:type', (req, res) => {
  const { from, to } = periodFromQuery(req.query);
  const scope = scopeForUser(req.user);
  const clauses = [];
  const params = [];
  if (scope.ownerUserId) { clauses.push('leads.owner_user_id = ?'); params.push(scope.ownerUserId); }
  if (scope.teacherId) { clauses.push('leads.teacher_id = ?'); params.push(scope.teacherId); }
  const scopeSql = clauses.length ? ` AND ${clauses.join(' AND ')}` : '';

  const type = req.params.type;
  let rows = [];
  let columns = [];

  if (type === 'leads-por-periodo') {
    columns = ['Mês', 'Leads'];
    const raw = all(`SELECT entry_date FROM leads WHERE entry_date BETWEEN ? AND ?${scopeSql}`, [from, to, ...params]);
    const map = {};
    for (const r of raw) map[monthKey(r.entry_date)] = (map[monthKey(r.entry_date)] || 0) + 1;
    rows = Object.entries(map).sort(([a], [b]) => (a < b ? -1 : 1)).map(([month, count]) => [month, count]);
  } else if (type === 'leads-por-origem') {
    columns = ['Origem', 'Leads'];
    rows = all(
      `SELECT sources.name as source, COUNT(*) as n FROM leads LEFT JOIN sources ON sources.id = leads.source_id
       WHERE leads.entry_date BETWEEN ? AND ?${scopeSql} GROUP BY sources.name ORDER BY n DESC`,
      [from, to, ...params]
    ).map((r) => [r.source || 'Não informado', r.n]);
  } else if (type === 'conversao-por-origem') {
    columns = ['Origem', 'Leads', 'Matrículas', 'Conversão'];
    rows = all(
      `SELECT sources.name as source, COUNT(*) as total,
         SUM(CASE WHEN leads.status='matriculado' THEN 1 ELSE 0 END) as enrolled
       FROM leads LEFT JOIN sources ON sources.id = leads.source_id
       WHERE leads.entry_date BETWEEN ? AND ?${scopeSql} GROUP BY sources.name ORDER BY total DESC`,
      [from, to, ...params]
    ).map((r) => [r.source || 'Não informado', r.total, r.enrolled, r.total ? `${Math.round((r.enrolled / r.total) * 1000) / 10}%` : '0%']);
  } else if (type === 'experimentais') {
    columns = ['Data', 'Lead', 'Professor', 'Status', 'Resultado'];
    rows = all(
      `SELECT t.date, leads.name as lead_name, teachers.name as teacher_name, t.status, t.result
       FROM trial_classes t JOIN leads ON leads.id = t.lead_id LEFT JOIN teachers ON teachers.id = t.teacher_id
       WHERE t.date BETWEEN ? AND ?${scopeSql} ORDER BY t.date DESC`,
      [from, to, ...params]
    ).map((r) => [r.date, r.lead_name, r.teacher_name || '—', r.status, r.result || '—']);
  } else if (type === 'matriculas') {
    columns = ['Data', 'Aluno', 'Pacote', 'Professor', 'Valor mensal'];
    rows = all(
      `SELECT e.enrollment_date, leads.name as lead_name, packages.name as package_name, teachers.name as teacher_name, e.monthly_value
       FROM enrollments e JOIN leads ON leads.id = e.lead_id LEFT JOIN packages ON packages.id = e.package_id
       LEFT JOIN teachers ON teachers.id = e.teacher_id
       WHERE e.enrollment_date BETWEEN ? AND ?${scopeSql} ORDER BY e.enrollment_date DESC`,
      [from, to, ...params]
    ).map((r) => [r.enrollment_date, r.lead_name, r.package_name || '—', r.teacher_name || '—', r.monthly_value]);
  } else if (type === 'leads-perdidos') {
    columns = ['Lead', 'Origem', 'Última etapa mudou em', 'Dias sem contato'];
    rows = all(
      `SELECT leads.name, sources.name as source, leads.last_stage_change_at, leads.last_contact_date
       FROM leads LEFT JOIN sources ON sources.id = leads.source_id WHERE leads.status = 'perdido'${scopeSql} ORDER BY leads.last_stage_change_at DESC`,
      params
    ).map((r) => [r.name, r.source || '—', (r.last_stage_change_at || '').slice(0, 10), daysBetween(todayISO(), r.last_contact_date)]);
  } else if (type === 'leads-recuperados') {
    columns = ['Lead', 'Campanha', 'Data resposta', 'Matriculou'];
    rows = all(
      `SELECT leads.name, campaigns.name as campaign, r.responded_at, r.enrolled
       FROM campaign_recipients r JOIN leads ON leads.id = r.lead_id JOIN campaigns ON campaigns.id = r.campaign_id
       WHERE r.responded = 1 ORDER BY r.responded_at DESC`
    ).map((r) => [r.name, r.campaign, (r.responded_at || '').slice(0, 10), r.enrolled ? 'Sim' : 'Não']);
  } else if (type === 'taxa-recuperacao') {
    const totalSent = one(`SELECT COUNT(*) n FROM campaign_recipients`).n;
    const responded = one(`SELECT COUNT(*) n FROM campaign_recipients WHERE responded = 1`).n;
    const recovered = one(`SELECT COUNT(*) n FROM campaign_recipients WHERE enrolled = 1 OR interested = 1`).n;
    columns = ['Métrica', 'Valor'];
    rows = [
      ['Leads incluídos em campanhas', totalSent],
      ['Responderam', responded],
      ['Recuperados (interesse ou matrícula)', recovered],
      ['Taxa de resposta', totalSent ? `${Math.round((responded / totalSent) * 1000) / 10}%` : '0%'],
      ['Taxa de recuperação', totalSent ? `${Math.round((recovered / totalSent) * 1000) / 10}%` : '0%'],
    ];
  } else if (type === 'tempo-medio-matricula') {
    const raw = all(
      `SELECT leads.entry_date, e.enrollment_date FROM enrollments e JOIN leads ON leads.id = e.lead_id
       WHERE e.enrollment_date BETWEEN ? AND ?${scopeSql}`,
      [from, to, ...params]
    );
    const diffs = raw.map((r) => daysBetween(r.enrollment_date, r.entry_date));
    const avg = diffs.length ? Math.round(diffs.reduce((a, b) => a + b, 0) / diffs.length) : 0;
    columns = ['Métrica', 'Valor'];
    rows = [
      ['Matrículas no período', diffs.length],
      ['Tempo médio até matrícula (dias)', avg],
      ['Mais rápida (dias)', diffs.length ? Math.min(...diffs) : 0],
      ['Mais lenta (dias)', diffs.length ? Math.max(...diffs) : 0],
    ];
  } else if (type === 'conversao-experimental-matricula') {
    const trialsDone = one(`SELECT COUNT(DISTINCT lead_id) n FROM trial_classes WHERE status='Realizada'`).n;
    const enrolledAfterTrial = one(
      `SELECT COUNT(DISTINCT leads.id) n FROM leads WHERE status='matriculado' AND id IN (SELECT lead_id FROM trial_classes WHERE status='Realizada')`
    ).n;
    columns = ['Métrica', 'Valor'];
    rows = [
      ['Leads com experimental realizada', trialsDone],
      ['Matriculados após experimental', enrolledAfterTrial],
      ['Conversão experimental → matrícula', trialsDone ? `${Math.round((enrolledAfterTrial / trialsDone) * 1000) / 10}%` : '0%'],
    ];
  } else if (type === 'conversao-lead-matricula') {
    const totalLeads = one(`SELECT COUNT(*) n FROM leads WHERE entry_date BETWEEN ? AND ?${scopeSql}`, [from, to, ...params]).n;
    const enrolled = one(`SELECT COUNT(*) n FROM leads WHERE status='matriculado' AND entry_date BETWEEN ? AND ?${scopeSql}`, [from, to, ...params]).n;
    columns = ['Métrica', 'Valor'];
    rows = [
      ['Leads no período', totalLeads],
      ['Matriculados', enrolled],
      ['Conversão lead → matrícula', totalLeads ? `${Math.round((enrolled / totalLeads) * 1000) / 10}%` : '0%'],
    ];
  } else {
    return res.status(404).json({ error: 'Relatório desconhecido' });
  }

  res.json({ type, period: { from, to }, columns, rows });
});

export default router;
