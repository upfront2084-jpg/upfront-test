import { STAGE_MAP } from '../lib/constants.js';

export default function StageBadge({ status }) {
  const stage = STAGE_MAP[status];
  if (!stage) return <span className="badge">{status}</span>;
  return (
    <span className="badge" style={{ background: stage.color + '1a', color: stage.color }}>
      <span className="badge-dot" />
      {stage.label}
    </span>
  );
}
