// Shared by the server-rendered project pages and the client-side catalog.

import { PROJECT_KINDS } from '@/lib/project-taxonomy';

const STATUS_COLORS = {
  active: 'green',
  dormant: 'yellow',
  done: 'blue',
  dead: 'grey',
};

export function formatYears({ started, ended, status }) {
  const start_year = started.slice(0, 4);
  const end_year = ended?.slice(0, 4);

  if (end_year && end_year !== start_year) {
    return `${start_year} – ${end_year}`;
  }

  return !end_year && status === 'active' ? `${start_year} – now` : start_year;
}

export function youtubeThumbnail(video_id) {
  return `https://i.ytimg.com/vi/${video_id}/hqdefault.jpg`;
}

export function StatusLabel({ status }) {
  return <span className={`ui tiny basic ${STATUS_COLORS[status]} label`}>{status}</span>;
}

export function KindLabel({ kind }) {
  const tag = PROJECT_KINDS.find((option) => option.id === kind)?.tag || kind;
  return <span className="ui tiny basic label">{tag}</span>;
}

export function ProjectMeta({ project }) {
  return (
    <div className="project-meta">
      <span>{formatYears(project)}</span>
      <KindLabel kind={project.kind} />
      <StatusLabel status={project.status} />
    </div>
  );
}
