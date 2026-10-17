import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { PROJECT_KINDS, PROJECT_STATUSES } from './project-taxonomy.js';

export { PROJECT_KINDS, PROJECT_STATUSES };

const ROOT_PAGE_FILES = ['index.md', 'blog.md', 'projects.md', 'now.md'];
const BLOG_DIRECTORY = 'blog';
const PROJECTS_DIRECTORY = 'projects';
const CONTENT_ROOT = process.cwd();

const REQUIRED_PROJECT_FIELDS = ['title', 'tagline', 'kind', 'started', 'status'];

function walkMarkdownFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entry_path = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walkMarkdownFiles(entry_path);
    }

    return entry.isFile() && entry.name.endsWith('.md') ? [entry_path] : [];
  });
}

function slugFromFile(file_path) {
  const relative_path = path.relative(CONTENT_ROOT, file_path);

  if (relative_path === 'index.md') {
    return [];
  }

  return relative_path.replace(/\.md$/, '').split(path.sep);
}

function titleFromContent(content, slug) {
  const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();

  if (heading) {
    return heading;
  }

  const fallback = slug.at(-1) || 'echoalex.com';
  return fallback.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function pageFromFile(file_path) {
  const source = fs.readFileSync(file_path, 'utf8');
  const { data, content } = matter(source);
  const slug = slugFromFile(file_path);

  return {
    content,
    file_path,
    frontmatter: data,
    slug,
    title: data.title || titleFromContent(content, slug),
    url: slug.length === 0 ? '/' : `/${slug.join('/')}/`,
  };
}

export function getAllPages() {
  const root_pages = ROOT_PAGE_FILES.map((file) => path.join(CONTENT_ROOT, file));
  const blog_pages = walkMarkdownFiles(path.join(CONTENT_ROOT, BLOG_DIRECTORY));
  const project_pages = walkMarkdownFiles(path.join(CONTENT_ROOT, PROJECTS_DIRECTORY));

  return [...root_pages, ...blog_pages, ...project_pages]
    .map(pageFromFile)
    .sort((left, right) => left.url.localeCompare(right.url));
}

// YAML reads `2014` as a number and `2014-11-02` as a Date; keep everything as YYYY or YYYY-MM text.
function normalizeMonth(value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 7);
  }

  return String(value);
}

function validateProject(page) {
  const missing = REQUIRED_PROJECT_FIELDS.filter((field) => !page.frontmatter[field]);

  if (missing.length > 0) {
    throw new Error(`${page.file_path}: missing project fields: ${missing.join(', ')}`);
  }

  if (!PROJECT_KINDS.some((kind) => kind.id === page.frontmatter.kind)) {
    throw new Error(`${page.file_path}: unknown kind "${page.frontmatter.kind}"`);
  }

  if (!PROJECT_STATUSES.includes(page.frontmatter.status)) {
    throw new Error(`${page.file_path}: unknown status "${page.frontmatter.status}"`);
  }
}

function projectFromPage(page) {
  validateProject(page);
  const { frontmatter } = page;

  return {
    ...page,
    id: page.slug.at(-1),
    tagline: frontmatter.tagline,
    kind: frontmatter.kind,
    status: frontmatter.status,
    started: normalizeMonth(frontmatter.started),
    ended: normalizeMonth(frontmatter.ended),
    links: frontmatter.links || [],
    videos: (frontmatter.videos || []).map(String),
  };
}

export function isProjectPage(page) {
  return page.slug.length === 2 && page.slug[0] === PROJECTS_DIRECTORY;
}

export function isBlogPost(page) {
  return page.slug.length > 1 && page.slug[0] === BLOG_DIRECTORY;
}

export function getProjects() {
  return getAllPages()
    .filter(isProjectPage)
    .map(projectFromPage)
    .sort((left, right) => right.started.localeCompare(left.started) || left.title.localeCompare(right.title));
}

export function getProjectById(id) {
  return getProjects().find((project) => project.id === id) || null;
}

export function getBlogPosts() {
  return getAllPages()
    .filter(isBlogPost)
    .map((page) => ({ ...page, project_ids: page.frontmatter.projects || [] }));
}

export function getPostsForProject(id) {
  return getBlogPosts()
    .filter((post) => post.project_ids.includes(id))
    .sort((left, right) => right.url.localeCompare(left.url));
}

export function getPageBySlug(slug = []) {
  const normalized_slug = slug || [];
  return getAllPages().find((page) => page.slug.join('/') === normalized_slug.join('/')) || null;
}

export function getStaticPageParams() {
  return getAllPages()
    .filter((page) => page.slug.length > 0)
    .map((page) => ({ slug: page.slug }));
}
