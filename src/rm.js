import { unlink } from 'node:fs/promises';
import { isAbsolute, normalize, resolve } from 'node:path';

export default async function rm(args, ctx) {
  if (args.length < 1) {
    throw new Error('Invalid input');
  }

  const [path] = args;

  const fullPath = isAbsolute(path) ? normalize(path) : resolve(ctx.currentDirectory, path);

  await unlink(fullPath);
}
