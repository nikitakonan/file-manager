import { access, constants, rename } from 'node:fs/promises';
import { join, parse } from 'node:path';
import getFullPath from '../util/getFullPath.js';

export default async function rn(args, ctx) {
  if (args.length < 2) {
    throw new Error('Invalid input');
  }

  const [filePath, newName] = args;
  const fullPath = getFullPath(filePath, ctx.currentDirectory);

  await access(fullPath, constants.W_OK);

  const parsed = parse(fullPath);
  const newPath = join(parsed.dir, `${newName}${parsed.ext}`);

  await rename(fullPath, newPath);
}
