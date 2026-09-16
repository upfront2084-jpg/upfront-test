import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../api.js';

const RefDataContext = createContext(null);

export function RefDataProvider({ children }) {
  const [data, setData] = useState({ sources: [], teachers: [], users: [], packages: [], tags: [] });
  const [loaded, setLoaded] = useState(false);

  const reload = useCallback(async () => {
    const [sources, teachers, users, packages, tags] = await Promise.all([
      api.get('/sources'), api.get('/teachers'), api.get('/users'), api.get('/packages'), api.get('/tags'),
    ]);
    setData({
      sources: sources.sources, teachers: teachers.teachers, users: users.users,
      packages: packages.packages, tags: tags.tags,
    });
    setLoaded(true);
  }, []);

  useEffect(() => { reload(); }, [reload]);

  return <RefDataContext.Provider value={{ ...data, loaded, reload }}>{children}</RefDataContext.Provider>;
}

export function useRefData() {
  const ctx = useContext(RefDataContext);
  if (!ctx) throw new Error('useRefData deve ser usado dentro de RefDataProvider');
  return ctx;
}
