import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { STAGES } from '../lib/constants.js';
import { fmtDate, initials, daysSince } from '../lib/format.js';
import { useToast } from '../context/ToastContext.jsx';

export default function Pipeline() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dragId, setDragId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);
  const navigate = useNavigate();
  const { push } = useToast();

  async function load() {
    setLoading(true);
    const { leads } = await api.get('/leads/kanban');
    setLeads(leads);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const byStage = useMemo(() => {
    const map = Object.fromEntries(STAGES.map((s) => [s.key, []]));
    for (const l of leads) (map[l.status] || (map[l.status] = [])).push(l);
    return map;
  }, [leads]);

  async function moveLead(leadId, newStatus) {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead || lead.status === newStatus) return;
    setLeads((ls) => ls.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
    try {
      await api.post(`/leads/${leadId}/stage`, { status: newStatus });
      push('Lead movido de etapa', 'success');
    } catch (err) {
      push(err.message, 'error');
      load();
    }
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Funil de Vendas</h1>
          <div className="sub">Arraste os cards entre as etapas — cada mudança fica registrada no histórico do lead</div>
        </div>
      </div>

      {loading ? <div className="page-loading">Carregando funil…</div> : (
        <div className="kanban-scroll">
          <div className="kanban">
            {STAGES.map((stage) => (
              <div
                key={stage.key}
                className={`kanban-col ${dragOverCol === stage.key ? 'drag-over' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOverCol(stage.key); }}
                onDragLeave={() => setDragOverCol((c) => (c === stage.key ? null : c))}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverCol(null);
                  if (dragId) moveLead(dragId, stage.key);
                }}
              >
                <div className="kanban-col-head">
                  <span className="dot" style={{ background: stage.color }} />
                  <span className="title">{stage.label}</span>
                  <span className="count">{byStage[stage.key]?.length || 0}</span>
                </div>
                <div className="kanban-col-body">
                  {(byStage[stage.key] || []).map((lead) => (
                    <div
                      key={lead.id}
                      className={`kanban-card ${dragId === lead.id ? 'dragging' : ''}`}
                      draggable
                      onDragStart={() => setDragId(lead.id)}
                      onDragEnd={() => setDragId(null)}
                      onClick={() => navigate(`/leads/${lead.id}`)}
                    >
                      <div className="hstack" style={{ marginBottom: 6 }}>
                        <span className="avatar-sm">{initials(lead.name)}</span>
                        <div className="kc-name">{lead.name}</div>
                      </div>
                      <div className="kc-meta">
                        <span>{lead.sourceIcon} {lead.sourceName || '—'}</span>
                        <span>· {daysSince(lead.lastContactDate)}d sem contato</span>
                      </div>
                      <div className="kc-foot">
                        <span className="small muted">{fmtDate(lead.nextContactDate)}</span>
                        <select
                          className="kc-move"
                          value={lead.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => moveLead(lead.id, e.target.value)}
                        >
                          {STAGES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}
                  {(byStage[stage.key] || []).length === 0 && <div className="muted small" style={{ padding: '10px 4px' }}>Vazio</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
