import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ROLE_LABELS } from '../lib/constants.js';
import { initials } from '../lib/format.js';
import { api } from '../api.js';
import GlobalSearch from './GlobalSearch.jsx';
import BrandMark from './BrandMark.jsx';
import Icon from './Icon.jsx';

const NAV = [
  { group: 'Visão geral', items: [{ to: '/', label: 'Dashboard', icon: 'bar-chart', roles: ['admin', 'manager', 'agent', 'teacher'] }] },
  {
    group: 'Vendas',
    items: [
      { to: '/leads', label: 'Leads', icon: 'users', roles: ['admin', 'manager', 'agent', 'teacher'] },
      { to: '/pipeline', label: 'Funil de Vendas', icon: 'kanban', roles: ['admin', 'manager', 'agent'] },
      { to: '/tasks', label: 'Tarefas de Hoje', icon: 'check-circle', roles: ['admin', 'manager', 'agent', 'teacher'] },
      { to: '/recovery', label: 'Recuperação', icon: 'refresh-cw', roles: ['admin', 'manager', 'agent'] },
      { to: '/lost', label: 'Leads Perdidos', icon: 'user-x', roles: ['admin', 'manager', 'agent'] },
      { to: '/campaigns', label: 'Campanhas', icon: 'send', roles: ['admin', 'manager'] },
      { to: '/segments', label: 'Segmentos', icon: 'filter', roles: ['admin', 'manager'] },
    ],
  },
  {
    group: 'Administração',
    items: [
      { to: '/reports', label: 'Relatórios', icon: 'trending-up', roles: ['admin', 'manager'] },
      { to: '/catalog', label: 'Fontes, Professores & Pacotes', icon: 'sliders', roles: ['admin', 'manager'] },
      { to: '/users', label: 'Usuários', icon: 'users', roles: ['admin'] },
    ],
  },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [overdueCount, setOverdueCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/tasks?scope=overdue').then((r) => setOverdueCount(r.tasks.length)).catch(() => {});
  }, []);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <div className={`sidebar-backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <BrandMark size={38} />
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
                    <span className="ic"><Icon name={it.icon} size={18} /></span>
                    <span className="lbl">{it.label}</span>
                    {it.to === '/tasks' && overdueCount > 0 && <span className="badge-count">{overdueCount}</span>}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-promo">
          <div className="sidebar-promo-icon"><Icon name="globe" size={22} /></div>
          <div className="sidebar-promo-title">Mais pessoas, mais histórias em inglês.</div>
          <div className="sidebar-promo-brand">UPFRONT</div>
        </div>

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
        <div className="topbar-strip">
          <button className="mobile-menu-btn" onClick={() => setOpen(true)} aria-label="Abrir menu"><Icon name="menu" size={20} /></button>
          <GlobalSearch />
          <div style={{ flex: 1 }} />
          <button className="icon-btn" onClick={() => navigate('/tasks')} aria-label="Tarefas atrasadas" style={{ position: 'relative' }}>
            <Icon name="bell" size={18} />
            {overdueCount > 0 && <span className="notif-dot">{overdueCount}</span>}
          </button>
          <div className="topbar-user hide-mobile">
            <span className="av">{initials(user.name)}</span>
            <div>
              <div className="name">{user.name}</div>
              <div className="role">{ROLE_LABELS[user.role]}</div>
            </div>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
