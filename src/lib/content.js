import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT_PAGE_FILES = ['index.md', 'blog.md', 'projects.md', 'now.md'];
const BLOG_DIRECTORY = 'blog';
const CONTENT_ROOT = process.cwd();

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

  return [...root_pages, ...blog_pages]
    .map(pageFromFile)
    .sort((left, right) => left.url.localeCompare(right.url));
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
