import { useState } from 'react';
import Modal from './Modal.jsx';
import { useRefData } from '../context/RefDataContext.jsx';
import { TASK_TYPES } from '../lib/constants.js';
import { api } from '../api.js';
import { useToast } from '../context/ToastContext.jsx';
import { todayISO } from '../lib/format.js';

export default function TaskFormModal({ leadId, leadName, onClose, onSaved }) {
  const { users } = useRefData();
  const { push } = useToast();
  const [form, setForm] = useState({
    title: leadName ? `Follow-up — ${leadName}` : '', type: 'Outro', dueDate: todayISO(), dueTime: '',
    assignedUserId: '', note: '',
  });
  const [saving, setSaving] = useState(false);

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return push('Informe um título', 'error');
    setSaving(true);
    try {
      await api.post('/tasks', { ...form, leadId: leadId || null });
      push('Tarefa criada', 'success');
      onSaved?.();
    } catch (err) {
      push(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title="Nova tarefa"
      onClose={onClose}
      footer={<>
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" form="task-form" disabled={saving}>{saving ? 'Salvando…' : 'Criar tarefa'}</button>
      </>}
    >
      <form id="task-form" onSubmit={submit}>
        <div className="field">
          <label>Título / próxima ação</label>
          <input className="input" value={form.title} onChange={(e) => set('title', e.target.value)} required />
        </div>
        <div className="field-row">
          <div className="field">
            <label>Tipo</label>
            <select className="input" value={form.type} onChange={(e) => set('type', e.target.value)}>
              {TASK_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Responsável</label>
            <select className="input" value={form.assignedUserId} onChange={(e) => set('assignedUserId', e.target.value)}>
              <option value="">Eu mesmo</option>
              {users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Data</label>
            <input className="input" type="date" value={form.dueDate} onChange={(e) => set('dueDate', e.target.value)} required />
          </div>
          <div className="field">
            <label>Horário</label>
            <input className="input" type="time" value={form.dueTime} onChange={(e) => set('dueTime', e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Observação</label>
          <textarea className="input" value={form.note} onChange={(e) => set('note', e.target.value)} />
        </div>
      </form>
    </Modal>
  );
}
