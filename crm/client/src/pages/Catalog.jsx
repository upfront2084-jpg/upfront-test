import { useState } from 'react';
import { useRefData } from '../context/RefDataContext.jsx';
import { api } from '../api.js';
import { useToast } from '../context/ToastContext.jsx';
import { fmtMoney } from '../lib/format.js';

const TABS = ['Fontes de leads', 'Professores', 'Pacotes'];

export default function Catalog() {
  const { sources, teachers, packages, reload } = useRefData();
  const { push } = useToast();
  const [tab, setTab] = useState(TABS[0]);
  const [newSource, setNewSource] = useState({ name: '', icon: '✨' });
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', levels: '' });
  const [newPackage, setNewPackage] = useState({ name: '', description: '', hoursPerWeek: '', durationMonths: '', price: '' });

  async function addSource(e) {
    e.preventDefault();
    if (!newSource.name.trim()) return;
    await api.post('/sources', newSource);
    setNewSource({ name: '', icon: '✨' });
    push('Fonte adicionada', 'success');
    reload();
  }
  async function removeSource(id) {
    await api.del(`/sources/${id}`);
    reload();
  }
  async function addTeacher(e) {
    e.preventDefault();
    if (!newTeacher.name.trim()) return;
    await api.post('/teachers', newTeacher);
    setNewTeacher({ name: '', email: '', levels: '' });
    push('Professor adicionado', 'success');
    reload();
  }
  async function addPackage(e) {
    e.preventDefault();
    if (!newPackage.name.trim()) return;
    await api.post('/packages', { ...newPackage, hoursPerWeek: Number(newPackage.hoursPerWeek) || null, durationMonths: Number(newPackage.durationMonths) || null, price: Number(newPackage.price) || null });
    setNewPackage({ name: '', description: '', hoursPerWeek: '', durationMonths: '', price: '' });
    push('Pacote adicionado', 'success');
    reload();
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Fontes, Professores & Pacotes</h1>
          <div className="sub">Cadastros de apoio usados em todo o CRM</div>
        </div>
      </div>

      <div className="tabs">
        {TABS.map((t) => <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>)}
      </div>

      {tab === 'Fontes de leads' && (
        <div className="grid-2">
          <div className="card">
            <h3 className="mb12">Fontes cadastradas</h3>
            <div className="stack">
              {sources.map((s) => (
                <div key={s.id} className="hstack" style={{ justifyContent: 'space-between' }}>
                  <span>{s.icon} {s.name}</span>
                  <button className="btn btn-ghost btn-sm" onClick={() => removeSource(s.id)}>Remover</button>
                </div>
              ))}
            </div>
          </div>
          <form className="card" onSubmit={addSource}>
            <h3 className="mb12">Nova fonte</h3>
            <div className="field-row">
              <div className="field"><label>Emoji</label><input className="input" value={newSource.icon} onChange={(e) => setNewSource((f) => ({ ...f, icon: e.target.value }))} /></div>
              <div className="field"><label>Nome</label><input className="input" value={newSource.name} onChange={(e) => setNewSource((f) => ({ ...f, name: e.target.value }))} /></div>
            </div>
            <button className="btn btn-primary btn-sm">Adicionar</button>
          </form>
        </div>
      )}

      {tab === 'Professores' && (
        <div className="grid-2">
          <div className="card">
            <h3 className="mb12">Professores cadastrados</h3>
            <div className="stack">
              {teachers.map((t) => (
                <div key={t.id}>
                  <div style={{ fontWeight: 700 }}>{t.name}</div>
                  <div className="small muted">{t.email} · {t.levels}</div>
                </div>
              ))}
            </div>
          </div>
          <form className="card" onSubmit={addTeacher}>
            <h3 className="mb12">Novo professor</h3>
            <div className="field"><label>Nome</label><input className="input" value={newTeacher.name} onChange={(e) => setNewTeacher((f) => ({ ...f, name: e.target.value }))} /></div>
            <div className="field"><label>E-mail</label><input className="input" value={newTeacher.email} onChange={(e) => setNewTeacher((f) => ({ ...f, email: e.target.value }))} /></div>
            <div className="field"><label>Níveis que leciona</label><input className="input" value={newTeacher.levels} onChange={(e) => setNewTeacher((f) => ({ ...f, levels: e.target.value }))} /></div>
            <button className="btn btn-primary btn-sm">Adicionar</button>
          </form>
        </div>
      )}

      {tab === 'Pacotes' && (
        <div className="grid-2">
          <div className="card">
            <h3 className="mb12">Pacotes cadastrados</h3>
            <div className="stack">
              {packages.map((p) => (
                <div key={p.id}>
                  <div style={{ fontWeight: 700 }}>{p.name} — {fmtMoney(p.price)}/mês</div>
                  <div className="small muted">{p.description} · {p.hoursPerWeek}x/semana · {p.durationMonths} meses</div>
                </div>
              ))}
            </div>
          </div>
          <form className="card" onSubmit={addPackage}>
            <h3 className="mb12">Novo pacote</h3>
            <div className="field"><label>Nome</label><input className="input" value={newPackage.name} onChange={(e) => setNewPackage((f) => ({ ...f, name: e.target.value }))} /></div>
            <div className="field"><label>Descrição</label><input className="input" value={newPackage.description} onChange={(e) => setNewPackage((f) => ({ ...f, description: e.target.value }))} /></div>
            <div className="field-row">
              <div className="field"><label>Horas/semana</label><input className="input" type="number" value={newPackage.hoursPerWeek} onChange={(e) => setNewPackage((f) => ({ ...f, hoursPerWeek: e.target.value }))} /></div>
              <div className="field"><label>Duração (meses)</label><input className="input" type="number" value={newPackage.durationMonths} onChange={(e) => setNewPackage((f) => ({ ...f, durationMonths: e.target.value }))} /></div>
            </div>
            <div className="field"><label>Valor mensal (R$)</label><input className="input" type="number" step="0.01" value={newPackage.price} onChange={(e) => setNewPackage((f) => ({ ...f, price: e.target.value }))} /></div>
            <button className="btn btn-primary btn-sm">Adicionar</button>
          </form>
        </div>
      )}
    </div>
  );
}
