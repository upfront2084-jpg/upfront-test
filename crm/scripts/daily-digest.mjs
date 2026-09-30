#!/usr/bin/env node
// Logs into the live Upfront CRM with a dedicated account and prints a plain-text
// digest of what needs attention today: overdue/due-today tasks, leads stalled
// for a long time without contact, and leads recently marked as lost. Run daily
// by a scheduled Routine, which relays the output to the CRM owner as a message.
//
// Required env vars: CRM_USERNAME, CRM_PASSWORD
// Optional: CRM_BASE_URL (default https://crm.upfrontidiomas.com.br)

const BASE_URL = process.env.CRM_BASE_URL || 'https://crm.upfrontidiomas.com.br';
const USERNAME = process.env.CRM_USERNAME;
const PASSWORD = process.env.CRM_PASSWORD;

if (!USERNAME || !PASSWORD) {
  console.error('Faltam as variáveis CRM_USERNAME / CRM_PASSWORD no ambiente.');
  process.exit(1);
}

async function login() {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Login falhou (${res.status}): ${body}`);
  }
  const setCookie = res.headers.get('set-cookie');
  if (!setCookie) throw new Error('Login não retornou cookie de sessão.');
  return setCookie.split(';')[0];
}

async function api(path, cookie) {
  const res = await fetch(`${BASE_URL}${path}`, { headers: { Cookie: cookie } });
  if (!res.ok) throw new Error(`${path} falhou (${res.status})`);
  return res.json();
}

function fmtDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${d}/${m}/${y}`;
}

async function main() {
  const cookie = await login();

  const { tasks } = await api('/api/tasks?scope=today', cookie);
  const overdue = tasks.filter((t) => t.dueDate < new Date().toISOString().slice(0, 10));
  const dueToday = tasks.filter((t) => t.dueDate === new Date().toISOString().slice(0, 10));

  // "Parados há muito tempo": buckets 60+ dias sem contato (o módulo Recuperação
  // já cobre 7/15/30 como cadência normal de follow-up).
  const staleBuckets = ['60', '90', '180', '180+'];
  const staleLists = await Promise.all(
    staleBuckets.map((b) => api(`/api/recovery/leads?bucket=${b}`, cookie).then((r) => r.leads))
  );
  const stale = staleLists.flat();

  const { leads: lostLeads } = await api('/api/lost/leads', cookie);
  const threeDaysAgo = new Date(Date.now() - 3 * 86400000).toISOString();
  const recentLost = lostLeads.filter((l) => l.lastStageChangeAt >= threeDaysAgo);

  const lines = [];
  lines.push(`Resumo diário do CRM — ${fmtDate(new Date().toISOString())}`);
  lines.push('');

  lines.push(`📋 Tarefas (${tasks.length} pendentes)`);
  function taskLine(t) {
    const leadSuffix = t.leadName && !t.title.includes(t.leadName) ? ` — ${t.leadName}` : '';
    return `${t.title}${leadSuffix}`;
  }
  if (overdue.length) {
    lines.push(`  Atrasadas (${overdue.length}):`);
    for (const t of overdue.slice(0, 10)) lines.push(`   - ${taskLine(t)} (venceu ${fmtDate(t.dueDate)})`);
    if (overdue.length > 10) lines.push(`   ... e mais ${overdue.length - 10}`);
  }
  if (dueToday.length) {
    lines.push(`  Para hoje (${dueToday.length}):`);
    for (const t of dueToday.slice(0, 10)) lines.push(`   - ${taskLine(t)}`);
    if (dueToday.length > 10) lines.push(`   ... e mais ${dueToday.length - 10}`);
  }
  if (!overdue.length && !dueToday.length) lines.push('  Nenhuma tarefa pendente. 🎉');
  lines.push('');

  lines.push(`🐌 Leads parados há 60+ dias sem contato (${stale.length})`);
  for (const l of stale.slice(0, 10)) lines.push(`   - ${l.name} — ${l.whatsapp || 'sem WhatsApp'} (${daysSince(l.lastContactDate)}d, dono: ${l.ownerName || '—'})`);
  if (stale.length > 10) lines.push(`   ... e mais ${stale.length - 10}`);
  if (!stale.length) lines.push('  Nenhum lead parado há tanto tempo.');
  lines.push('');

  lines.push(`❌ Leads perdidos nos últimos 3 dias (${recentLost.length})`);
  for (const l of recentLost.slice(0, 10)) lines.push(`   - ${l.name} — motivo: ${l.lostReason || 'não informado'}`);
  if (!recentLost.length) lines.push('  Nenhum lead perdido recentemente.');

  console.log(lines.join('\n'));
}

function daysSince(dateStr) {
  if (!dateStr) return '?';
  const a = new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00');
  const b = new Date(dateStr.slice(0, 10) + 'T00:00:00');
  return Math.round((a - b) / 86400000);
}

main().catch((err) => {
  console.error('Erro ao gerar o resumo:', err.message);
  process.exit(1);
});
