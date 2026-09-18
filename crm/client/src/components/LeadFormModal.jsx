import { useState } from 'react';
import Modal from './Modal.jsx';
import { useRefData } from '../context/RefDataContext.jsx';
import { ENGLISH_LEVELS, OBJECTIVES } from '../lib/constants.js';
import { api } from '../api.js';
import { useToast } from '../context/ToastContext.jsx';

const EMPTY = {
  name: '', whatsapp: '', email: '', sourceId: '', campaignOrigin: '', ownerUserId: '', teacherId: '',
  city: '', age: '', englishLevel: '', objective: '', notes: '', nextAction: 'Fazer primeiro contato',
};

export default function LeadFormModal({ lead, onClose, onSaved }) {
  const { sources, teachers, users } = useRefData();
  const { push } = useToast();
  const [form, setForm] = useState(() => (lead ? {
    name: lead.name, whatsapp: lead.whatsapp, email: lead.email, sourceId: lead.sourceId || '',
    campaignOrigin: lead.campaignOrigin || '', ownerUserId: lead.ownerUserId || '', teacherId: lead.teacherId || '',
    city: lead.city || '', age: lead.age || '', englishLevel: lead.englishLevel || '', objective: lead.objective || '',
    notes: lead.notes || '', nextAction: lead.nextAction || '',
  } : EMPTY));
  const [saving, setSaving] = useState(false);
  const agents = users.filter((u) => ['agent', 'manager', 'admin'].includes(u.role));

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) return push('Informe o nome do lead', 'error');
    setSaving(true);
    try {
      if (lead) {
        await api.put(`/leads/${lead.id}`, { ...form, age: form.age ? Number(form.age) : null });
        push('Lead atualizado', 'success');
      } else {
        await api.post('/leads', { ...form, age: form.age ? Number(form.age) : null });
        push('Lead cadastrado', 'success');
      }
      onSaved?.();
    } catch (err) {
      push(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title={lead ? 'Editar lead' : 'Novo lead'}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" form="lead-form" disabled={saving}>{saving ? 'Salvando…' : 'Salvar'}</button>
        </>
      }
    >
      <form id="lead-form" onSubmit={submit}>
        <div className="field-row">
          <div className="field">
            <label>Nome completo *</label>
            <input className="input" value={form.name} onChange={(e) => set('name', e.target.value)} required />
          </div>
          <div className="field">
            <label>WhatsApp</label>
            <input className="input" value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="+55 11 90000-0000" />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>E-mail</label>
            <input className="input" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
          </div>
          <div className="field">
            <label>Cidade</label>
            <input className="input" value={form.city} onChange={(e) => set('city', e.target.value)} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Origem</label>
            <select className="input" value={form.sourceId} onChange={(e) => set('sourceId', e.target.value)}>
              <option value="">Selecionar…</option>
              {sources.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Campanha de origem</label>
            <input className="input" value={form.campaignOrigin} onChange={(e) => set('campaignOrigin', e.target.value)} placeholder="Ex: Anúncio Instagram Setembro" />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Atendente responsável</label>
            <select className="input" value={form.ownerUserId} onChange={(e) => set('ownerUserId', e.target.value)}>
              <option value="">Eu mesmo</option>
              {agents.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Professor responsável</label>
            <select className="input" value={form.teacherId} onChange={(e) => set('teacherId', e.target.value)}>
              <option value="">Não definido</option>
              {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Idade</label>
            <input className="input" type="number" min="5" max="100" value={form.age} onChange={(e) => set('age', e.target.value)} />
          </div>
          <div className="field">
            <label>Nível de inglês</label>
            <select className="input" value={form.englishLevel} onChange={(e) => set('englishLevel', e.target.value)}>
              <option value="">Selecionar…</option>
              {ENGLISH_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <label>Objetivo</label>
          <select className="input" value={form.objective} onChange={(e) => set('objective', e.target.value)}>
            <option value="">Selecionar…</option>
            {OBJECTIVES.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Próxima ação</label>
          <input className="input" value={form.nextAction} onChange={(e) => set('nextAction', e.target.value)} />
        </div>
        <div className="field">
          <label>Observações internas</label>
          <textarea className="input" value={form.notes} onChange={(e) => set('notes', e.target.value)} />
        </div>
      </form>
    </Modal>
  );
}
