import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../api.js';

const RefDataContext = createContext(null);
const RETRY_DELAY_MS = 1500;

export function RefDataProvider({ children }) {
  const [data, setData] = useState({ sources: [], teachers: [], users: [], packages: [], tags: [] });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    try {
      const [sources, teachers, users, packages, tags] = await Promise.all([
        api.get('/sources'), api.get('/teachers'), api.get('/users'), api.get('/packages'), api.get('/tags'),
      ]);
      setData({
        sources: sources.sources, teachers: teachers.teachers, users: users.users,
        packages: packages.packages, tags: tags.tags,
      });
      setLoaded(true);
      setError(null);
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    let attempt = 0;
    function attemptLoad() {
      reload().catch(() => {
        // A transient failure (e.g. the session cookie not being attached to
        // the very first request yet) shouldn't leave every page permanently
        // empty — retry a couple of times before giving up.
        attempt += 1;
        if (!cancelled && attempt <= 3) {
          setTimeout(attemptLoad, RETRY_DELAY_MS * attempt);
        }
      });
    }
    attemptLoad();
    return () => { cancelled = true; };
  }, [reload]);

  return <RefDataContext.Provider value={{ ...data, loaded, error, reload }}>{children}</RefDataContext.Provider>;
}

export function useRefData() {
  const ctx = useContext(RefDataContext);
  if (!ctx) throw new Error('useRefData deve ser usado dentro de RefDataProvider');
  return ctx;
}
