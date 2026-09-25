import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { RefDataProvider } from './context/RefDataContext.jsx';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Leads from './pages/Leads.jsx';
import LeadDetail from './pages/LeadDetail.jsx';
import Pipeline from './pages/Pipeline.jsx';
import Tasks from './pages/Tasks.jsx';
import Recovery from './pages/Recovery.jsx';
import LostLeads from './pages/LostLeads.jsx';
import Campaigns from './pages/Campaigns.jsx';
import CampaignDetail from './pages/CampaignDetail.jsx';
import Segments from './pages/Segments.jsx';
import Catalog from './pages/Catalog.jsx';
import Users from './pages/Users.jsx';
import Reports from './pages/Reports.jsx';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-loading">Carregando…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function RequireRole({ roles, children }) {
  const { user } = useAuth();
  if (!roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={loading ? <div className="page-loading">Carregando…</div> : user ? <Navigate to="/" replace /> : <Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <RefDataProvider>
              <Layout />
            </RefDataProvider>
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="leads" element={<Leads />} />
        <Route path="leads/:id" element={<LeadDetail />} />
        <Route path="pipeline" element={<RequireRole roles={['admin', 'manager', 'agent']}><Pipeline /></RequireRole>} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="recovery" element={<RequireRole roles={['admin', 'manager', 'agent']}><Recovery /></RequireRole>} />
        <Route path="lost" element={<RequireRole roles={['admin', 'manager', 'agent']}><LostLeads /></RequireRole>} />
        <Route path="campaigns" element={<RequireRole roles={['admin', 'manager']}><Campaigns /></RequireRole>} />
        <Route path="campaigns/:id" element={<RequireRole roles={['admin', 'manager']}><CampaignDetail /></RequireRole>} />
        <Route path="segments" element={<RequireRole roles={['admin', 'manager']}><Segments /></RequireRole>} />
        <Route path="reports" element={<RequireRole roles={['admin', 'manager']}><Reports /></RequireRole>} />
        <Route path="catalog" element={<RequireRole roles={['admin', 'manager']}><Catalog /></RequireRole>} />
        <Route path="users" element={<RequireRole roles={['admin']}><Users /></RequireRole>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
