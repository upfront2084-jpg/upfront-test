import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { fmtDate } from '../lib/format.js';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/campaigns').then((r) => { setCampaigns(r.campaigns); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Campanhas</h1>
          <div className="sub">Campanhas de recuperação enviadas para leads segmentados. Crie novas a partir da tela de Recuperação ou Segmentos.</div>
        </div>
      </div>

      {loading ? <div className="page-loading">Carregando campanhas…</div> : (
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr><th>Campanha</th><th>Canal</th><th>Data</th><th>Responsável</th><th>Contatos</th><th>Responderam</th><th>Agendaram</th><th>Matricularam</th></tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} onClick={() => navigate(`/campaigns/${c.id}`)}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{c.name}</div>
                      <div className="meta small muted">{c.targetDescription}</div>
                    </td>
                    <td>{c.channel}</td>
                    <td>{fmtDate(c.date)}</td>
                    <td>{c.responsibleName || '—'}</td>
                    <td>{c.recipientCount}</td>
                    <td>{c.respondedCount}</td>
                    <td>{c.scheduledCount}</td>
                    <td>{c.enrolledCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {campaigns.length === 0 && <div className="empty-state"><div className="big">📣</div>Nenhuma campanha criada ainda.</div>}
        </div>
      )}
    </div>
  );
}
