import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { api, qs } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { fmtDate, fmtMonthLabel, todayISO, initials } from '../lib/format.js';
import StageBadge from '../components/StageBadge.jsx';
import { useToast } from '../context/ToastContext.jsx';

const KPI_DEFS = [
  { key: 'leadsInMonth', label: 'Leads Novos', icon: '👥', color: '#0EA5A4', trendKey: 'leadsInMonth' },
  { key: 'enrollments', label: 'Matrículas', icon: '🎓', color: '#16A34A', trendKey: 'enrollments' },
  { key: 'conversionRate', label: 'Taxa de Conversão', icon: '📈', color: '#F5A524', trendKey: 'conversionRate', suffix: '%' },
  { key: 'needFollowUp', label: 'Tarefas Pendentes', icon: '⏰', color: '#8B5CF6' },
];

const PIE_COLORS = ['#2F6FED', '#16A34A', '#F5A524', '#8B5CF6', '#0EA5A4', '#E1425B', '#5B93FF', '#C026D3', '#EA8C00'];
const FUNNEL_COLORS = ['#2F6FED', '#5B93FF', '#F5A524', '#8B5CF6', '#16A34A'];

function firstDayOfMonth() {
  return todayISO().slice(0, 7) + '-01';
}

export default function Dashboard() {
  const { user } = useAuth();
  const { push } = useToast();
  const [from, setFrom] = useState(firstDayOfMonth());
  const [to, setTo] = useState(todayISO());
  const [summary, setSummary] = useState(null);
  const [charts, setCharts] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all([
      api.get(`/dashboard/summary${qs({ from, to })}`),
      api.get(`/dashboard/charts${qs({ from, to })}`),
      api.get('/leads?pageSize=5&sort=lastContact'),
      api.get('/tasks?scope=today'),
    ]).then(([s, c, leads, tasks]) => {
      if (!alive) return;
      setSummary(s);
      setCharts(c);
      setRecentLeads(leads.leads);
      setTodayTasks(tasks.tasks.slice(0, 5));
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

  async function toggleTask(task) {
    try {
      await api.put(`/tasks/${task.id}`, { status: task.status === 'Concluída' ? 'Pendente' : 'Concluída' });
      setTodayTasks((ts) => ts.map((t) => (t.id === task.id ? { ...t, status: t.status === 'Concluída' ? 'Pendente' : 'Concluída' } : t)));
    } catch (err) {
      push(err.message, 'error');
    }
  }

  const leadsByMonth = useMemo(
    () => (charts?.leadsByMonth || []).map((r) => ({ ...r, label: fmtMonthLabel(r.month) })),
    [charts]
  );
  const firstName = user.name.split(' ')[0];
  const totalSource = charts?.bySource.reduce((a, b) => a + b.count, 0) || 0;

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Olá, {firstName}! 👋</h1>
          <div className="sub">Aqui é onde grandes conversas começam.</div>
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

      {loading || !summary || !charts ? (
        <div className="page-loading">Carregando indicadores…</div>
      ) : (
        <>
          <div className="kpi-grid-2">
            {KPI_DEFS.map((k) => {
              const trend = k.trendKey ? summary.trends?.[k.trendKey] : null;
              return (
                <div className="kpi-card-2" key={k.key}>
                  <div className="kpi-top">
                    <span className="kpi-icon" style={{ background: k.color + '1e', color: k.color }}>{k.icon}</span>
                    {trend !== null && trend !== undefined && (
                      <span className={`trend-badge ${trend >= 0 ? 'up' : 'down'}`}>
                        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                      </span>
                    )}
                  </div>
                  <div className="kpi-value">{summary[k.key]}{k.suffix || ''}</div>
                  <div className="kpi-label">{k.label}</div>
                </div>
              );
            })}
          </div>

          <div className="dash-row-3">
            <div className="chart-card">
              <div className="hstack" style={{ justifyContent: 'space-between' }}>
                <h3>Funil de Vendas</h3>
                <a className="link-btn" onClick={() => navigate('/pipeline')}>Ver detalhes →</a>
              </div>
              <div className="funnel-list">
                {charts.funnel.map((f, i) => (
                  <div className="funnel-row" key={f.key}>
                    <div className="funnel-row-head">
                      <span>{f.label}</span>
                      <span className="muted">{f.count} · {f.pct}%</span>
                    </div>
                    <div className="funnel-track">
                      <div className="funnel-fill" style={{ width: `${f.pct}%`, background: FUNNEL_COLORS[i] }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card">
              <h3>Leads por Origem</h3>
              {charts.bySource.length ? (
                <div className="donut-wrap">
                  <ResponsiveContainer width="100%" height={190}>
                    <PieChart>
                      <Pie data={charts.bySource} dataKey="count" nameKey="source" innerRadius={52} outerRadius={78} paddingAngle={2}>
                        {charts.bySource.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="donut-center">
                    <div className="donut-total">{totalSource}</div>
                    <div className="donut-label">Leads</div>
                  </div>
                </div>
              ) : <div className="empty-hint">Sem dados no período</div>}
              <div className="donut-legend">
                {charts.bySource.map((s, i) => (
                  <div className="donut-legend-item" key={s.source || i}>
                    <span className="dot" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span className="grow">{s.source || 'Não informado'}</span>
                    <span className="muted">{totalSource ? Math.round((s.count / totalSource) * 100) : 0}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card">
              <h3>Leads por Status</h3>
              <div className="status-list">
                {charts.byStatus.filter((s) => s.count > 0).map((s) => (
                  <div className="status-row" key={s.key}>
                    <span className="dot" style={{ background: s.color }} />
                    <span className="grow">{s.label}</span>
                    <span style={{ fontWeight: 700 }}>{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="dash-row-2">
            <div className="chart-card">
              <div className="hstack" style={{ justifyContent: 'space-between' }}>
                <h3>Leads Recentes</h3>
                <a className="link-btn" onClick={() => navigate('/leads')}>Ver todos →</a>
              </div>
              <div className="table-scroll">
                <table className="data-table mini-table">
                  <thead>
                    <tr><th>Nome</th><th>Origem</th><th>Status</th><th>Último contato</th><th>Responsável</th></tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((l) => (
                      <tr key={l.id} onClick={() => navigate(`/leads/${l.id}`)}>
                        <td style={{ fontWeight: 700 }}>{l.name}</td>
                        <td>{l.sourceIcon} {l.sourceName || '—'}</td>
                        <td><StageBadge status={l.status} /></td>
                        <td className="small">{fmtDate(l.lastContactDate)}</td>
                        <td>
                          <span className="avatar-sm" title={l.ownerName}>{l.ownerName ? initials(l.ownerName) : '—'}</span>
                        </td>
                      </tr>
                    ))}
                    {recentLeads.length === 0 && (
                      <tr><td colSpan={5} className="muted small" style={{ textAlign: 'center', padding: 20 }}>Nenhum lead ainda</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="chart-card">
              <div className="hstack" style={{ justifyContent: 'space-between' }}>
                <h3>Tarefas de Hoje</h3>
                <a className="link-btn" onClick={() => navigate('/tasks')}>Ver todas →</a>
              </div>
              <div className="stack">
                {todayTasks.map((t) => (
                  <label className="task-mini-row" key={t.id}>
                    <input type="checkbox" checked={t.status === 'Concluída'} onChange={() => toggleTask(t)} />
                    <span className="grow" style={{ textDecoration: t.status === 'Concluída' ? 'line-through' : 'none' }}>{t.title}</span>
                    <span className="muted small">{t.dueTime || ''}</span>
                  </label>
                ))}
                {todayTasks.length === 0 && <div className="muted small" style={{ padding: '10px 0' }}>Nenhuma tarefa para hoje 🎉</div>}
              </div>
            </div>
          </div>

          <div className="section-title">Mais indicadores</div>
          <div className="chart-grid">
            <div className="chart-card">
              <h3>Leads por mês</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={leadsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="var(--accent)" strokeWidth={2.5} dot={{ r: 3 }} name="Leads" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-card">
              <h3>Matrículas por origem</h3>
              {charts.enrollBySource.length ? (
                <ResponsiveContainer width="100%" height={220}>
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
            <div className="chart-card">
              <h3>Leads recuperados por campanha</h3>
              {charts.recoveredByCampaign.length ? (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={charts.recoveredByCampaign} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                    <YAxis type="category" dataKey="campaign" width={140} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="var(--teal)" radius={[0, 6, 6, 0]} name="Leads recuperados" />
                  </BarChart>
                </ResponsiveContainer>
              ) : <div className="empty-hint">Nenhuma campanha registrou recuperações ainda</div>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
