import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const project_root = process.cwd();
const public_dir = path.join(project_root, 'public');

await mkdir(public_dir, { recursive: true });

for (const directory of ['assets', 'files']) {
  const destination = path.join(public_dir, directory);
  await rm(destination, { recursive: true, force: true });
  await cp(path.join(project_root, directory), destination, { recursive: true });
}

const custom_domain = await readFile(path.join(project_root, 'CNAME'), 'utf8');
await writeFile(path.join(public_dir, 'CNAME'), custom_domain);
await writeFile(path.join(public_dir, '.nojekyll'), '');
