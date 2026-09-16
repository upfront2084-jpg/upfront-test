import { useState } from 'react';
import Modal from './Modal.jsx';
import { useRefData } from '../context/RefDataContext.jsx';
import { TRIAL_STATUS, TRIAL_RESULT, ENGLISH_LEVELS } from '../lib/constants.js';
import { api } from '../api.js';
import { useToast } from '../context/ToastContext.jsx';

export default function TrialFormModal({ leadId, trial, onClose, onSaved }) {
  const { teachers } = useRefData();
  const { push } = useToast();
  const [form, setForm] = useState(() => trial ? {
    status: trial.status, date: trial.date || '', time: trial.time || '', teacherId: trial.teacherId || '',
    levelIdentified: trial.levelIdentified || '', objective: trial.objective || '', teacherNotes: trial.teacherNotes || '',
    result: trial.result || '',
  } : { status: 'Agendada', date: '', time: '', teacherId: '', levelIdentified: '', objective: '', teacherNotes: '', result: '' });
  const [saving, setSaving] = useState(false);

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (trial) {
        await api.put(`/trials/${trial.id}`, form);
      } else {
        await api.post(`/leads/${leadId}/trials`, form);
      }
      push('Aula experimental salva', 'success');
      onSaved?.();
    } catch (err) {
      push(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title={trial ? 'Atualizar aula experimental' : 'Agendar aula experimental'}
      onClose={onClose}
      footer={<>
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" form="trial-form" disabled={saving}>{saving ? 'Salvando…' : 'Salvar'}</button>
      </>}
    >
      <form id="trial-form" onSubmit={submit}>
        <div className="field-row">
          <div className="field">
            <label>Data</label>
            <input className="input" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} required />
          </div>
          <div className="field">
            <label>Horário</label>
            <input className="input" type="time" value={form.time} onChange={(e) => set('time', e.target.value)} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Professor</label>
            <select className="input" value={form.teacherId} onChange={(e) => set('teacherId', e.target.value)}>
              <option value="">Não definido</option>
              {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Status</label>
            <select className="input" value={form.status} onChange={(e) => set('status', e.target.value)}>
              {TRIAL_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Nível identificado</label>
            <select className="input" value={form.levelIdentified} onChange={(e) => set('levelIdentified', e.target.value)}>
              <option value="">Não avaliado</option>
              {ENGLISH_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Resultado</label>
            <select className="input" value={form.result} onChange={(e) => set('result', e.target.value)}>
              <option value="">Aguardando</option>
              {TRIAL_RESULT.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <label>Objetivo do aluno</label>
          <input className="input" value={form.objective} onChange={(e) => set('objective', e.target.value)} />
        </div>
        <div className="field">
          <label>Observações do professor</label>
          <textarea className="input" value={form.teacherNotes} onChange={(e) => set('teacherNotes', e.target.value)} />
        </div>
      </form>
    </Modal>
  );
}
