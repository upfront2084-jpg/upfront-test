import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import BrandMark from '../components/BrandMark.jsx';

export default function Login() {
  const { login, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    const ok = await login(username, password);
    setBusy(false);
    if (ok) navigate('/');
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="mark"><BrandMark size={46} /></div>
        <h1>Entrar no Upfront CRM</h1>
        <p className="sub">CRM e gestão de leads da escola de inglês</p>
        <form onSubmit={submit}>
          <div className="field">
            <label>Usuário</label>
            <input
              className="input"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="seu.usuario"
            />
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
        <p className="login-hint">Esqueceu sua senha? Fale com o administrador do sistema.</p>
      </div>
    </div>
  );
}
