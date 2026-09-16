import { useEffect, useMemo, useState } from 'react';
import {
  Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { api, qs } from '../api.js';
import { fmtMonthLabel, todayISO } from '../lib/format.js';

const KPI_DEFS = [
  { key: 'leadsInMonth', label: 'Leads no período', icon: '🧲', color: 'var(--accent)' },
  { key: 'leadsToday', label: 'Leads hoje', icon: '📥', color: 'var(--teal)' },
  { key: 'emAtendimento', label: 'Em atendimento', icon: '💬', color: 'var(--purple)' },
  { key: 'trialsScheduled', label: 'Experimentais agendadas', icon: '🗓️', color: 'var(--warning)' },
  { key: 'trialsDone', label: 'Experimentais realizadas', icon: '🎓', color: 'var(--warning)' },
  { key: 'proposalsSent', label: 'Propostas enviadas', icon: '📄', color: 'var(--purple)' },
  { key: 'enrollments', label: 'Matrículas realizadas', icon: '🎉', color: 'var(--success)' },
  { key: 'lost', label: 'Leads perdidos', icon: '📉', color: 'var(--danger)' },
  { key: 'needFollowUp', label: 'Precisam de acompanhamento', icon: '⏰', color: 'var(--danger)' },
  { key: 'recoveryAvailable', label: 'Disponíveis para recuperação', icon: '♻️', color: 'var(--teal)' },
];

const PIE_COLORS = ['#2F6FED', '#16A34A', '#F5A524', '#8B5CF6', '#0EA5A4', '#E1425B', '#5B93FF', '#C026D3', '#EA8C00'];

function firstDayOfMonth() {
  return todayISO().slice(0, 7) + '-01';
}

export default function Dashboard() {
  const [from, setFrom] = useState(firstDayOfMonth());
  const [to, setTo] = useState(todayISO());
  const [summary, setSummary] = useState(null);
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all([
      api.get(`/dashboard/summary${qs({ from, to })}`),
      api.get(`/dashboard/charts${qs({ from, to })}`),
    ]).then(([s, c]) => {
      if (!alive) return;
      setSummary(s);
      setCharts(c);
      setLoading(false);
    });
    return () => { alive = false; };
  }, [from, to]);

  function applyPreset(days) {
    setTo(todayISO());
    const d = new Date();
    d.setDate(d.getDate() - days);
    setFrom(d.toISOString().slice(0, 10));
  }

  const leadsByMonth = useMemo(
    () => (charts?.leadsByMonth || []).map((r) => ({ ...r, label: fmtMonthLabel(r.month) })),
    [charts]
  );

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Dashboard</h1>
          <div className="sub">Visão geral da operação de leads e matrículas</div>
        </div>
        <div className="topbar-right">
          <div className="hstack">
            <button className="btn btn-secondary btn-sm" onClick={() => applyPreset(7)}>7 dias</button>
            <button className="btn btn-secondary btn-sm" onClick={() => applyPreset(30)}>30 dias</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setFrom(firstDayOfMonth())}>Este mês</button>
          </div>
          <input type="date" className="input" style={{ width: 145 }} value={from} onChange={(e) => setFrom(e.target.value)} />
          <input type="date" className="input" style={{ width: 145 }} value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
      </div>

      {loading || !summary ? (
        <div className="page-loading">Carregando indicadores…</div>
      ) : (
        <>
          <div className="kpi-grid">
            {KPI_DEFS.map((k) => (
              <div className="kpi-card" key={k.key}>
                <div className="kpi-top">
                  <span className="kpi-icon" style={{ background: k.color + '1a', color: k.color }}>{k.icon}</span>
                </div>
                <div className="kpi-value">{summary[k.key]}</div>
                <div className="kpi-label">{k.label}</div>
              </div>
            ))}
          </div>

          <div className="section-title">Conversão do funil no período</div>
          <div className="chart-grid">
            <div className="chart-card">
              <h3>Lead → Experimental realizada</h3>
              <div className="kpi-value" style={{ color: 'var(--accent)' }}>{charts.conversionFunnel.leadToTrial}%</div>
            </div>
            <div className="chart-card">
              <h3>Experimental → Matrícula</h3>
              <div className="kpi-value" style={{ color: 'var(--success)' }}>{charts.conversionFunnel.trialToEnrollment}%</div>
            </div>
            <div className="chart-card">
              <h3>Conversão geral (Lead → Matrícula)</h3>
              <div className="kpi-value" style={{ color: 'var(--purple)' }}>{charts.conversionFunnel.leadToEnrollment}%</div>
            </div>
          </div>

          <div className="section-title">Leads por mês</div>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={leadsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="var(--accent)" strokeWidth={2.5} dot={{ r: 3 }} name="Leads" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="section-title">Origem e conversão</div>
          <div className="chart-grid">
            <div className="chart-card">
              <h3>Leads por origem</h3>
              {charts.bySource.length ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={charts.bySource} dataKey="count" nameKey="source" outerRadius={90} label={(d) => d.source}>
                      {charts.bySource.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : <div className="empty-hint">Sem dados no período</div>}
            </div>
            <div className="chart-card">
              <h3>Matrículas por origem</h3>
              {charts.enrollBySource.length ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={charts.enrollBySource}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="source" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="var(--success)" radius={[6, 6, 0, 0]} name="Matrículas" />
                  </BarChart>
                </ResponsiveContainer>
              ) : <div className="empty-hint">Sem matrículas no período</div>}
            </div>
          </div>

          <div className="section-title">Leads recuperados através de campanhas</div>
          <div className="chart-card">
            {charts.recoveredByCampaign.length ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={charts.recoveredByCampaign} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="campaign" width={200} tick={{ fontSize: 11.5 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="var(--teal)" radius={[0, 6, 6, 0]} name="Leads recuperados" />
                </BarChart>
              </ResponsiveContainer>
            ) : <div className="empty-hint">Nenhuma campanha registrou recuperações ainda</div>}
          </div>
        </>
      )}
    </div>
  );
}
