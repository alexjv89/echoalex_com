import fs from 'node:fs';
import path from 'node:path';
import { getAllPages } from './content.js';

const FILES_DIRECTORY = path.join(process.cwd(), 'files');

function createTargetIndex() {
  const targets = new Map();

  for (const page of getAllPages()) {
    const name = page.slug.at(-1) || 'index';
    targets.set(name, page.url);
    targets.set(`${name}.md`, page.url);
  }

  for (const file_name of fs.readdirSync(FILES_DIRECTORY)) {
    targets.set(file_name, `/files/${encodeURIComponent(file_name)}`);
    targets.set(`files/${file_name}`, `/files/${encodeURIComponent(file_name)}`);
  }

  return targets;
}

function resolveTarget(raw_target, targets) {
  const [target, heading] = raw_target.split('#', 2);
  const resolved_target = targets.get(target.trim());

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
