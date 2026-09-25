import { useState } from 'react';
import Modal from './Modal.jsx';
import { LOST_REASONS } from '../lib/constants.js';

// Small confirmation step shown whenever a lead is moved to "Perdido" —
// asks for the reason up front so leads perdidos can actually be grouped
// by category later, instead of landing in one undifferentiated bucket.
export default function LostReasonModal({ onClose, onConfirm }) {
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);

  async function confirm() {
    if (!reason) return;
    setSaving(true);
    try {
      await onConfirm(reason);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title="Motivo da perda"
      onClose={onClose}
      footer={<>
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" disabled={!reason || saving} onClick={confirm}>
          {saving ? 'Salvando…' : 'Marcar como perdido'}
        </button>
      </>}
    >
      <div className="field">
        <label>Por que esse lead foi perdido?</label>
        <select className="input" value={reason} onChange={(e) => setReason(e.target.value)} autoFocus>
          <option value="">Selecionar…</option>
          {LOST_REASONS.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
        </select>
      </div>
      <div className="small muted">Isso ajuda a separar os leads perdidos por categoria na página "Leads Perdidos", pra facilitar o reenvio manual pelo WhatsApp.</div>
    </Modal>
  );
}
