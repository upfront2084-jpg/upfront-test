import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { fmtDate } from '../lib/format.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useBulkSelect } from '../hooks/useBulkSelect.js';
import Icon from '../components/Icon.jsx';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { push } = useToast();
  const { selected, toggle, toggleAll, clear } = useBulkSelect();
  const canDelete = ['admin', 'manager'].includes(user.role);

  async function load() {
    setLoading(true);
    const r = await api.get('/campaigns');
    setCampaigns(r.campaigns);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function bulkDelete() {
    if (!confirm(`Excluir ${selected.size} campanha(s) selecionada(s)? Isso não pode ser desfeito.`)) return;
    setBulkDeleting(true);
    try {
      const { count } = await api.post('/campaigns/bulk-delete', { ids: [...selected] });
      push(`${count} campanha(s) excluída(s)`, 'success');
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
          <h1>Campanhas</h1>
          <div className="sub">Campanhas de recuperação enviadas para leads segmentados. Crie novas a partir da tela de Recuperação ou Segmentos.</div>
        </div>
      </div>

      {canDelete && selected.size > 0 && (
        <div className="card mb12 hstack" style={{ justifyContent: 'space-between', background: 'var(--accent-soft)' }}>
          <div className="small" style={{ fontWeight: 700 }}>{selected.size} campanha(s) selecionada(s)</div>
          <div className="hstack">
            <button className="btn btn-ghost btn-sm" onClick={clear}>Limpar seleção</button>
            <button className="btn btn-primary btn-sm" style={{ background: 'var(--danger)', borderColor: 'var(--danger)' }} disabled={bulkDeleting} onClick={bulkDelete}>
              {bulkDeleting ? 'Excluindo…' : 'Excluir selecionadas'}
            </button>
          </div>
        </div>
      )}

      {loading ? <div className="page-loading">Carregando campanhas…</div> : (
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  {canDelete && (
                    <th style={{ width: 36 }}>
                      <input type="checkbox" checked={campaigns.length > 0 && campaigns.every((c) => selected.has(c.id))} onChange={() => toggleAll(campaigns.map((c) => c.id))} onClick={(e) => e.stopPropagation()} />
                    </th>
                  )}
                  <th>Campanha</th><th>Canal</th><th>Data</th><th>Responsável</th><th>Contatos</th><th>Responderam</th><th>Agendaram</th><th>Matricularam</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} onClick={() => navigate(`/campaigns/${c.id}`)}>
                    {canDelete && (
                      <td onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={selected.has(c.id)} onChange={() => toggle(c.id)} />
                      </td>
                    )}
                    <td>
                      <div style={{ fontWeight: 700 }}>{c.name}</div>
                      <div className="meta small muted">{c.targetDescription}</div>
                    </td>
                    <td>{c.channel}</td>
                    <td>{fmtDate(c.date)}</td>
                    <td>{c.responsibleName || '—'}</td>
                    <td>{c.recipientCount}</td>
                    <td>{c.respondedCount}</td>
                    <td>{c.scheduledCount}</td>
                    <td>{c.enrolledCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {campaigns.length === 0 && <div className="empty-state"><div className="big"><Icon name="send" size={32} /></div>Nenhuma campanha criada ainda.</div>}
        </div>
      )}
    </div>
  );
}
