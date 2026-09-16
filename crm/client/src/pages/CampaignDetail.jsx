import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api.js';
import { fmtDate } from '../lib/format.js';
import StageBadge from '../components/StageBadge.jsx';
import { useToast } from '../context/ToastContext.jsx';

const OUTCOME_FIELDS = [
  { key: 'responded', label: 'Respondeu' },
  { key: 'interested', label: 'Demonstrou interesse' },
  { key: 'scheduledTrial', label: 'Agendou experimental' },
  { key: 'enrolled', label: 'Matriculou' },
];

export default function CampaignDetail() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const navigate = useNavigate();
  const { push } = useToast();

  async function load() {
    const r = await api.get(`/campaigns/${id}`);
    setCampaign(r.campaign);
    setRecipients(r.recipients);
  }
  useEffect(() => { load(); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function setOutcome(recipient, key, value) {
    try {
      await api.put(`/campaigns/${id}/recipients/${recipient.id}`, { [key]: value });
      load();
    } catch (err) { push(err.message, 'error'); }
  }

  if (!campaign) return <div className="page-loading">Carregando campanha…</div>;

  return (
    <div>
      <button className="link-btn mb12" onClick={() => navigate('/campaigns')}>← Voltar para campanhas</button>
      <div className="card mb12">
        <div className="hstack" style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{campaign.name}</div>
            <div className="small muted mt8">{campaign.targetDescription}</div>
          </div>
          <span className="badge" style={{ background: 'var(--accent-soft)', color: 'var(--accent-dark)' }}>{campaign.status}</span>
        </div>
        <div className="stat-inline mt16">
          <div className="s"><div className="v small">{campaign.channel}</div><div className="l">Canal</div></div>
          <div className="s"><div className="v small">{fmtDate(campaign.date)}</div><div className="l">Data de envio</div></div>
          <div className="s"><div className="v small">{recipients.length}</div><div className="l">Contatos</div></div>
        </div>
        {campaign.message && <div className="mt16 small" style={{ background: 'var(--surface-2)', padding: 10, borderRadius: 10 }}>💬 {campaign.message}</div>}
      </div>

      <div className="section-title">Leads participantes ({recipients.length})</div>
      <div className="table-wrap">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr><th>Lead</th><th>Etapa atual</th>{OUTCOME_FIELDS.map((f) => <th key={f.key}>{f.label}</th>)}</tr>
            </thead>
            <tbody>
              {recipients.map((r) => (
                <tr key={r.id} style={{ cursor: 'default' }}>
                  <td onClick={() => navigate(`/leads/${r.leadId}`)} style={{ cursor: 'pointer' }}>
                    <div style={{ fontWeight: 700 }}>{r.leadName}</div>
                    <div className="meta small muted">{r.whatsapp}</div>
                  </td>
                  <td onClick={() => navigate(`/leads/${r.leadId}`)} style={{ cursor: 'pointer' }}><StageBadge status={r.leadStatus} /></td>
                  {OUTCOME_FIELDS.map((f) => (
                    <td key={f.key}>
                      <input type="checkbox" checked={r[f.key]} onChange={(e) => setOutcome(r, f.key, e.target.checked)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
