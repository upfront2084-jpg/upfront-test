import crypto from 'node:crypto';

export function uid(prefix) {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`;
}

export function nowISO() {
  return new Date().toISOString();
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function addDaysISO(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(a, b) {
  const da = new Date(a.slice(0, 10) + 'T00:00:00Z');
  const db_ = new Date(b.slice(0, 10) + 'T00:00:00Z');
  return Math.round((da - db_) / 86400000);
}

export function daysSince(dateStr) {
  if (!dateStr) return Infinity;
  return daysBetween(todayISO(), dateStr);
}

export function monthKey(dateStr) {
  return dateStr.slice(0, 7);
}
