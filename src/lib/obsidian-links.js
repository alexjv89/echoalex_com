import fs from 'node:fs';
import path from 'node:path';
import { getAllPages } from './content.js';

const FILES_DIRECTORY = path.join(process.cwd(), 'files');

// Marks a bare name shared by two pages (e.g. a post and a project); those links need a folder prefix.
const AMBIGUOUS = Symbol('ambiguous');

function setTarget(targets, name, url) {
  const existing = targets.get(name);
  targets.set(name, existing && existing !== url ? AMBIGUOUS : url);
}

function createTargetIndex() {
  const targets = new Map();

  for (const page of getAllPages()) {
    const name = page.slug.at(-1) || 'index';
    setTarget(targets, name, page.url);
    setTarget(targets, `${name}.md`, page.url);

    if (page.slug.length > 1) {
      targets.set(page.slug.join('/'), page.url);
      targets.set(`${page.slug[0]}/${name}`, page.url);
    }
  }

  const file_entries = fs.readdirSync(FILES_DIRECTORY, { withFileTypes: true }).filter((entry) => entry.isFile());

  for (const { name: file_name } of file_entries) {
    targets.set(file_name, `/files/${encodeURIComponent(file_name)}`);
    targets.set(`files/${file_name}`, `/files/${encodeURIComponent(file_name)}`);
  }

  return targets;
}

function resolveTarget(raw_target, targets) {
  const [target, heading] = raw_target.split('#', 2);
  const resolved_target = targets.get(target.trim());

  if (resolved_target === AMBIGUOUS) {
    throw new Error(`Ambiguous Obsidian link: ${raw_target} (prefix it with a folder, e.g. [[projects/${target.trim()}]])`);
  }

  if (!resolved_target) {
    throw new Error(`Unresolved Obsidian link: ${raw_target}`);
  }

  return heading ? `${resolved_target}#${heading.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : resolved_target;
}

export function replaceObsidianLinks(markdown) {
  const targets = createTargetIndex();

  const compatible_markdown = markdown.replace(/(!?)\[\[([^\]]+)\]\]/g, (_match, image_marker, expression) => {
    const [raw_target, raw_label] = expression.split('|', 2);
    const target = resolveTarget(raw_target, targets);
    const label = (raw_label || raw_target).trim();

    return image_marker ? `![${raw_label?.trim() || ''}](${target})` : `[${label}](${target})`;
  });

  return compatible_markdown.replace(/\]\(([^)#]+\.md)(#[^)]+)?\)/g, (_match, raw_target, heading = '') => {
    const target = resolveTarget(`${raw_target}${heading}`, targets);
    return `](${target})`;
  });
}
