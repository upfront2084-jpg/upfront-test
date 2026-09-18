import { useState } from 'react';
import { useRefData } from '../context/RefDataContext.jsx';
import { api } from '../api.js';
import { useToast } from '../context/ToastContext.jsx';
import { fmtMoney } from '../lib/format.js';
import { useBulkSelect } from '../hooks/useBulkSelect.js';
import SourceIcon from '../components/SourceIcon.jsx';

const TABS = ['Fontes de leads', 'Professores', 'Pacotes'];

function BulkBar({ items, selected, toggleAll, clear, count, onDelete, deleting, label }) {
  if (items.length === 0) return null;
  return (
    <div className="hstack mb12" style={{ justifyContent: 'space-between' }}>
      <label className="hstack small" style={{ cursor: 'pointer' }}>
        <input type="checkbox" checked={items.length > 0 && items.every((i) => selected.has(i.id))} onChange={() => toggleAll(items.map((i) => i.id))} />
        Selecionar todos
      </label>
      {count > 0 && (
        <div className="hstack">
          <span className="small muted">{count} selecionado(s)</span>
          <button className="btn btn-ghost btn-sm" onClick={clear}>Limpar</button>
          <button className="btn btn-primary btn-sm" style={{ background: 'var(--danger)', borderColor: 'var(--danger)' }} disabled={deleting} onClick={onDelete}>
            {deleting ? 'Excluindo…' : label}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Catalog() {
  const { sources, teachers, packages, reload } = useRefData();
  const { push } = useToast();
  const [tab, setTab] = useState(TABS[0]);
  const [newSource, setNewSource] = useState({ name: '' });
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', levels: '' });
  const [newPackage, setNewPackage] = useState({ name: '', description: '', hoursPerWeek: '', durationMonths: '', price: '' });
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const srcSel = useBulkSelect();
  const tchSel = useBulkSelect();
  const pkgSel = useBulkSelect();

  async function addSource(e) {
    e.preventDefault();
    if (!newSource.name.trim()) return;
    try {
      await api.post('/sources', newSource);
      setNewSource({ name: '' });
      push('Fonte adicionada', 'success');
      reload();
    } catch (err) {
      push(err.message, 'error');
    }
  }
  async function removeSource(id) {
    if (!confirm('Remover esta fonte? Leads que usam ela ficam sem origem definida, mas não são apagados.')) return;
    try {
      await api.del(`/sources/${id}`);
      push('Fonte removida', 'success');
      reload();
    } catch (err) {
      push(err.message, 'error');
    }
  }
  async function bulkDeleteSources() {
    if (!confirm(`Remover ${srcSel.selected.size} fonte(s) selecionada(s)? Leads que usam elas ficam sem origem definida.`)) return;
    setBulkDeleting(true);
    try {
      const { count } = await api.post('/sources/bulk-delete', { ids: [...srcSel.selected] });
      push(`${count} fonte(s) removida(s)`, 'success');
      srcSel.clear();
      reload();
    } catch (err) {
      push(err.message, 'error');
    } finally {
      setBulkDeleting(false);
    }
  }

  async function addTeacher(e) {
    e.preventDefault();
    if (!newTeacher.name.trim()) return;
    try {
      await api.post('/teachers', newTeacher);
      setNewTeacher({ name: '', email: '', levels: '' });
      push('Professor adicionado', 'success');
      reload();
    } catch (err) {
      push(err.message, 'error');
    }
  }
  async function removeTeacher(id) {
    if (!confirm('Remover este professor? Leads, experimentais e matrículas vinculados ficam sem professor definido.')) return;
    try {
      await api.del(`/teachers/${id}`);
      push('Professor removido', 'success');
      reload();
    } catch (err) {
      push(err.message, 'error');
    }
  }
  async function bulkDeleteTeachers() {
    if (!confirm(`Remover ${tchSel.selected.size} professor(es) selecionado(s)?`)) return;
    setBulkDeleting(true);
    try {
      const { count } = await api.post('/teachers/bulk-delete', { ids: [...tchSel.selected] });
      push(`${count} professor(es) removido(s)`, 'success');
      tchSel.clear();
      reload();
    } catch (err) {
      push(err.message, 'error');
    } finally {
      setBulkDeleting(false);
    }
  }

  async function addPackage(e) {
    e.preventDefault();
    if (!newPackage.name.trim()) return;
    try {
      await api.post('/packages', { ...newPackage, hoursPerWeek: Number(newPackage.hoursPerWeek) || null, durationMonths: Number(newPackage.durationMonths) || null, price: Number(newPackage.price) || null });
      setNewPackage({ name: '', description: '', hoursPerWeek: '', durationMonths: '', price: '' });
      push('Pacote adicionado', 'success');
      reload();
    } catch (err) {
      push(err.message, 'error');
    }
  }
  async function removePackage(id) {
    if (!confirm('Remover este pacote? Propostas e matrículas vinculadas ficam sem pacote definido.')) return;
    try {
      await api.del(`/packages/${id}`);
      push('Pacote removido', 'success');
      reload();
    } catch (err) {
      push(err.message, 'error');
    }
  }
  async function bulkDeletePackages() {
    if (!confirm(`Remover ${pkgSel.selected.size} pacote(s) selecionado(s)?`)) return;
    setBulkDeleting(true);
    try {
      const { count } = await api.post('/packages/bulk-delete', { ids: [...pkgSel.selected] });
      push(`${count} pacote(s) removido(s)`, 'success');
      pkgSel.clear();
      reload();
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
            <BulkBar items={sources} selected={srcSel.selected} toggleAll={srcSel.toggleAll} clear={srcSel.clear} count={srcSel.selected.size} onDelete={bulkDeleteSources} deleting={bulkDeleting} label="Remover selecionadas" />
            <div className="stack">
              {sources.map((s) => (
                <div key={s.id} className="hstack" style={{ justifyContent: 'space-between' }}>
                  <label className="hstack" style={{ cursor: 'pointer' }}>
                    <input type="checkbox" checked={srcSel.selected.has(s.id)} onChange={() => srcSel.toggle(s.id)} />
                    <span className="hstack"><SourceIcon name={s.name} size={15} /> {s.name}</span>
                  </label>
                  <button className="btn btn-ghost btn-sm" onClick={() => removeSource(s.id)}>Remover</button>
                </div>
              ))}
            </div>
          </div>
          <form className="card" onSubmit={addSource}>
            <h3 className="mb12">Nova fonte</h3>
            <div className="field"><label>Nome</label><input className="input" value={newSource.name} onChange={(e) => setNewSource((f) => ({ ...f, name: e.target.value }))} /></div>
            <button className="btn btn-primary btn-sm">Adicionar</button>
          </form>
        </div>
      )}

      {tab === 'Professores' && (
        <div className="grid-2">
          <div className="card">
            <h3 className="mb12">Professores cadastrados</h3>
            <BulkBar items={teachers} selected={tchSel.selected} toggleAll={tchSel.toggleAll} clear={tchSel.clear} count={tchSel.selected.size} onDelete={bulkDeleteTeachers} deleting={bulkDeleting} label="Remover selecionados" />
            <div className="stack">
              {teachers.map((t) => (
                <div key={t.id} className="hstack" style={{ justifyContent: 'space-between' }}>
                  <label className="hstack" style={{ cursor: 'pointer' }}>
                    <input type="checkbox" checked={tchSel.selected.has(t.id)} onChange={() => tchSel.toggle(t.id)} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{t.name}</div>
                      <div className="small muted">{t.email} · {t.levels}</div>
                    </div>
                  </label>
                  <button className="btn btn-ghost btn-sm" onClick={() => removeTeacher(t.id)}>Remover</button>
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
            <BulkBar items={packages} selected={pkgSel.selected} toggleAll={pkgSel.toggleAll} clear={pkgSel.clear} count={pkgSel.selected.size} onDelete={bulkDeletePackages} deleting={bulkDeleting} label="Remover selecionados" />
            <div className="stack">
              {packages.map((p) => (
                <div key={p.id} className="hstack" style={{ justifyContent: 'space-between' }}>
                  <label className="hstack" style={{ cursor: 'pointer' }}>
                    <input type="checkbox" checked={pkgSel.selected.has(p.id)} onChange={() => pkgSel.toggle(p.id)} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{p.name} — {fmtMoney(p.price)}/mês</div>
                      <div className="small muted">{p.description} · {p.hoursPerWeek}x/semana · {p.durationMonths} meses</div>
                    </div>
                  </label>
                  <button className="btn btn-ghost btn-sm" onClick={() => removePackage(p.id)}>Remover</button>
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
