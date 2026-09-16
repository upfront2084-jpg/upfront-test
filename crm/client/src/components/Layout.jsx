import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ROLE_LABELS } from '../lib/constants.js';
import { initials } from '../lib/format.js';
import GlobalSearch from './GlobalSearch.jsx';

const NAV = [
  { group: 'Visão geral', items: [{ to: '/', label: 'Dashboard', icon: '📊', roles: ['admin', 'manager', 'agent', 'teacher'] }] },
  {
    group: 'Vendas',
    items: [
      { to: '/leads', label: 'Leads', icon: '🧑‍🎓', roles: ['admin', 'manager', 'agent', 'teacher'] },
      { to: '/pipeline', label: 'Funil (Kanban)', icon: '🗂️', roles: ['admin', 'manager', 'agent'] },
      { to: '/tasks', label: 'Tarefas de Hoje', icon: '✅', roles: ['admin', 'manager', 'agent', 'teacher'] },
      { to: '/recovery', label: 'Recuperação', icon: '♻️', roles: ['admin', 'manager', 'agent'] },
      { to: '/campaigns', label: 'Campanhas', icon: '📣', roles: ['admin', 'manager'] },
      { to: '/segments', label: 'Segmentos', icon: '🧩', roles: ['admin', 'manager'] },
    ],
  },
  {
    group: 'Administração',
    items: [
      { to: '/reports', label: 'Relatórios', icon: '📈', roles: ['admin', 'manager'] },
      { to: '/catalog', label: 'Fontes, Professores & Pacotes', icon: '⚙️', roles: ['admin', 'manager'] },
      { to: '/users', label: 'Usuários', icon: '👥', roles: ['admin'] },
    ],
  },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <div className={`sidebar-backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <img src="/favicon.svg" className="mark" alt="Upfront" />
          <div className="txt">
            <div>Upfront CRM</div>
            <div>Gestão de Leads</div>
          </div>
        </div>
        <nav>
          {NAV.map((g) => {
            const items = g.items.filter((it) => it.roles.includes(user.role));
            if (!items.length) return null;
            return (
              <div className="nav-group" key={g.group}>
                <div className="nav-group-title">{g.group}</div>
                {items.map((it) => (
                  <NavLink
                    key={it.to}
                    to={it.to}
                    end={it.to === '/'}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="ic">{it.icon}</span>
                    <span className="lbl">{it.label}</span>
                  </NavLink>
                ))}
              </div>
            );
          })}
        </nav>
        <div className="sidebar-foot">
          <div className="user-chip">
            <span className="av">{initials(user.name)}</span>
            <div>
              <div className="name">{user.name}</div>
              <div className="role">{ROLE_LABELS[user.role]}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Sair</button>
        </div>
      </aside>
      <main className="main">
        <div className="hstack mb12">
          <button className="mobile-menu-btn" onClick={() => setOpen(true)} aria-label="Abrir menu">☰</button>
          <div style={{ flex: 1 }} />
          <GlobalSearch />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
