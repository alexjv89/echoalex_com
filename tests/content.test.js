import assert from 'node:assert/strict';
import test from 'node:test';
import { getAllPages, getPageBySlug, getStaticPageParams } from '../src/lib/content.js';

test('discovers only the four root pages and blog posts', () => {
  const pages = getAllPages();

  assert.equal(pages.length, 26);
  assert.equal(new Set(pages.map((page) => page.url)).size, pages.length);
  assert.equal(pages.some((page) => page.url.includes('README')), false);
  assert.equal(getStaticPageParams().length, 25);
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
