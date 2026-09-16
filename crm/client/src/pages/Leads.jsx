import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, qs } from '../api.js';
import { useRefData } from '../context/RefDataContext.jsx';
import { STAGES, ENGLISH_LEVELS, OBJECTIVES } from '../lib/constants.js';
import { fmtDate, initials, daysSince } from '../lib/format.js';
import StageBadge from '../components/StageBadge.jsx';
import LeadFormModal from '../components/LeadFormModal.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const PAGE_SIZE = 25;

export default function Leads() {
  const { sources } = useRefData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ search: '', status: '', sourceId: '', objective: '', englishLevel: '' });
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ leads: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setLoading(true);
    const data = await api.get(`/leads${qs({ ...filters, page, pageSize: PAGE_SIZE })}`);
    setResult(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, [filters, page]); // eslint-disable-line react-hooks/exhaustive-deps

  function setFilter(key, value) {
    setPage(1);
    setFilters((f) => ({ ...f, [key]: value }));
  }

  const totalPages = Math.max(1, Math.ceil(result.total / PAGE_SIZE));

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Leads</h1>
          <div className="sub">{result.total} leads encontrados</div>
        </div>
        <div className="topbar-right">
          {['admin', 'manager', 'agent'].includes(user.role) && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Novo lead</button>
          )}
        </div>
      </div>

      <div className="filter-bar">
        <input className="input grow" placeholder="Buscar por nome, WhatsApp, e-mail…" value={filters.search} onChange={(e) => setFilter('search', e.target.value)} />
        <select className="input" style={{ width: 180 }} value={filters.status} onChange={(e) => setFilter('status', e.target.value)}>
          <option value="">Todas as etapas</option>
          {STAGES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
        <select className="input" style={{ width: 160 }} value={filters.sourceId} onChange={(e) => setFilter('sourceId', e.target.value)}>
          <option value="">Todas as origens</option>
          {sources.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select className="input" style={{ width: 170 }} value={filters.objective} onChange={(e) => setFilter('objective', e.target.value)}>
          <option value="">Todos os objetivos</option>
          {OBJECTIVES.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <select className="input" style={{ width: 150 }} value={filters.englishLevel} onChange={(e) => setFilter('englishLevel', e.target.value)}>
          <option value="">Todos os níveis</option>
          {ENGLISH_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      <div className="table-wrap">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Lead</th><th>Etapa</th><th>Origem</th><th>Atendente</th><th>Último contato</th><th>Próxima ação</th>
              </tr>
            </thead>
            <tbody>
              {result.leads.map((l) => (
                <tr key={l.id} onClick={() => navigate(`/leads/${l.id}`)}>
                  <td>
                    <div className="name-cell">
                      <span className="avatar-sm">{initials(l.name)}</span>
                      <div>
                        <div style={{ fontWeight: 700 }}>{l.name}</div>
                        <div className="meta">{l.whatsapp || l.email || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td><StageBadge status={l.status} /></td>
                  <td>{l.sourceIcon} {l.sourceName || '—'}</td>
                  <td>{l.ownerName || '—'}</td>
                  <td>{fmtDate(l.lastContactDate)} <span className="muted small">({daysSince(l.lastContactDate)}d)</span></td>
                  <td className="small">{l.nextAction || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && result.leads.length === 0 && (
          <div className="empty-state"><div className="big">🔍</div>Nenhum lead encontrado com esses filtros.</div>
        )}
        <div className="pagination">
          <span>Página {page} de {totalPages}</span>
          <div className="hstack">
            <button className="btn btn-secondary btn-sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>← Anterior</button>
            <button className="btn btn-secondary btn-sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Próxima →</button>
          </div>
        </div>
      </div>

      {showForm && <LeadFormModal onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); load(); }} />}
    </div>
  );
}
