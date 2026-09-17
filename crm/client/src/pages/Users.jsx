import { useState } from 'react';
import { useRefData } from '../context/RefDataContext.jsx';
import { api } from '../api.js';
import { useToast } from '../context/ToastContext.jsx';
import { ROLE_LABELS } from '../lib/constants.js';
import { initials } from '../lib/format.js';
import Modal from '../components/Modal.jsx';

const EMPTY_FORM = { name: '', username: '', email: '', role: 'agent', password: '', teacherId: '' };

export default function Users() {
  const { users, teachers, reload } = useRefData();
  const { push } = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [resetTarget, setResetTarget] = useState(null); // user being reset
  const [newPassword, setNewPassword] = useState('');
  const [resetting, setResetting] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/users', form);
      push(`Usuário "${form.username}" criado`, 'success');
      setForm(EMPTY_FORM);
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

  async function deleteUser(u) {
    if (!window.confirm(`Excluir o usuário "${u.name}" (${u.username})? Isso só é possível se ele não tiver histórico no sistema.`)) return;
    try {
      await api.del(`/users/${u.id}`);
      push(`Usuário "${u.username}" excluído`, 'success');
      reload();
    } catch (err) {
      push(err.message, 'error');
    }
  }

  async function submitReset(e) {
    e.preventDefault();
    setResetting(true);
    try {
      await api.put(`/users/${resetTarget.id}/password`, { password: newPassword });
      push(`Senha de "${resetTarget.username}" atualizada`, 'success');
      setResetTarget(null);
      setNewPassword('');
    } catch (err) {
      push(err.message, 'error');
    } finally {
      setResetting(false);
    }
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Usuários</h1>
          <div className="sub">Cadastre um usuário e senha para cada pessoa da equipe — Administrador, Gestor, Atendente ou Professor</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="data-table">
              <thead><tr><th>Usuário</th><th>Login</th><th>Perfil</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ cursor: 'default' }}>
                    <td>
                      <div className="name-cell">
                        <span className="avatar-sm">{initials(u.name)}</span>
                        <div style={{ fontWeight: 700 }}>{u.name}</div>
                      </div>
                    </td>
                    <td><code>{u.username}</code></td>
                    <td>{ROLE_LABELS[u.role]}</td>
                    <td><span className="badge" style={{ background: u.active ? 'var(--success-soft)' : 'var(--danger-soft)', color: u.active ? 'var(--success)' : 'var(--danger)' }}>{u.active ? 'Ativo' : 'Inativo'}</span></td>
                    <td>
                      <div className="hstack">
                        <button className="btn btn-ghost btn-sm" onClick={() => { setResetTarget(u); setNewPassword(''); }}>Redefinir senha</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => toggleActive(u)}>{u.active ? 'Desativar' : 'Ativar'}</button>
                        <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => deleteUser(u)}>Excluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <form className="card" onSubmit={submit}>
          <h3 className="mb12">Novo usuário</h3>
          <div className="field"><label>Nome</label><input className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required /></div>
          <div className="field">
            <label>Usuário (login)</label>
            <input
              className="input"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value.toLowerCase() }))}
              placeholder="ex: maria.silva"
              autoCapitalize="none"
              required
            />
          </div>
          <div className="field"><label>E-mail (opcional)</label><input className="input" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} /></div>
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
          <div className="field">
            <label>Senha</label>
            <input className="input" type="text" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} placeholder="Defina a senha dessa pessoa" required />
          </div>
          <button className="btn btn-primary btn-sm" disabled={saving}>{saving ? 'Criando…' : 'Criar usuário'}</button>
        </form>
      </div>

      {resetTarget && (
        <Modal
          title={`Redefinir senha de ${resetTarget.name}`}
          onClose={() => setResetTarget(null)}
          footer={<>
            <button className="btn btn-secondary" onClick={() => setResetTarget(null)}>Cancelar</button>
            <button className="btn btn-primary" form="reset-pw-form" disabled={resetting}>{resetting ? 'Salvando…' : 'Salvar nova senha'}</button>
          </>}
        >
          <form id="reset-pw-form" onSubmit={submitReset}>
            <div className="field">
              <label>Usuário (login)</label>
              <input className="input" value={resetTarget.username} disabled />
            </div>
            <div className="field">
              <label>Nova senha</label>
              <input className="input" type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Mínimo 4 caracteres" required autoFocus />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
