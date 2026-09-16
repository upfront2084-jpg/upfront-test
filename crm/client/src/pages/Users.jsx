import { useState } from 'react';
import { useRefData } from '../context/RefDataContext.jsx';
import { api } from '../api.js';
import { useToast } from '../context/ToastContext.jsx';
import { ROLE_LABELS } from '../lib/constants.js';
import { initials } from '../lib/format.js';

export default function Users() {
  const { users, teachers, reload } = useRefData();
  const { push } = useToast();
  const [form, setForm] = useState({ name: '', email: '', role: 'agent', password: '' });
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/users', form);
      push('Usuário criado', 'success');
      setForm({ name: '', email: '', role: 'agent', password: '' });
      reload();
    } catch (err) {
      push(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(u) {
    await api.put(`/users/${u.id}`, { active: !u.active });
    reload();
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Usuários</h1>
          <div className="sub">Controle de acesso por perfil: Administrador, Gestor, Atendente e Professor</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="data-table">
              <thead><tr><th>Usuário</th><th>Perfil</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ cursor: 'default' }}>
                    <td>
                      <div className="name-cell">
                        <span className="avatar-sm">{initials(u.name)}</span>
                        <div><div style={{ fontWeight: 700 }}>{u.name}</div><div className="meta">{u.email}</div></div>
                      </div>
                    </td>
                    <td>{ROLE_LABELS[u.role]}</td>
                    <td><span className="badge" style={{ background: u.active ? 'var(--success-soft)' : 'var(--danger-soft)', color: u.active ? 'var(--success)' : 'var(--danger)' }}>{u.active ? 'Ativo' : 'Inativo'}</span></td>
                    <td><button className="btn btn-ghost btn-sm" onClick={() => toggleActive(u)}>{u.active ? 'Desativar' : 'Ativar'}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <form className="card" onSubmit={submit}>
          <h3 className="mb12">Novo usuário</h3>
          <div className="field"><label>Nome</label><input className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required /></div>
          <div className="field"><label>E-mail</label><input className="input" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required /></div>
          <div className="field">
            <label>Perfil de acesso</label>
            <select className="input" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
              <option value="admin">Administrador — acesso completo</option>
              <option value="manager">Gestor — leads, relatórios, campanhas, equipe</option>
              <option value="agent">Atendente — leads e tarefas atribuídos</option>
              <option value="teacher">Professor — experimentais e alunos</option>
            </select>
          </div>
          {form.role === 'teacher' && (
            <div className="field">
              <label>Vincular ao professor</label>
              <select className="input" value={form.teacherId || ''} onChange={(e) => setForm((f) => ({ ...f, teacherId: e.target.value }))}>
                <option value="">Não vincular</option>
                {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
          )}
          <div className="field"><label>Senha inicial</label><input className="input" type="text" placeholder="upfront123 (padrão)" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} /></div>
          <button className="btn btn-primary btn-sm" disabled={saving}>{saving ? 'Criando…' : 'Criar usuário'}</button>
        </form>
      </div>
    </div>
  );
}
