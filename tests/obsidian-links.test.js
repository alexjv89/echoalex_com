import assert from 'node:assert/strict';
import test from 'node:test';
import { getAllPages } from '../src/lib/content.js';
import { replaceObsidianLinks } from '../src/lib/obsidian-links.js';

test('converts Obsidian page links to stable routes', () => {
  assert.equal(
    replaceObsidianLinks('Read [[bulk_run]] and [[projects|my projects]].'),
    'Read [bulk_run](/blog/2023/bulk_run/) and [my projects](/projects/).',
  );
});

test('converts Obsidian image embeds to public file URLs', () => {
  assert.equal(
    replaceObsidianLinks('![[Pasted image 20210909160449.png]]'),
    '![](/files/Pasted%20image%2020210909160449.png)',
  );
  assert.equal(
    replaceObsidianLinks('![[files/image.png]]'),
    '![](/files/image.png)',
  );
});

test('fails the build for unresolved Obsidian targets', () => {
  assert.throws(
    () => replaceObsidianLinks('[[missing-page]]'),
    /Unresolved Obsidian link: missing-page/,
  );
});

test('converts legacy markdown file links to published routes', () => {
  assert.equal(
    replaceObsidianLinks('[Book](be-so-good-that-they-cant-ignore-you.md)'),
    '[Book](/blog/2018/be-so-good-that-they-cant-ignore-you/)',
  );
});

test('resolves every Obsidian link in published content', () => {
  for (const page of getAllPages()) {
    const compatible_content = replaceObsidianLinks(page.content);
    assert.doesNotMatch(compatible_content, /!?\[\[[^\]]+\]\]/, page.file_path);
  }
});
