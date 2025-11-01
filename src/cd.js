import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export default async function cd(args, ctx) {
  if (args.length < 1) {
    throw new Error('Invalid input');
  }

  const [path] = args;

  const files = await readdir(ctx.currentDirectory, { withFileTypes: true });
  const dir = files
    .filter((file) => file.isDirectory())
    .find((dir) => dir.name === path);

  if (!dir) {
    throw new Error('Operation failed');
  }

  ctx.currentDirectory = join(ctx.currentDirectory, path);
}
