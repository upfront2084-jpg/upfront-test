import { Router } from 'express';
import { all, one } from '../db.js';
import { todayISO, addDaysISO, monthKey, daysBetween } from '../lib/util.js';
import { countLeads, recoveryEligibleFilters } from '../lib/leadQuery.js';
import { scopeForUser } from '../lib/authMiddleware.js';
import { STAGES } from '../lib/constants.js';

const router = Router();

function periodFromQuery(q) {
  const today = todayISO();
  const from = q.from || today.slice(0, 7) + '-01';
  const to = q.to || today;
  return { from, to };
}

// Same-length period immediately before `from`, used for "vs. período
// anterior" trend deltas.
function previousPeriod(from, to) {
  const len = daysBetween(to, from); // days in the current period
  const prevTo = addDaysISO(from, -1);
  const prevFrom = addDaysISO(prevTo, -len);
  return { from: prevFrom, to: prevTo };
}

function pctChange(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

function scopeClause(scope, alias = 'leads') {
  const clauses = [];
  const params = [];
  if (scope.ownerUserId) { clauses.push(`${alias}.owner_user_id = ?`); params.push(scope.ownerUserId); }
  if (scope.teacherId) { clauses.push(`${alias}.teacher_id = ?`); params.push(scope.teacherId); }
  return { clauses, params };
}

router.get('/dashboard/summary', (req, res) => {
  const { from, to } = periodFromQuery(req.query);
  const today = todayISO();
  const scope = scopeForUser(req.user);
  const { clauses, params } = scopeClause(scope);
  const scopeSql = clauses.length ? ` AND ${clauses.join(' AND ')}` : '';

  const leadsInMonth = one(`SELECT COUNT(*) n FROM leads WHERE entry_date BETWEEN ? AND ?${scopeSql}`, [from, to, ...params]).n;
  const leadsToday = one(`SELECT COUNT(*) n FROM leads WHERE entry_date = ?${scopeSql}`, [today, ...params]).n;
  const emAtendimento = one(
    `SELECT COUNT(*) n FROM leads WHERE status NOT IN ('matriculado','perdido','recuperacao')${scopeSql}`,
    params
  ).n;
  // "scheduled" trials are inherently often in the future, so this one
  // isn't capped by the period's `to` — only by its `from`.
  const trialsScheduled = one(
    `SELECT COUNT(*) n FROM trial_classes t JOIN leads ON leads.id = t.lead_id
     WHERE t.status IN ('Agendada','Reagendada') AND t.date >= ?${scopeSql}`,
    [from, ...params]
  ).n;
  const trialsDone = one(
    `SELECT COUNT(*) n FROM trial_classes t JOIN leads ON leads.id = t.lead_id
     WHERE t.status = 'Realizada' AND t.date BETWEEN ? AND ?${scopeSql}`,
    [from, to, ...params]
  ).n;
  const proposalsSent = one(
    `SELECT COUNT(*) n FROM proposals p JOIN leads ON leads.id = p.lead_id
     WHERE p.date BETWEEN ? AND ?${scopeSql}`,
    [from, to, ...params]
  ).n;
  const enrollments = one(
    `SELECT COUNT(*) n FROM enrollments e JOIN leads ON leads.id = e.lead_id
     WHERE e.enrollment_date BETWEEN ? AND ?${scopeSql}`,
    [from, to, ...params]
  ).n;
  const lost = one(
    `SELECT COUNT(*) n FROM leads WHERE status = 'perdido' AND last_stage_change_at BETWEEN ? AND ?${scopeSql}`,
    [from + 'T00:00:00.000Z', to + 'T23:59:59.999Z', ...params]
  ).n;
  const needFollowUp = one(
    `SELECT COUNT(*) n FROM leads WHERE next_contact_date <= ? AND status NOT IN ('matriculado','perdido')${scopeSql}`,
    [today, ...params]
  ).n;
  const recoveryAvailable = countLeads(recoveryEligibleFilters(scope));

  // Period-over-period trend for the headline KPI cards, comparing this
  // period against an equal-length window immediately before it.
  const prev = previousPeriod(from, to);
  const prevLeads = one(`SELECT COUNT(*) n FROM leads WHERE entry_date BETWEEN ? AND ?${scopeSql}`, [prev.from, prev.to, ...params]).n;
  const prevEnrollments = one(
    `SELECT COUNT(*) n FROM enrollments e JOIN leads ON leads.id = e.lead_id WHERE e.enrollment_date BETWEEN ? AND ?${scopeSql}`,
    [prev.from, prev.to, ...params]
  ).n;
  const conversionRate = leadsInMonth ? Math.round((enrollments / leadsInMonth) * 1000) / 10 : 0;
  const prevConversionRate = prevLeads ? Math.round((prevEnrollments / prevLeads) * 1000) / 10 : 0;
  const trends = {
    leadsInMonth: pctChange(leadsInMonth, prevLeads),
    enrollments: pctChange(enrollments, prevEnrollments),
    conversionRate: pctChange(conversionRate, prevConversionRate),
  };

  res.json({
    period: { from, to },
    leadsInMonth, leadsToday, emAtendimento, trialsScheduled, trialsDone,
    proposalsSent, enrollments, lost, needFollowUp, recoveryAvailable,
    conversionRate, trends,
  });
});

router.get('/dashboard/charts', (req, res) => {
  const { from, to } = periodFromQuery(req.query);
  const scope = scopeForUser(req.user);
  const { clauses, params } = scopeClause(scope);
  const scopeSql = clauses.length ? ` AND ${clauses.join(' AND ')}` : '';

  // leads by month (last 8 months up to `to`)
  const months = [];
  const toDate = new Date(to + 'T00:00:00Z');
  for (let i = 7; i >= 0; i--) {
    const d = new Date(toDate);
    d.setUTCMonth(d.getUTCMonth() - i);
    months.push(d.toISOString().slice(0, 7));
  }
  const leadsRaw = all(`SELECT entry_date FROM leads WHERE 1=1${scopeSql}`, params);
  const byMonth = Object.fromEntries(months.map((m) => [m, 0]));
  for (const r of leadsRaw) {
    const k = monthKey(r.entry_date);
    if (k in byMonth) byMonth[k]++;
  }
  const leadsByMonth = months.map((m) => ({ month: m, count: byMonth[m] }));

  // leads by source (within period)
  const bySource = all(
    `SELECT sources.name as source, COUNT(*) as count FROM leads LEFT JOIN sources ON sources.id = leads.source_id
     WHERE leads.entry_date BETWEEN ? AND ?${scopeSql} GROUP BY sources.name ORDER BY count DESC`,
    [from, to, ...params]
  );

  // funnel conversion within period (based on entry_date cohort)
  const cohortTotal = one(`SELECT COUNT(*) n FROM leads WHERE entry_date BETWEEN ? AND ?${scopeSql}`, [from, to, ...params]).n;
  const cohortTrial = one(
    `SELECT COUNT(*) n FROM leads WHERE entry_date BETWEEN ? AND ?${scopeSql} AND id IN (SELECT lead_id FROM trial_classes WHERE status='Realizada')`,
    [from, to, ...params]
  ).n;
  const cohortEnrolled = one(
    `SELECT COUNT(*) n FROM leads WHERE entry_date BETWEEN ? AND ?${scopeSql} AND status='matriculado'`,
    [from, to, ...params]
  ).n;

  const pct = (a, b) => (b > 0 ? Math.round((a / b) * 1000) / 10 : 0);

  const conversionFunnel = {
    leadToTrial: pct(cohortTrial, cohortTotal),
    trialToEnrollment: pct(cohortEnrolled, cohortTrial),
    leadToEnrollment: pct(cohortEnrolled, cohortTotal),
  };

  // funil de vendas: quantos leads do período avançaram até cada etapa
  const cohortContacted = one(
    `SELECT COUNT(*) n FROM leads WHERE entry_date BETWEEN ? AND ?${scopeSql}
     AND (status != 'novo_lead' OR id IN (SELECT lead_id FROM interactions WHERE type='contato'))`,
    [from, to, ...params]
  ).n;
  const cohortProposal = one(
    `SELECT COUNT(*) n FROM leads WHERE entry_date BETWEEN ? AND ?${scopeSql}
     AND id IN (SELECT lead_id FROM proposals)`,
    [from, to, ...params]
  ).n;
  const funnel = [
    { key: 'leads', label: 'Leads', count: cohortTotal },
    { key: 'contato', label: 'Contato Realizado', count: cohortContacted },
    { key: 'experimental', label: 'Aula Experimental', count: cohortTrial },
    { key: 'proposta', label: 'Proposta Enviada', count: cohortProposal },
    { key: 'matricula', label: 'Matrículas', count: cohortEnrolled },
  ].map((s) => ({ ...s, pct: pct(s.count, cohortTotal) }));

  // leads por status: retrato atual do funil (não limitado ao período)
  const statusRows = all(`SELECT status, COUNT(*) as count FROM leads WHERE 1=1${scopeSql} GROUP BY status`, params);
  const statusCounts = Object.fromEntries(statusRows.map((r) => [r.status, r.count]));
  const byStatus = STAGES.map((s) => ({ key: s.key, label: s.label, color: s.color, count: statusCounts[s.key] || 0 }));

  // matrículas por origem
  const enrollBySource = all(
    `SELECT sources.name as source, COUNT(*) as count FROM enrollments
     JOIN leads ON leads.id = enrollments.lead_id LEFT JOIN sources ON sources.id = leads.source_id
     WHERE enrollments.enrollment_date BETWEEN ? AND ?${scopeSql.replaceAll('leads.', 'leads.')}
     GROUP BY sources.name ORDER BY count DESC`,
    [from, to, ...params]
  );

  // leads recuperados por campanha
  const recoveredByCampaign = all(
    `SELECT c.name as campaign, COUNT(*) as count FROM campaign_recipients r
     JOIN campaigns c ON c.id = r.campaign_id WHERE r.enrolled = 1 OR r.interested = 1
     GROUP BY c.name ORDER BY count DESC`
  );

  res.json({ leadsByMonth, bySource, conversionFunnel, enrollBySource, recoveredByCampaign, funnel, byStatus });
});

export default router;
