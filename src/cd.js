import { constants, access } from 'node:fs/promises';
import { resolve, isAbsolute, normalize } from 'node:path';

export default async function cd(args, ctx) {
  if (args.length < 1) {
    throw new Error('Invalid input');
  }

  const [path] = args;
  const newDir = isAbsolute(path) ? normalize(path) : resolve(ctx.currentDirectory, path);
  await access(newDir, constants.R_OK);

  ctx.currentDirectory = newDir;
}
