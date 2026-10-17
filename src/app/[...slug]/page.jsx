import { notFound } from 'next/navigation';
import MarkdownPage from '@/components/MarkdownPage';
import ProjectCatalog from '@/components/ProjectCatalog';
import { PartOfProjects, ProjectDetails, ProjectHeader } from '@/components/Projects';
import {
  PROJECT_KINDS,
  PROJECT_STATUSES,
  getPageBySlug,
  getPostsForProject,
  getProjectById,
  getProjects,
  getStaticPageParams,
  isBlogPost,
  isProjectPage,
} from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticPageParams();
}

// Only what the client-side catalog needs, so page bodies don't ship to the browser.
function getProjectSummaries() {
  return getProjects().map(({ id, url, title, tagline, kind, status, started, ended, videos }) => ({
    id, url, title, tagline, kind, status, started, ended, videos,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  return page ? { title: page.title } : { title: 'Not Found' };
}

export default async function ContentPage({ params }) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  if (page.url === '/projects/') {
    return (
      <MarkdownPage content={page.content}>
        <ProjectCatalog kinds={PROJECT_KINDS} projects={getProjectSummaries()} statuses={PROJECT_STATUSES} />
      </MarkdownPage>
    );
  }

  if (isProjectPage(page)) {
    const project = getProjectById(page.slug.at(-1));

    return (
      <MarkdownPage content={project.content} header={<ProjectHeader project={project} />}>
        <ProjectDetails posts={getPostsForProject(project.id)} project={project} />
      </MarkdownPage>
    );
  }

  if (isBlogPost(page) && page.frontmatter.projects) {
    const projects = page.frontmatter.projects.map(getProjectById).filter(Boolean);

    return (
      <MarkdownPage content={page.content}>
        <PartOfProjects projects={projects} />
      </MarkdownPage>
    );
  }

  return <MarkdownPage content={page.content} />;
}
