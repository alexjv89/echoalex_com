import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import {
  getAllPages,
  getBlogPosts,
  getPageBySlug,
  getPostsForProject,
  getProjectById,
  getProjects,
  getStaticPageParams,
  isBlogPost,
  isProjectPage,
} from '../src/lib/content.js';

const ROOT_PAGE_COUNT = 4;

test('discovers only the root pages, blog posts and projects', () => {
  const pages = getAllPages();
  const blog_posts = pages.filter(isBlogPost);
  const projects = pages.filter(isProjectPage);

  assert.equal(pages.length, ROOT_PAGE_COUNT + blog_posts.length + projects.length);
  assert.equal(projects.length, fs.readdirSync('projects').filter((name) => name.endsWith('.md')).length);
  assert.equal(new Set(pages.map((page) => page.url)).size, pages.length);
  assert.equal(pages.some((page) => page.url.includes('README')), false);
  assert.equal(pages.some((page) => page.url.startsWith('/templates/')), false);
  assert.equal(getStaticPageParams().length, pages.length - 1);
});

test('maps existing content to stable URLs', () => {
  assert.equal(getPageBySlug([]).url, '/');
  assert.equal(getPageBySlug(['blog']).url, '/blog/');
  assert.equal(
    getPageBySlug(['blog', '2024', 'time-aware']).url,
    '/blog/2024/time-aware/',
  );
});

test('derives a title when frontmatter is absent', () => {
  const page = getPageBySlug(['blog', '2021', 'value-vs-quality']);

  assert.equal(page.title, 'Value vs Quality');
  assert.deepEqual(page.frontmatter, {});
});

test('every project has valid frontmatter and a stable URL', () => {
  const projects = getProjects();

  assert.ok(projects.length > 0);

  for (const project of projects) {
    assert.match(project.started, /^\d{4}(-\d{2})?$/, project.file_path);
    assert.equal(project.url, `/projects/${project.id}/`);
    assert.ok(Array.isArray(project.links), project.file_path);

    for (const link of project.links) {
      assert.ok(link.label && link.url, `${project.file_path}: links need a label and url`);
      assert.doesNotMatch(link.url, /switchless\.io/, 'switchless.io now redirects to spam');
    }
  }
});

test('lists projects newest first', () => {
  const started = getProjects().map((project) => project.started);
  assert.deepEqual(started, [...started].sort().reverse());
});

test('every post that names a project points at a real one', () => {
  for (const post of getBlogPosts()) {
    for (const id of post.project_ids) {
      assert.ok(getProjectById(id), `${post.file_path}: unknown project "${id}"`);
    }
  }

  assert.deepEqual(getPostsForProject('time-aware').map((post) => post.url), ['/blog/2024/time-aware/']);
});
