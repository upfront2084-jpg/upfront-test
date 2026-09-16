import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { initials } from '../lib/format.js';

export default function GlobalSearch() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const boxRef = useRef(null);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      try {
        const { leads } = await api.get(`/search?q=${encodeURIComponent(q)}`);
        setResults(leads);
        setOpen(true);
      } catch {
        setResults([]);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    function onClick(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="global-search" ref={boxRef}>
      <input
        className="input"
        placeholder="Buscar por nome, WhatsApp, e-mail ou ID…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => results.length && setOpen(true)}
      />
      {open && results.length > 0 && (
        <div className="search-results">
          {results.map((l) => (
            <div
              key={l.id}
              className="search-result-item"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setOpen(false);
                setQ('');
                navigate(`/leads/${l.id}`);
              }}
            >
              <span className="avatar-sm">{initials(l.name)}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{l.name}</div>
                <div className="muted small">{l.whatsapp || l.email}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {open && q.trim() && results.length === 0 && (
        <div className="search-results">
          <div className="search-result-item muted small">Nenhum lead encontrado</div>
        </div>
      )}
    </div>
  );
}
