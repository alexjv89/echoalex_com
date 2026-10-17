'use client';

import { useState } from 'react';
import { ProjectMeta, youtubeThumbnail } from './project-meta';

const ALL = 'all';

function FilterButtons({ label, options, value, onChange }) {
  return (
    <div className="project-filter">
      <span className="project-filter-label">{label}</span>
      <div className="ui mini basic buttons">
        {options.map((option) => (
          <button
            aria-pressed={value === option.id}
            className={`ui button ${value === option.id ? 'active' : ''}`}
            key={option.id}
            onClick={() => onChange(option.id)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectItems({ projects }) {
  return (
    <div className="ui divided items">
      {projects.map((project) => (
        <div className="item" key={project.id}>
          {project.videos[0] && (
            <a className="ui small image" href={project.url}>
              <img alt="" loading="lazy" src={youtubeThumbnail(project.videos[0])} />
            </a>
          )}
          <div className="content">
            <a className="header" href={project.url}>{project.title}</a>
            <div className="description">{project.tagline}</div>
            <div className="extra">
              <ProjectMeta project={project} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** All projects on /projects/, newest first, with status and kind filters. */
export default function ProjectCatalog({ projects, kinds, statuses }) {
  const [status, setStatus] = useState(ALL);
  const [kind, setKind] = useState(ALL);

  const visible = projects.filter(
    (project) => (status === ALL || project.status === status) && (kind === ALL || project.kind === kind),
  );
  const present_kinds = kinds.filter((option) => projects.some((project) => project.kind === option.id));

  return (
    <section className="project-catalog">
      <div className="project-filters">
        <FilterButtons
          label="Status"
          onChange={setStatus}
          options={[{ id: ALL, label: 'All' }, ...statuses.map((id) => ({ id, label: id }))]}
          value={status}
        />
        <FilterButtons
          label="Type"
          onChange={setKind}
          options={[{ id: ALL, label: 'All' }, ...present_kinds]}
          value={kind}
        />
      </div>

      <p className="project-count">
        {visible.length} {visible.length === 1 ? 'project' : 'projects'}
      </p>

      <ProjectItems projects={visible} />
    </section>
  );
}
