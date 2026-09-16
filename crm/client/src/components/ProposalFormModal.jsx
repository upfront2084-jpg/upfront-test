import { useState } from 'react';
import Modal from './Modal.jsx';
import { useRefData } from '../context/RefDataContext.jsx';
import { PROPOSAL_STATUS } from '../lib/constants.js';
import { api } from '../api.js';
import { useToast } from '../context/ToastContext.jsx';
import { todayISO } from '../lib/format.js';

export default function ProposalFormModal({ leadId, proposal, onClose, onSaved }) {
  const { packages } = useRefData();
  const { push } = useToast();
  const [form, setForm] = useState(() => proposal ? {
    date: proposal.date, packageId: proposal.packageId || '', packageLabel: proposal.packageLabel || '',
    value: proposal.value || '', paymentMethod: proposal.paymentMethod || '', specialCondition: proposal.specialCondition || '',
    decisionDate: proposal.decisionDate || '', status: proposal.status,
  } : {
    date: todayISO(), packageId: '', packageLabel: '', value: '', paymentMethod: '', specialCondition: '', decisionDate: '', status: 'Enviada',
  });
  const [saving, setSaving] = useState(false);

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  function pickPackage(id) {
    const pkg = packages.find((p) => p.id === id);
    setForm((f) => ({ ...f, packageId: id, packageLabel: pkg?.name || '', value: pkg?.price ?? f.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, value: form.value ? Number(form.value) : null };
      if (proposal) {
        await api.put(`/proposals/${proposal.id}`, payload);
      } else {
        await api.post(`/leads/${leadId}/proposals`, payload);
      }
      push('Proposta salva', 'success');
      onSaved?.();
    } catch (err) {
      push(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title={proposal ? 'Atualizar proposta' : 'Enviar proposta'}
      onClose={onClose}
      footer={<>
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" form="proposal-form" disabled={saving}>{saving ? 'Salvando…' : 'Salvar'}</button>
      </>}
    >
      <form id="proposal-form" onSubmit={submit}>
        <div className="field-row">
          <div className="field">
            <label>Data da proposta</label>
            <input className="input" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} required />
          </div>
          <div className="field">
            <label>Data prevista para decisão</label>
            <input className="input" type="date" value={form.decisionDate} onChange={(e) => set('decisionDate', e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Pacote apresentado</label>
          <select className="input" value={form.packageId} onChange={(e) => pickPackage(e.target.value)}>
            <option value="">Personalizado / outro</option>
            {packages.map((p) => <option key={p.id} value={p.id}>{p.name} — R$ {p.price}/mês</option>)}
          </select>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Valor (R$/mês)</label>
            <input className="input" type="number" step="0.01" value={form.value} onChange={(e) => set('value', e.target.value)} />
          </div>
          <div className="field">
            <label>Forma de pagamento</label>
            <input className="input" value={form.paymentMethod} onChange={(e) => set('paymentMethod', e.target.value)} placeholder="Cartão, boleto, PIX…" />
          </div>
        </div>
        <div className="field">
          <label>Condição especial</label>
          <input className="input" value={form.specialCondition} onChange={(e) => set('specialCondition', e.target.value)} placeholder="Ex: 10% de desconto na matrícula" />
        </div>
        <div className="field">
          <label>Status da proposta</label>
          <select className="input" value={form.status} onChange={(e) => set('status', e.target.value)}>
            {PROPOSAL_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </form>
    </Modal>
  );
}
