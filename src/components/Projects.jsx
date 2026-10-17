import { ProjectMeta, youtubeThumbnail } from './project-meta';

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
