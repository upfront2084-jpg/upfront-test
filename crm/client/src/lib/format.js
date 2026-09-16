export function fmtDate(dateStr) {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.slice(0, 10).split('-');
  if (!y || !m || !d) return '—';
  return `${d}/${m}/${y}`;
}

export function fmtDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d)) return '—';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${dd}/${mm}/${yy} ${hh}:${mi}`;
}

export function fmtMoney(v) {
  if (v === null || v === undefined || v === '') return '—';
  return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function fmtMonthLabel(monthKey) {
  const [y, m] = monthKey.split('-');
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }).replace('.', '');
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function daysSince(dateStr) {
  if (!dateStr) return Infinity;
  const a = new Date(todayISO() + 'T00:00:00');
  const b = new Date(dateStr.slice(0, 10) + 'T00:00:00');
  return Math.round((a - b) / 86400000);
}

export function initials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export function classNames(...args) {
  return args.filter(Boolean).join(' ');
}

export function downloadCSV(filename, columns, rows) {
  const allRows = [columns, ...rows];
  const csv = allRows
    .map((row) =>
      row
        .map((cell) => {
          const s = cell === null || cell === undefined ? '' : String(cell);
          return /[",;\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
        })
        .join(';')
    )
    .join('\r\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
