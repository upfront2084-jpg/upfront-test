import { useEffect, useState } from 'react';
import Modal from './Modal.jsx';
import { useRefData } from '../context/RefDataContext.jsx';
import { CAMPAIGN_CHANNELS } from '../lib/constants.js';
import { api } from '../api.js';
import { useToast } from '../context/ToastContext.jsx';
import { todayISO } from '../lib/format.js';

// Creates a campaign either from an explicit list of lead IDs (Recovery page
// multi-select) or from a saved filter object (Segments page). Always shows
// how many contacts will be reached before sending, and always excludes
// leads who opted out.
export default function CampaignCreateModal({ leadIds, filters, targetDescription, onClose, onSaved }) {
  const { users } = useRefData();
  const { push } = useToast();
  const [form, setForm] = useState({
    name: '', targetDescription: targetDescription || '', date: todayISO(), message: '', channel: 'WhatsApp', responsibleUserId: '',
  });
  const [reach, setReach] = useState(leadIds ? leadIds.length : null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!leadIds && filters) {
      api.post('/campaigns/preview', { filters }).then((r) => setReach(r.total));
    }
  }, [filters, leadIds]);

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) return push('Dê um nome para a campanha', 'error');
    setSaving(true);
    try {
      await api.post('/campaigns', { ...form, leadIds, filters });
      push('Campanha criada', 'success');
      onSaved?.();
    } catch (err) {
      push(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title="Criar campanha de recuperação"
      onClose={onClose}
      footer={<>
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" form="campaign-form" disabled={saving || reach === 0}>{saving ? 'Criando…' : 'Criar e enviar'}</button>
      </>}
    >
      <div className="card mb12" style={{ background: 'var(--accent-soft)', border: 'none' }}>
        <div style={{ fontWeight: 800, fontSize: 20, color: 'var(--accent-dark)' }}>{reach === null ? '…' : reach}</div>
        <div className="small">contatos serão atingidos por esta campanha (opt-out já excluídos)</div>
      </div>
      <form id="campaign-form" onSubmit={submit}>
        <div className="field">
          <label>Nome da campanha</label>
          <input className="input" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ex: Campanha Recuperação Setembro" required />
        </div>
        <div className="field">
          <label>Público-alvo</label>
          <input className="input" value={form.targetDescription} onChange={(e) => set('targetDescription', e.target.value)} />
        </div>
        <div className="field-row">
          <div className="field">
            <label>Data de envio</label>
            <input className="input" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
          </div>
          <div className="field">
            <label>Canal</label>
            <select className="input" value={form.channel} onChange={(e) => set('channel', e.target.value)}>
              {CAMPAIGN_CHANNELS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <label>Responsável</label>
          <select className="input" value={form.responsibleUserId} onChange={(e) => set('responsibleUserId', e.target.value)}>
            <option value="">Eu mesmo</option>
            {users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Mensagem</label>
          <textarea className="input" value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Use {{nome}} para personalizar" />
        </div>
      </form>
    </Modal>
  );
}
