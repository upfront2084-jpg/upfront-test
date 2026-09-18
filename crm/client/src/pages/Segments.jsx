import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useToast } from '../context/ToastContext.jsx';
import SegmentFormModal from '../components/SegmentFormModal.jsx';
import CampaignCreateModal from '../components/CampaignCreateModal.jsx';
import { useBulkSelect } from '../hooks/useBulkSelect.js';
import Icon from '../components/Icon.jsx';

export default function Segments() {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [campaignTarget, setCampaignTarget] = useState(null);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const { push } = useToast();
  const { selected, toggle, toggleAll, clear } = useBulkSelect();

  async function load() {
    setLoading(true);
    const { segments } = await api.get('/segments');
    setSegments(segments);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!confirm('Excluir este segmento?')) return;
    try {
      await api.del(`/segments/${id}`);
      push('Segmento excluído', 'success');
      load();
    } catch (err) {
      push(err.message, 'error');
    }
  }

  async function bulkDelete() {
    if (!confirm(`Excluir ${selected.size} segmento(s) selecionado(s)?`)) return;
    setBulkDeleting(true);
    try {
      const { count } = await api.post('/segments/bulk-delete', { ids: [...selected] });
      push(`${count} segmento(s) excluído(s)`, 'success');
      clear();
      load();
    } catch (err) {
      push(err.message, 'error');
    } finally {
      setBulkDeleting(false);
    }
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Segmentos</h1>
          <div className="sub">Filtros salvos para encontrar rapidamente grupos específicos de leads</div>
        </div>
        <div className="topbar-right">
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Novo segmento</button>
        </div>
      </div>

      {segments.length > 0 && (
        <div className="hstack mb12" style={{ justifyContent: 'space-between' }}>
          <label className="hstack small" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={segments.length > 0 && segments.every((s) => selected.has(s.id))} onChange={() => toggleAll(segments.map((s) => s.id))} />
            Selecionar todos
          </label>
          {selected.size > 0 && (
            <div className="hstack">
              <span className="small muted">{selected.size} selecionado(s)</span>
              <button className="btn btn-ghost btn-sm" onClick={clear}>Limpar</button>
              <button className="btn btn-primary btn-sm" style={{ background: 'var(--danger)', borderColor: 'var(--danger)' }} disabled={bulkDeleting} onClick={bulkDelete}>
                {bulkDeleting ? 'Excluindo…' : 'Excluir selecionados'}
              </button>
            </div>
          )}
        </div>
      )}

      {loading ? <div className="page-loading">Carregando segmentos…</div> : (
        <div className="chart-grid">
          {segments.map((s) => (
            <div className="chart-card" key={s.id}>
              <div className="hstack" style={{ justifyContent: 'space-between' }}>
                <label className="hstack" style={{ cursor: 'pointer' }}>
                  <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggle(s.id)} />
                  <h3 style={{ margin: 0 }}>{s.name}</h3>
                </label>
                <span className="badge" style={{ background: 'var(--accent-soft)', color: 'var(--accent-dark)' }}>{s.count} leads</span>
              </div>
              <div className="small muted mt8">{s.description}</div>
              <div className="hstack mt16">
                <button className="btn btn-secondary btn-sm hstack" onClick={() => setCampaignTarget(s)} disabled={s.count === 0}><Icon name="send" size={14} /> Criar campanha</button>
                <button className="btn btn-ghost btn-sm" onClick={() => remove(s.id)}>Excluir</button>
              </div>
            </div>
          ))}
          {segments.length === 0 && <div className="empty-state"><div className="big"><Icon name="filter" size={32} /></div>Nenhum segmento criado ainda.</div>}
        </div>
      )}

      {showForm && <SegmentFormModal onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); load(); }} />}
      {campaignTarget && (
        <CampaignCreateModal
          filters={campaignTarget.filters}
          targetDescription={campaignTarget.name}
          onClose={() => setCampaignTarget(null)}
          onSaved={() => setCampaignTarget(null)}
        />
      )}
    </div>
  );
}
