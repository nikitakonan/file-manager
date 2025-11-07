import { access, constants } from 'node:fs/promises';
import getFullPath from '../util/getFullPath.js';

export default async function cd(args, ctx) {
  if (args.length < 1) {
    throw new Error('Invalid input');
  }

  const [path] = args;
  const newDir = getFullPath(path, ctx.currentDirectory);
  await access(newDir, constants.R_OK);

  ctx.currentDirectory = newDir;
}
