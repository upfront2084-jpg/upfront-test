import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, qs } from '../api.js';
import { useRefData } from '../context/RefDataContext.jsx';
import { STAGES, ENGLISH_LEVELS, OBJECTIVES } from '../lib/constants.js';
import { fmtDate, initials, daysSince } from '../lib/format.js';
import StageBadge from '../components/StageBadge.jsx';
import LeadFormModal from '../components/LeadFormModal.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import Icon from '../components/Icon.jsx';
import SourceIcon from '../components/SourceIcon.jsx';

const PAGE_SIZE = 25;

export default function Leads() {
  const { sources } = useRefData();
  const { user } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ search: '', status: '', sourceId: '', objective: '', englishLevel: '' });
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ leads: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(() => new Set());
  const [selectAllMatching, setSelectAllMatching] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const canDelete = ['admin', 'manager'].includes(user.role);

  async function load() {
    setLoading(true);
    const data = await api.get(`/leads${qs({ ...filters, page, pageSize: PAGE_SIZE })}`);
    setResult(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, [filters, page]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { setSelected(new Set()); setSelectAllMatching(false); }, [filters, page]);

  function setFilter(key, value) {
    setPage(1);
    setFilters((f) => ({ ...f, [key]: value }));
  }

  function toggleOne(id) {
    setSelectAllMatching(false);
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function togglePage() {
    setSelectAllMatching(false);
    const pageIds = result.leads.map((l) => l.id);
    const allSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
    setSelected(allSelected ? new Set() : new Set(pageIds));
  }

  const selectedCount = selectAllMatching ? result.total : selected.size;
  const pageIds = result.leads.map((l) => l.id);
  const wholePageSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));

  async function bulkDelete() {
    if (!confirm(`Excluir ${selectedCount} lead(s) selecionado(s)? Isso apaga tudo relacionado a eles (notas, tarefas, experimentais, propostas, matrículas) e não pode ser desfeito.`)) return;
    setBulkDeleting(true);
    try {
      const body = selectAllMatching ? { filters } : { ids: [...selected] };
      const { count } = await api.post('/leads/bulk-delete', body);
      push(`${count} lead(s) excluído(s)`, 'success');
      setSelected(new Set());
      setSelectAllMatching(false);
      if (page !== 1) setPage(1); else load();
    } catch (err) {
      push(err.message, 'error');
    } finally {
      setBulkDeleting(false);
    }
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

      {canDelete && selectedCount > 0 && (
        <div className="card mb12 hstack" style={{ justifyContent: 'space-between', background: 'var(--accent-soft)' }}>
          <div className="small" style={{ fontWeight: 700 }}>
            {selectedCount} lead(s) selecionado(s)
            {!selectAllMatching && wholePageSelected && result.total > result.leads.length && (
              <button type="button" className="link-btn" style={{ marginLeft: 10 }} onClick={() => setSelectAllMatching(true)}>
                Selecionar todos os {result.total} que correspondem ao filtro
              </button>
            )}
          </div>
          <div className="hstack">
            <button className="btn btn-ghost btn-sm" onClick={() => { setSelected(new Set()); setSelectAllMatching(false); }}>Limpar seleção</button>
            <button className="btn btn-primary btn-sm" style={{ background: 'var(--danger)', borderColor: 'var(--danger)' }} disabled={bulkDeleting} onClick={bulkDelete}>
              {bulkDeleting ? 'Excluindo…' : 'Excluir selecionados'}
            </button>
          </div>
        </div>
      )}

      <div className="table-wrap">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                {canDelete && (
                  <th style={{ width: 36 }}>
                    <input type="checkbox" checked={wholePageSelected} onChange={togglePage} onClick={(e) => e.stopPropagation()} />
                  </th>
                )}
                <th>Lead</th><th>Etapa</th><th>Origem</th><th>Atendente</th><th>Último contato</th><th>Próxima ação</th>
              </tr>
            </thead>
            <tbody>
              {result.leads.map((l) => (
                <tr key={l.id} onClick={() => navigate(`/leads/${l.id}`)}>
                  {canDelete && (
                    <td onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={selected.has(l.id)} onChange={() => toggleOne(l.id)} />
                    </td>
                  )}
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
                  <td className="hstack">{l.sourceName && <SourceIcon name={l.sourceName} />} {l.sourceName || '—'}</td>
                  <td>{l.ownerName || '—'}</td>
                  <td>{fmtDate(l.lastContactDate)} <span className="muted small">({daysSince(l.lastContactDate)}d)</span></td>
                  <td className="small">{l.nextAction || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && result.leads.length === 0 && (
          <div className="empty-state"><div className="big"><Icon name="search" size={32} /></div>Nenhum lead encontrado com esses filtros.</div>
        )}
        <div className="pagination">
          <span>Página {page} de {totalPages}</span>
          <div className="hstack">
            <button className="btn btn-secondary btn-sm hstack" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}><Icon name="arrow-left" size={14} /> Anterior</button>
            <button className="btn btn-secondary btn-sm hstack" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Próxima <Icon name="arrow-right" size={14} /></button>
          </div>
        </div>
      </div>

      {showForm && <LeadFormModal onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); load(); }} />}
    </div>
  );
}
