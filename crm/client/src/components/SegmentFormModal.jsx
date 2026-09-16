import { useState } from 'react';
import Modal from './Modal.jsx';
import { OBJECTIVES, ENGLISH_LEVELS } from '../lib/constants.js';
import { useRefData } from '../context/RefDataContext.jsx';
import { api } from '../api.js';
import { useToast } from '../context/ToastContext.jsx';

export default function SegmentFormModal({ onClose, onSaved }) {
  const { sources } = useRefData();
  const { push } = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [objective, setObjective] = useState('');
  const [englishLevel, setEnglishLevel] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [daysSinceContactMin, setDaysSinceContactMin] = useState('');
  const [hadTrial, setHadTrial] = useState(false);
  const [notEnrolled, setNotEnrolled] = useState(false);
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return push('Dê um nome ao segmento', 'error');
    const filters = {};
    if (objective) filters.objective = objective;
    if (englishLevel) filters.englishLevel = englishLevel;
    if (sourceName) filters.sourceName = sourceName;
    if (daysSinceContactMin) filters.daysSinceContactMin = Number(daysSinceContactMin);
    if (hadTrial) filters.hadTrial = true;
    if (notEnrolled) filters.notEnrolled = true;
    setSaving(true);
    try {
      await api.post('/segments', { name, description, filters });
      push('Segmento criado', 'success');
      onSaved?.();
    } catch (err) {
      push(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title="Novo segmento"
      onClose={onClose}
      footer={<>
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" form="segment-form" disabled={saving}>{saving ? 'Salvando…' : 'Criar segmento'}</button>
      </>}
    >
      <form id="segment-form" onSubmit={submit}>
        <div className="field">
          <label>Nome do segmento</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Interessados em viagem" required />
        </div>
        <div className="field">
          <label>Descrição</label>
          <input className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="field-row">
          <div className="field">
            <label>Objetivo</label>
            <select className="input" value={objective} onChange={(e) => setObjective(e.target.value)}>
              <option value="">Qualquer</option>
              {OBJECTIVES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Nível de inglês</label>
            <select className="input" value={englishLevel} onChange={(e) => setEnglishLevel(e.target.value)}>
              <option value="">Qualquer</option>
              {ENGLISH_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Origem</label>
            <select className="input" value={sourceName} onChange={(e) => setSourceName(e.target.value)}>
              <option value="">Qualquer</option>
              {sources.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Dias sem contato (mínimo)</label>
            <input className="input" type="number" min="0" value={daysSinceContactMin} onChange={(e) => setDaysSinceContactMin(e.target.value)} />
          </div>
        </div>
        <div className="checkbox-row mb12">
          <input type="checkbox" checked={hadTrial} onChange={(e) => setHadTrial(e.target.checked)} id="seg-trial" />
          <label htmlFor="seg-trial">Fez aula experimental</label>
        </div>
        <div className="checkbox-row">
          <input type="checkbox" checked={notEnrolled} onChange={(e) => setNotEnrolled(e.target.checked)} id="seg-not-enrolled" />
          <label htmlFor="seg-not-enrolled">Ainda não matriculado</label>
        </div>
      </form>
    </Modal>
  );
}
