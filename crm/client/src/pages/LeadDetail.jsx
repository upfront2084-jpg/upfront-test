import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { STAGES, INTERACTION_ICONS } from '../lib/constants.js';
import { fmtDate, fmtDateTime, fmtMoney, initials, daysSince } from '../lib/format.js';
import StageBadge from '../components/StageBadge.jsx';
import LeadFormModal from '../components/LeadFormModal.jsx';
import TrialFormModal from '../components/TrialFormModal.jsx';
import ProposalFormModal from '../components/ProposalFormModal.jsx';
import EnrollModal from '../components/EnrollModal.jsx';
import TaskFormModal from '../components/TaskFormModal.jsx';

const TABS = ['Linha do tempo', 'Aula experimental', 'Proposta', 'Matrícula', 'Tarefas', 'Notas'];

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { push } = useToast();
  const [lead, setLead] = useState(null);
  const [tab, setTab] = useState(TABS[0]);
  const [noteText, setNoteText] = useState('');
  const [modal, setModal] = useState(null); // 'edit' | 'trial' | 'proposal' | 'enroll' | 'task'
  const [editingTrial, setEditingTrial] = useState(null);
  const [editingProposal, setEditingProposal] = useState(null);
  const canEdit = ['admin', 'manager', 'agent'].includes(user.role);

  async function load() {
    try {
      const { lead } = await api.get(`/leads/${id}`);
      setLead(lead);
    } catch (err) {
      push(err.message, 'error');
      navigate('/leads');
    }
  }

  useEffect(() => { load(); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lead) return <div className="page-loading">Carregando lead…</div>;

  async function changeStage(status) {
    try {
      await api.post(`/leads/${id}/stage`, { status });
      push('Etapa atualizada', 'success');
      load();
    } catch (err) { push(err.message, 'error'); }
  }

  async function addNote(e) {
    e.preventDefault();
    if (!noteText.trim()) return;
    try {
      await api.post(`/leads/${id}/notes`, { text: noteText });
      setNoteText('');
      load();
    } catch (err) { push(err.message, 'error'); }
  }

  async function toggleTask(task) {
    try {
      await api.put(`/tasks/${task.id}`, { status: task.status === 'Concluída' ? 'Pendente' : 'Concluída' });
      load();
    } catch (err) { push(err.message, 'error'); }
  }

  const canDelete = ['admin', 'manager'].includes(user.role);

  async function deleteLead() {
    if (!confirm(`Excluir o lead "${lead.name}"? Isso apaga todo o histórico (notas, tarefas, experimentais, propostas) e não pode ser desfeito.`)) return;
    try {
      await api.del(`/leads/${id}`);
      push('Lead excluído', 'success');
      navigate('/leads');
    } catch (err) { push(err.message, 'error'); }
  }

  return (
    <div>
      <button className="link-btn mb12" onClick={() => navigate(-1)}>← Voltar</button>

      <div className="card" style={{ marginBottom: 18 }}>
        <div className="hstack" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div className="hstack">
            <span className="avatar-sm" style={{ width: 46, height: 46, fontSize: 16 }}>{initials(lead.name)}</span>
            <div>
              <div style={{ fontSize: 19, fontWeight: 800 }}>{lead.name}</div>
              <div className="hstack small muted" style={{ marginTop: 3 }}>
                <span>{lead.whatsapp || '—'}</span> · <span>{lead.email || '—'}</span> · <span>{lead.city || '—'}</span>
              </div>
            </div>
          </div>
          <div className="hstack">
            <StageBadge status={lead.status} />
            {canEdit && (
              <select className="input" style={{ width: 200 }} value={lead.status} onChange={(e) => changeStage(e.target.value)}>
                {STAGES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            )}
            {canEdit && <button className="btn btn-secondary btn-sm" onClick={() => setModal('edit')}>Editar</button>}
            {canDelete && <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={deleteLead}>Excluir</button>}
          </div>
        </div>

        <div className="grid-2 mt20">
          <div>
            <div className="stat-inline">
              <div className="s"><div className="v small">{lead.sourceIcon} {lead.sourceName || '—'}</div><div className="l">Origem</div></div>
              <div className="s"><div className="v small">{lead.ownerName || '—'}</div><div className="l">Atendente</div></div>
              <div className="s"><div className="v small">{lead.teacherName || '—'}</div><div className="l">Professor</div></div>
              <div className="s"><div className="v small">{lead.englishLevel || '—'}</div><div className="l">Nível</div></div>
              <div className="s"><div className="v small">{lead.objective || '—'}</div><div className="l">Objetivo</div></div>
              <div className="s"><div className="v small">{lead.age || '—'}</div><div className="l">Idade</div></div>
            </div>
          </div>
          <div>
            <div className="stat-inline">
              <div className="s"><div className="v small">{fmtDate(lead.entryDate)}</div><div className="l">Entrada</div></div>
              <div className="s"><div className="v small">{fmtDate(lead.lastContactDate)} ({daysSince(lead.lastContactDate)}d)</div><div className="l">Último contato</div></div>
              <div className="s"><div className="v small">{fmtDate(lead.nextContactDate)}</div><div className="l">Próximo contato</div></div>
              <div className="s"><div className="v small">{lead.nextAction || '—'}</div><div className="l">Próxima ação</div></div>
            </div>
          </div>
        </div>
        {lead.notes && <div className="mt16 small" style={{ background: 'var(--surface-2)', padding: 10, borderRadius: 10 }}>📝 {lead.notes}</div>}

        {canEdit && (
          <div className="hstack mt16" style={{ flexWrap: 'wrap' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => { setEditingTrial(null); setModal('trial'); }}>🎓 Agendar experimental</button>
            <button className="btn btn-secondary btn-sm" onClick={() => { setEditingProposal(null); setModal('proposal'); }}>📄 Enviar proposta</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setModal('task')}>✅ Nova tarefa</button>
            {lead.status !== 'matriculado' && (
              <button className="btn btn-primary btn-sm" onClick={() => setModal('enroll')}>🎉 Confirmar matrícula</button>
            )}
          </div>
        )}
      </div>

      <div className="tabs">
        {TABS.map((t) => (
          <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'Linha do tempo' && (
        <div className="card">
          {lead.timeline.length === 0 ? <div className="empty-state">Sem eventos ainda.</div> : (
            <div className="timeline">
              {[...lead.timeline].reverse().map((ev) => (
                <div className="timeline-item" key={ev.id}>
                  <span className="timeline-icon">{INTERACTION_ICONS[ev.type] || '•'}</span>
                  <div className="ti-note">{ev.note}</div>
                  <div className="ti-meta">{fmtDateTime(ev.datetime)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'Aula experimental' && (
        <div className="stack">
          {lead.trials.length === 0 && <div className="card empty-state">Nenhuma aula experimental registrada ainda.</div>}
          {lead.trials.map((t) => (
            <div className="card" key={t.id}>
              <div className="hstack" style={{ justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{fmtDate(t.date)} {t.time && `às ${t.time}`}</div>
                  <div className="small muted">Professor: {t.teacherId ? (t.teacherName || '—') : '—'}</div>
                </div>
                <div className="hstack">
                  <span className="badge" style={{ background: 'var(--accent-soft)', color: 'var(--accent-dark)' }}>{t.status}</span>
                  {canEdit && <button className="btn btn-ghost btn-sm" onClick={() => { setEditingTrial(t); setModal('trial'); }}>Editar</button>}
                </div>
              </div>
              <div className="grid-2 mt12 small">
                <div><b>Nível identificado:</b> {t.levelIdentified || '—'}</div>
                <div><b>Resultado:</b> {t.result || '—'}</div>
              </div>
              {t.teacherNotes && <div className="mt12 small">🗒️ {t.teacherNotes}</div>}
            </div>
          ))}
        </div>
      )}

      {tab === 'Proposta' && (
        <div className="stack">
          {lead.proposals.length === 0 && <div className="card empty-state">Nenhuma proposta enviada ainda.</div>}
          {lead.proposals.map((p) => (
            <div className="card" key={p.id}>
              <div className="hstack" style={{ justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{p.packageLabel || 'Pacote personalizado'} — {fmtMoney(p.value)}/mês</div>
                  <div className="small muted">Enviada em {fmtDate(p.date)} · Decisão prevista {fmtDate(p.decisionDate)}</div>
                </div>
                <div className="hstack">
                  <span className="badge" style={{ background: 'var(--purple-soft)', color: 'var(--purple)' }}>{p.status}</span>
                  {canEdit && <button className="btn btn-ghost btn-sm" onClick={() => { setEditingProposal(p); setModal('proposal'); }}>Editar</button>}
                </div>
              </div>
              <div className="grid-2 mt12 small">
                <div><b>Forma de pagamento:</b> {p.paymentMethod || '—'}</div>
                <div><b>Condição especial:</b> {p.specialCondition || '—'}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Matrícula' && (
        <div className="card">
          {!lead.enrollment ? <div className="empty-state">Lead ainda não foi matriculado.</div> : (
            <div className="grid-2 small">
              <div><b>Data da matrícula:</b> {fmtDate(lead.enrollment.enrollmentDate)}</div>
              <div><b>Início das aulas:</b> {fmtDate(lead.enrollment.startDate)}</div>
              <div><b>Frequência:</b> {lead.enrollment.frequency || '—'}</div>
              <div><b>Horário:</b> {lead.enrollment.scheduleText || '—'}</div>
              <div><b>Valor mensal:</b> {fmtMoney(lead.enrollment.monthlyValue)}</div>
              <div><b>Forma de pagamento:</b> {lead.enrollment.paymentMethod || '—'}</div>
              <div><b>Turma inicial:</b> {lead.enrollment.startingClass || '—'}</div>
              <div><b>Observações:</b> {lead.enrollment.notes || '—'}</div>
            </div>
          )}
        </div>
      )}

      {tab === 'Tarefas' && (
        <div className="stack">
          {lead.tasks.length === 0 && <div className="card empty-state">Nenhuma tarefa para este lead.</div>}
          {lead.tasks.map((t) => (
            <div key={t.id} className={`checklist-item ${t.status === 'Pendente' && t.dueDate < new Date().toISOString().slice(0,10) ? 'overdue' : ''}`}>
              <input type="checkbox" checked={t.status === 'Concluída'} onChange={() => toggleTask(t)} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, textDecoration: t.status === 'Concluída' ? 'line-through' : 'none' }}>{t.title}</div>
                <div className="small muted">{fmtDate(t.dueDate)} {t.dueTime} · {t.type} {t.note && `— ${t.note}`}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Notas' && (
        <div className="stack">
          <form className="card" onSubmit={addNote}>
            <div className="field">
              <label>Nova nota</label>
              <textarea className="input" value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Registrar uma observação sobre este lead…" />
            </div>
            <button className="btn btn-primary btn-sm">Adicionar nota</button>
          </form>
          {lead.notes_list.map((n) => (
            <div className="card" key={n.id}>
              <div>{n.text}</div>
              <div className="small muted mt8">{fmtDateTime(n.datetime)}</div>
            </div>
          ))}
        </div>
      )}

      {modal === 'edit' && <LeadFormModal lead={lead} onClose={() => setModal(null)} onSaved={() => { setModal(null); load(); }} />}
      {modal === 'trial' && <TrialFormModal leadId={lead.id} trial={editingTrial} onClose={() => setModal(null)} onSaved={() => { setModal(null); load(); }} />}
      {modal === 'proposal' && <ProposalFormModal leadId={lead.id} proposal={editingProposal} onClose={() => setModal(null)} onSaved={() => { setModal(null); load(); }} />}
      {modal === 'enroll' && <EnrollModal leadId={lead.id} onClose={() => setModal(null)} onSaved={() => { setModal(null); load(); }} />}
      {modal === 'task' && <TaskFormModal leadId={lead.id} leadName={lead.name} onClose={() => setModal(null)} onSaved={() => { setModal(null); load(); }} />}
    </div>
  );
}
