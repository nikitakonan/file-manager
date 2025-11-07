import { unlink } from 'node:fs/promises';
import getFullPath from '../util/getFullPath.js';

export default async function rm(args, ctx) {
  if (args.length < 1) {
    throw new Error('Invalid input');
  }

  const [path] = args;
  const fullPath = getFullPath(path, ctx.currentDirectory);

  await unlink(fullPath);
}
