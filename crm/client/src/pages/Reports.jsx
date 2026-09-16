import { useEffect, useState } from 'react';
import { api, qs } from '../api.js';
import { REPORT_TYPES } from '../lib/constants.js';
import { downloadCSV, todayISO } from '../lib/format.js';

export default function Reports() {
  const [type, setType] = useState(REPORT_TYPES[0].key);
  const [from, setFrom] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 12);
    return d.toISOString().slice(0, 10);
  });
  const [to, setTo] = useState(todayISO());
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/reports/${type}${qs({ from, to })}`).then((r) => { setReport(r); setLoading(false); });
  }, [type, from, to]);

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Relatórios</h1>
          <div className="sub">Exporte qualquer relatório em CSV para análise em planilhas</div>
        </div>
      </div>

      <div className="filter-bar">
        <select className="input grow" style={{ maxWidth: 320 }} value={type} onChange={(e) => setType(e.target.value)}>
          {REPORT_TYPES.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
        </select>
        <input type="date" className="input" style={{ width: 145 }} value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="date" className="input" style={{ width: 145 }} value={to} onChange={(e) => setTo(e.target.value)} />
        <button
          className="btn btn-secondary"
          disabled={!report || report.rows.length === 0}
          onClick={() => downloadCSV(`${type}.csv`, report.columns, report.rows)}
        >
          ⬇️ Exportar CSV
        </button>
      </div>

      {loading || !report ? <div className="page-loading">Carregando relatório…</div> : (
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="data-table">
              <thead><tr>{report.columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>
                {report.rows.map((row, i) => (
                  <tr key={i} style={{ cursor: 'default' }}>{row.map((cell, j) => <td key={j}>{cell === null || cell === undefined ? '—' : String(cell)}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          {report.rows.length === 0 && <div className="empty-state"><div className="big">📈</div>Sem dados para este período.</div>}
        </div>
      )}
    </div>
  );
}
