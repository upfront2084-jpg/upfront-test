import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { LOST_REASONS } from '../lib/constants.js';
import { fmtDate, initials, waLink } from '../lib/format.js';
import { useToast } from '../context/ToastContext.jsx';
import Icon from '../components/Icon.jsx';

function defaultMessage(name) {
  const firstName = (name || '').trim().split(/\s+/)[0] || '';
  return `Olá${firstName ? ' ' + firstName : ''}! Aqui é da Upfront Idiomas 🙂 Faz um tempo que conversamos, e eu queria saber se você ainda tem interesse em retomar as aulas de inglês. Posso te ajudar com alguma coisa?`;
}

export default function LostLeads() {
  const [reason, setReason] = useState('all');
  const [summary, setSummary] = useState({ reasons: [], total: 0 });
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { push } = useToast();

  async function loadSummary() {
    const data = await api.get('/lost/summary');
    setSummary(data);
  }
  async function loadLeads() {
    setLoading(true);
    const qs = reason === 'all' ? '' : `?lostReason=${reason}`;
    const { leads } = await api.get(`/lost/leads${qs}`);
    setLeads(leads);
    setLoading(false);
  }

  useEffect(() => { loadSummary(); }, []);
  useEffect(() => { loadLeads(); }, [reason]); // eslint-disable-line react-hooks/exhaustive-deps

  async function copyNumber(whatsapp) {
    try {
      await navigator.clipboard.writeText(whatsapp);
      push('Número copiado', 'success');
    } catch {
      push('Não foi possível copiar', 'error');
    }
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Leads Perdidos</h1>
          <div className="sub">Separados por motivo, com acesso rápido ao WhatsApp para reengajar manualmente</div>
        </div>
      </div>

      <div className="recovery-bucket-tabs">
        <button className={`pill-opt ${reason === 'all' ? 'active' : ''}`} onClick={() => setReason('all')}>
          Todos <span className="muted">({summary.total})</span>
        </button>
        {LOST_REASONS.map((r) => {
          const count = summary.reasons.find((x) => x.key === r.key)?.count ?? 0;
          return (
            <button key={r.key} className={`pill-opt ${reason === r.key ? 'active' : ''}`} onClick={() => setReason(r.key)}>
              {r.label} <span className="muted">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="table-wrap">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Lead</th><th>WhatsApp</th><th>Origem</th><th>Perdido em</th><th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td onClick={() => navigate(`/leads/${l.id}`)} style={{ cursor: 'pointer' }}>
                    <div className="name-cell">
                      <span className="avatar-sm">{initials(l.name)}</span>
                      <div><div style={{ fontWeight: 700 }}>{l.name}</div><div className="meta">{l.objective || '—'}</div></div>
                    </div>
                  </td>
                  <td>{l.whatsapp || '—'}</td>
                  <td>{l.sourceName || '—'}</td>
                  <td>{fmtDate(l.lastStageChangeAt)}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="hstack">
                      {l.whatsapp && (
                        <a className="btn btn-primary btn-sm hstack" href={waLink(l.whatsapp, defaultMessage(l.name))} target="_blank" rel="noreferrer">
                          <Icon name="message-circle" size={14} /> Abrir WhatsApp
                        </a>
                      )}
                      {l.whatsapp && (
                        <button className="btn btn-ghost btn-sm hstack" onClick={() => copyNumber(l.whatsapp)}>
                          <Icon name="copy" size={14} /> Copiar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && leads.length === 0 && (
          <div className="empty-state"><div className="big"><Icon name="user-x" size={32} /></div>Nenhum lead perdido nessa categoria.</div>
        )}
      </div>
    </div>
  );
}
