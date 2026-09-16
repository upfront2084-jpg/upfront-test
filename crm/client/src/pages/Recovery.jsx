import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { RECOVERY_BUCKETS } from '../lib/constants.js';
import { fmtDate, initials } from '../lib/format.js';
import StageBadge from '../components/StageBadge.jsx';
import CampaignCreateModal from '../components/CampaignCreateModal.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Recovery() {
  const [bucket, setBucket] = useState('30');
  const [buckets, setBuckets] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showCampaign, setShowCampaign] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  async function loadSummary() {
    const { buckets } = await api.get('/recovery/summary');
    setBuckets(buckets);
  }
  async function loadLeads() {
    setLoading(true);
    const { leads } = await api.get(`/recovery/leads?bucket=${bucket}`);
    setLeads(leads);
    setSelected(new Set());
    setLoading(false);
  }

  useEffect(() => { loadSummary(); }, []);
  useEffect(() => { loadLeads(); }, [bucket]); // eslint-disable-line react-hooks/exhaustive-deps

  function toggle(id) {
    setSelected((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function toggleAll() {
    setSelected((s) => (s.size === leads.length ? new Set() : new Set(leads.map((l) => l.id))));
  }

  const bucketLabel = RECOVERY_BUCKETS.find((b) => b.key === bucket)?.label;

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Recuperação de Leads</h1>
          <div className="sub">Leads que fizeram experimental sem matricular, receberam proposta sem fechar, pararam de responder ou foram perdidos</div>
        </div>
        <div className="topbar-right">
          {selected.size > 0 && (
            <button className="btn btn-primary" onClick={() => setShowCampaign(true)}>
              📣 Criar campanha com {selected.size} leads
            </button>
          )}
        </div>
      </div>

      <div className="recovery-bucket-tabs">
        {RECOVERY_BUCKETS.map((b) => {
          const count = buckets.find((x) => x.key === b.key)?.count ?? 0;
          return (
            <button key={b.key} className={`pill-opt ${bucket === b.key ? 'active' : ''}`} onClick={() => setBucket(b.key)}>
              {b.label} <span className="muted">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="table-wrap">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th><input type="checkbox" checked={leads.length > 0 && selected.size === leads.length} onChange={toggleAll} /></th>
                <th>Lead</th><th>Etapa</th><th>Origem</th><th>Experimentais</th><th>Última proposta</th><th>Sem contato desde</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td onClick={(e) => e.stopPropagation()}><input type="checkbox" checked={selected.has(l.id)} onChange={() => toggle(l.id)} /></td>
                  <td onClick={() => navigate(`/leads/${l.id}`)}>
                    <div className="name-cell">
                      <span className="avatar-sm">{initials(l.name)}</span>
                      <div><div style={{ fontWeight: 700 }}>{l.name}</div><div className="meta">{l.whatsapp}</div></div>
                    </div>
                  </td>
                  <td onClick={() => navigate(`/leads/${l.id}`)}><StageBadge status={l.status} /></td>
                  <td onClick={() => navigate(`/leads/${l.id}`)}>{l.sourceName || '—'}</td>
                  <td onClick={() => navigate(`/leads/${l.id}`)}>{l.trialsDone > 0 ? `${l.trialsDone} realizada(s)` : '—'}</td>
                  <td onClick={() => navigate(`/leads/${l.id}`)}>{l.lastProposalStatus || '—'}</td>
                  <td onClick={() => navigate(`/leads/${l.id}`)}>{fmtDate(l.lastContactDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && leads.length === 0 && (
          <div className="empty-state"><div className="big">♻️</div>Nenhum lead parado há {bucketLabel?.toLowerCase()} no momento.</div>
        )}
      </div>

      {showCampaign && (
        <CampaignCreateModal
          leadIds={[...selected]}
          targetDescription={`Recuperação — ${bucketLabel} sem contato`}
          onClose={() => setShowCampaign(false)}
          onSaved={() => { setShowCampaign(false); navigate('/campaigns'); }}
        />
      )}
    </div>
  );
}
