import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { fmtDate, todayISO } from '../lib/format.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import TaskFormModal from '../components/TaskFormModal.jsx';
import { useBulkSelect } from '../hooks/useBulkSelect.js';
import Icon from '../components/Icon.jsx';

const GROUP_ORDER = ['Primeiro contato', 'Confirmar experimental', 'Follow-up de proposta', 'Recuperação', 'Outro'];
const GROUP_LABELS = {
  'Primeiro contato': 'Leads para contatar',
  'Confirmar experimental': 'Experimentais para confirmar',
  'Follow-up de proposta': 'Propostas para acompanhar',
  'Recuperação': 'Recuperação',
  'Outro': 'Outras tarefas',
};
const GROUP_ICONS = {
  'Primeiro contato': 'phone',
  'Confirmar experimental': 'graduation-cap',
  'Follow-up de proposta': 'file-text',
  'Recuperação': 'refresh-cw',
  'Outro': 'more-horizontal',
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [recoveryCount, setRecoveryCount] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { push } = useToast();
  const { selected, toggle, toggleAll, clear } = useBulkSelect();
  const [bulkDeleting, setBulkDeleting] = useState(false);

  async function load() {
    setLoading(true);
    const [{ tasks }, recovery] = await Promise.all([
      api.get('/tasks?scope=today'),
      ['admin', 'manager', 'agent'].includes(user.role) ? api.get('/recovery/summary') : Promise.resolve(null),
    ]);
    setTasks(tasks);
    if (recovery) setRecoveryCount(recovery.buckets.reduce((a, b) => a + b.count, 0));
    setLoading(false);
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const today = todayISO();
  const overdue = useMemo(() => tasks.filter((t) => t.dueDate < today), [tasks, today]);
  const grouped = useMemo(() => {
    const g = {};
    for (const t of tasks) {
      const key = GROUP_ORDER.includes(t.type) ? t.type : 'Outro';
      (g[key] || (g[key] = [])).push(t);
    }
    return g;
  }, [tasks]);

  async function complete(t) {
    try {
      await api.put(`/tasks/${t.id}`, { status: 'Concluída' });
      load();
    } catch (err) {
      push(err.message, 'error');
    }
  }

  async function remove(t) {
    if (!confirm(`Excluir a tarefa "${t.title}"?`)) return;
    try {
      await api.del(`/tasks/${t.id}`);
      push('Tarefa excluída', 'success');
      load();
    } catch (err) {
      push(err.message, 'error');
    }
  }

  async function bulkDelete() {
    if (!confirm(`Excluir ${selected.size} tarefa(s) selecionada(s)?`)) return;
    setBulkDeleting(true);
    try {
      const { count } = await api.post('/tasks/bulk-delete', { ids: [...selected] });
      push(`${count} tarefa(s) excluída(s)`, 'success');
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
          <h1>Tarefas de Hoje</h1>
          <div className="sub">{tasks.length} tarefas pendentes · {overdue.length} atrasadas</div>
        </div>
        <div className="topbar-right">
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Nova tarefa</button>
        </div>
      </div>

      {loading ? <div className="page-loading">Carregando tarefas…</div> : (
        <>
          {tasks.length > 0 && (
            <div className="hstack mb12" style={{ justifyContent: 'space-between' }}>
              <label className="hstack small" style={{ cursor: 'pointer' }}>
                <input type="checkbox" checked={tasks.length > 0 && tasks.every((t) => selected.has(t.id))} onChange={() => toggleAll(tasks.map((t) => t.id))} />
                Selecionar todas
              </label>
              {selected.size > 0 && (
                <div className="hstack">
                  <span className="small muted">{selected.size} selecionada(s)</span>
                  <button className="btn btn-ghost btn-sm" onClick={clear}>Limpar</button>
                  <button className="btn btn-primary btn-sm" style={{ background: 'var(--danger)', borderColor: 'var(--danger)' }} disabled={bulkDeleting} onClick={bulkDelete}>
                    {bulkDeleting ? 'Excluindo…' : 'Excluir selecionadas'}
                  </button>
                </div>
              )}
            </div>
          )}

          {overdue.length > 0 && (
            <div className="card mb12" style={{ borderColor: 'var(--danger)' }}>
              <div className="hstack" style={{ justifyContent: 'space-between' }}>
                <div className="hstack" style={{ fontWeight: 800, color: 'var(--danger)' }}>
                  <Icon name="alert-triangle" size={16} /> {overdue.length} tarefas atrasadas precisam de atenção
                </div>
              </div>
            </div>
          )}

          {recoveryCount !== null && recoveryCount > 0 && (
            <div className="card mb12 hstack" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => navigate('/recovery')}>
              <div className="hstack"><Icon name="refresh-cw" size={15} /> <b>{recoveryCount}</b> leads disponíveis para campanhas de recuperação</div>
              <span className="link-btn hstack">Ver recuperação <Icon name="arrow-right" size={13} /></span>
            </div>
          )}

          {GROUP_ORDER.filter((g) => grouped[g]?.length).map((g) => (
            <div key={g}>
              <div className="section-title hstack"><Icon name={GROUP_ICONS[g]} size={15} /> {GROUP_LABELS[g]} ({grouped[g].length})</div>
              <div className="stack">
                {grouped[g].map((t) => (
                  <div key={t.id} className={`checklist-item ${t.dueDate < today ? 'overdue' : ''}`}>
                    <input type="checkbox" checked={selected.has(t.id)} onChange={() => toggle(t.id)} title="Selecionar" />
                    <input type="checkbox" onChange={() => complete(t)} title="Concluir" />
                    <div style={{ flex: 1, cursor: t.leadId ? 'pointer' : 'default' }} onClick={() => t.leadId && navigate(`/leads/${t.leadId}`)}>
                      <div style={{ fontWeight: 700 }}>{t.title}</div>
                      <div className="small muted">
                        {fmtDate(t.dueDate)} {t.dueTime} · {t.assignedUserName || '—'}
                        {t.dueDate < today && <span style={{ color: 'var(--danger)', fontWeight: 700 }}> · ATRASADA</span>}
                        {t.note && ` — ${t.note}`}
                      </div>
                    </div>
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => remove(t)}>Excluir</button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="empty-state"><div className="big"><Icon name="check-circle" size={32} /></div>Nenhuma tarefa pendente para hoje. Bom trabalho!</div>
          )}
        </>
      )}

      {showForm && <TaskFormModal onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); load(); }} />}
    </div>
  );
}
