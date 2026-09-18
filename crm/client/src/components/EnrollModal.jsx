import { useState } from 'react';
import Modal from './Modal.jsx';
import { useRefData } from '../context/RefDataContext.jsx';
import { api } from '../api.js';
import { useToast } from '../context/ToastContext.jsx';
import { todayISO } from '../lib/format.js';

export default function EnrollModal({ leadId, onClose, onSaved }) {
  const { packages, teachers } = useRefData();
  const { push } = useToast();
  const [form, setForm] = useState({
    enrollmentDate: todayISO(), startDate: '', packageId: '', teacherId: '', frequency: '', scheduleText: '',
    monthlyValue: '', discountValue: '', paymentMethod: '', startingClass: '', notes: '',
  });
  const [saving, setSaving] = useState(false);

  const finalValue = form.monthlyValue !== '' && form.monthlyValue !== null
    ? Math.max(0, Number(form.monthlyValue) - (Number(form.discountValue) || 0))
    : null;

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  function pickPackage(id) {
    const pkg = packages.find((p) => p.id === id);
    setForm((f) => ({ ...f, packageId: id, monthlyValue: pkg?.price ?? f.monthlyValue, frequency: pkg ? `${pkg.hoursPerWeek}x por semana` : f.frequency }));
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post(`/leads/${leadId}/enroll`, {
        ...form,
        monthlyValue: finalValue,
        discountValue: form.discountValue ? Number(form.discountValue) : null,
      });
      push('Matrícula confirmada', 'success');
      onSaved?.();
    } catch (err) {
      push(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title="Confirmar matrícula"
      onClose={onClose}
      footer={<>
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" form="enroll-form" disabled={saving}>{saving ? 'Salvando…' : 'Confirmar matrícula'}</button>
      </>}
    >
      <form id="enroll-form" onSubmit={submit}>
        <div className="field-row">
          <div className="field">
            <label>Data da matrícula</label>
            <input className="input" type="date" value={form.enrollmentDate} onChange={(e) => set('enrollmentDate', e.target.value)} required />
          </div>
          <div className="field">
            <label>Data de início das aulas</label>
            <input className="input" type="date" value={form.startDate} onChange={(e) => set('startDate', e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Pacote contratado</label>
          <select className="input" value={form.packageId} onChange={(e) => pickPackage(e.target.value)}>
            <option value="">Selecionar…</option>
            {packages.map((p) => <option key={p.id} value={p.id}>{p.name} — R$ {p.price}/mês</option>)}
          </select>
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
            <label>Frequência das aulas</label>
            <input className="input" value={form.frequency} onChange={(e) => set('frequency', e.target.value)} placeholder="Ex: 3x por semana" />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Horário</label>
            <input className="input" value={form.scheduleText} onChange={(e) => set('scheduleText', e.target.value)} placeholder="Seg/Qua/Sex 08:00" />
          </div>
          <div className="field">
            <label>Valor do pacote (R$)</label>
            <input className="input" type="number" step="0.01" value={form.monthlyValue} onChange={(e) => set('monthlyValue', e.target.value)} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Desconto (R$)</label>
            <input className="input" type="number" step="0.01" value={form.discountValue} onChange={(e) => set('discountValue', e.target.value)} placeholder="0,00" />
          </div>
          <div className="field">
            <label>Valor final mensal</label>
            <input className="input" value={finalValue !== null ? `R$ ${finalValue.toFixed(2)}` : '—'} disabled />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Forma de pagamento</label>
            <input className="input" value={form.paymentMethod} onChange={(e) => set('paymentMethod', e.target.value)} />
          </div>
          <div className="field">
            <label>Turma / aula em que começou</label>
            <input className="input" value={form.startingClass} onChange={(e) => set('startingClass', e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Observações</label>
          <textarea className="input" value={form.notes} onChange={(e) => set('notes', e.target.value)} />
        </div>
      </form>
    </Modal>
  );
}
