const STATUS_COLORS = {
  active: 'green',
  dormant: 'yellow',
  done: 'blue',
  dead: 'grey',
};

function formatYears({ started, ended, status }) {
  const start_year = started.slice(0, 4);
  const end_year = ended?.slice(0, 4);

  if (end_year && end_year !== start_year) {
    return `${start_year} – ${end_year}`;
  }

  return !end_year && status === 'active' ? `${start_year} – now` : start_year;
}

function youtubeThumbnail(video_id) {
  return `https://i.ytimg.com/vi/${video_id}/hqdefault.jpg`;
}

function StatusLabel({ status }) {
  return <span className={`ui tiny basic ${STATUS_COLORS[status]} label`}>{status}</span>;
}

function ProjectMeta({ project }) {
  return (
    <div className="project-meta">
      <span>{formatYears(project)}</span>
      <StatusLabel status={project.status} />
    </div>
  );
}

/** All projects on /projects/, grouped by kind. */
export function ProjectCatalog({ groups }) {
  return groups.map((group) => (
    <section className="project-group" key={group.id}>
      <h2>{group.label}</h2>
      <div className="ui divided items">
        {group.projects.map((project) => (
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
    </section>
  ));
}

/** Title block at the top of a project page. */
export function ProjectHeader({ project }) {
  return (
    <header className="project-header">
      <p className="project-breadcrumb"><a href="/projects/">Projects</a></p>
      <h1>{project.title}</h1>
      <p className="project-tagline">{project.tagline}</p>
      <ProjectMeta project={project} />
    </header>
  );
}

/** Links, videos and related posts below a project's story. */
export function ProjectDetails({ project, posts }) {
  return (
    <>
      {project.links.length > 0 && (
        <section>
          <h2>Links</h2>
          <ul>
            {project.links.map((link) => (
              <li key={link.url}><a href={link.url}>{link.label}</a></li>
            ))}
          </ul>
        </section>
      )}

      {project.videos.length > 0 && (
        <section>
          <h2>Videos</h2>
          <div className="ui three stackable cards project-videos">
            {project.videos.map((video_id) => (
              <a className="card" href={`https://www.youtube.com/watch?v=${video_id}`} key={video_id}>
                <div className="image">
                  <img alt="YouTube video" loading="lazy" src={youtubeThumbnail(video_id)} />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section>
          <h2>Writing about this</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.url}><a href={post.url}>{post.title}</a></li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

/** "Part of" note shown on a blog post that declares `projects:` in its frontmatter. */
export function PartOfProjects({ projects }) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <p className="project-part-of">
      Part of{' '}
      {projects.map((project, index) => (
        <span key={project.id}>
          {index > 0 && ', '}
          <a href={project.url}>{project.title}</a>
        </span>
      ))}
    </p>
  );
}
