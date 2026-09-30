#!/usr/bin/env node
// Calls the live Upfront CRM's GET /api/digest with a bearer token and
// prints a plain-text summary of what needs attention today: overdue/
// due-today tasks, leads stalled 60+ days without contact, and leads lost
// in the last 3 days. Run by a scheduled Routine, which relays the output
// to the CRM owner as a message.
//
// Required env var: DIGEST_TOKEN (the platform injects it as the
// Authorization header for requests to the CRM's allowed site — see the
// environment's API credentials).
// Optional: CRM_BASE_URL (default https://crm.upfrontidiomas.com.br)

const BASE_URL = process.env.CRM_BASE_URL || 'https://crm.upfrontidiomas.com.br';
const TOKEN = process.env.DIGEST_TOKEN;

function fmtDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${d}/${m}/${y}`;
}

function daysSince(dateStr) {
  if (!dateStr) return '?';
  const a = new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00');
  const b = new Date(dateStr.slice(0, 10) + 'T00:00:00');
  return Math.round((a - b) / 86400000);
}

function taskLine(t) {
  const leadSuffix = t.leadName && !t.title.includes(t.leadName) ? ` — ${t.leadName}` : '';
  return `${t.title}${leadSuffix}`;
}

async function main() {
  const headers = {};
  // The platform's environment credentials inject Authorization automatically
  // for the allowed site; when running locally (no credential injection),
  // fall back to an explicit DIGEST_TOKEN env var.
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const res = await fetch(`${BASE_URL}/api/digest`, { headers });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`GET /api/digest falhou (${res.status}): ${body}`);
  }
  const data = await res.json();
  const { tasks, staleLeads, recentLost } = data;
  const totalTasks = tasks.overdue.length + tasks.dueToday.length;

  const lines = [];
  lines.push(`Resumo diário do CRM — ${fmtDate(new Date().toISOString())}`);
  lines.push('');

  lines.push(`📋 Tarefas (${totalTasks} pendentes)`);
  if (tasks.overdue.length) {
    lines.push(`  Atrasadas (${tasks.overdue.length}):`);
    for (const t of tasks.overdue.slice(0, 10)) lines.push(`   - ${taskLine(t)} (venceu ${fmtDate(t.dueDate)})`);
    if (tasks.overdue.length > 10) lines.push(`   ... e mais ${tasks.overdue.length - 10}`);
  }
  if (tasks.dueToday.length) {
    lines.push(`  Para hoje (${tasks.dueToday.length}):`);
    for (const t of tasks.dueToday.slice(0, 10)) lines.push(`   - ${taskLine(t)}`);
    if (tasks.dueToday.length > 10) lines.push(`   ... e mais ${tasks.dueToday.length - 10}`);
  }
  if (!totalTasks) lines.push('  Nenhuma tarefa pendente. 🎉');
  lines.push('');

  lines.push(`🐌 Leads parados há 60+ dias sem contato (${staleLeads.length})`);
  for (const l of staleLeads.slice(0, 10)) lines.push(`   - ${l.name} — ${l.whatsapp || 'sem WhatsApp'} (${daysSince(l.lastContactDate)}d, dono: ${l.ownerName || '—'})`);
  if (staleLeads.length > 10) lines.push(`   ... e mais ${staleLeads.length - 10}`);
  if (!staleLeads.length) lines.push('  Nenhum lead parado há tanto tempo.');
  lines.push('');

  lines.push(`❌ Leads perdidos nos últimos 3 dias (${recentLost.length})`);
  for (const l of recentLost.slice(0, 10)) lines.push(`   - ${l.name} — motivo: ${l.lostReason || 'não informado'}`);
  if (!recentLost.length) lines.push('  Nenhum lead perdido recentemente.');

  console.log(lines.join('\n'));
}

main().catch((err) => {
  console.error('Erro ao gerar o resumo:', err.message);
  process.exit(1);
});
