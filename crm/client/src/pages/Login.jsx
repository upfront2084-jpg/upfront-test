import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const DEMO_USERS = [
  { email: 'admin@upfrontschool.com', name: 'Ana Beatriz Souza', role: 'Administrador' },
  { email: 'gestor@upfrontschool.com', name: 'Carlos Eduardo Lima', role: 'Gestor' },
  { email: 'fernanda@upfrontschool.com', name: 'Fernanda Rocha', role: 'Atendente' },
  { email: 'ricardo.nunes@upfrontschool.com', name: 'Prof. Ricardo Nunes', role: 'Professor' },
];

export default function Login() {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('upfront123');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    const ok = await login(email, password);
    setBusy(false);
    if (ok) navigate('/');
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <img src="/favicon.svg" className="mark" alt="Upfront" />
        <h1>Entrar no Upfront CRM</h1>
        <p className="sub">CRM e gestão de leads da escola de inglês</p>
        <form onSubmit={submit}>
          <div className="field">
            <label>E-mail</label>
            <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@upfrontschool.com" />
          </div>
          <div className="field">
            <label>Senha</label>
            <input className="input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={busy}>
            {busy ? 'Entrando…' : 'Entrar'}
          </button>
          {error && <div className="login-err">{error}</div>}
        </form>
        <div className="demo-users">
          <div className="lbl">Acesso de demonstração (senha: upfront123)</div>
          {DEMO_USERS.map((u) => (
            <button
              key={u.email}
              type="button"
              className="demo-user-btn"
              onClick={() => {
                setEmail(u.email);
                setPassword('upfront123');
              }}
            >
              <span>{u.name}</span>
              <span className="role-tag">{u.role}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
