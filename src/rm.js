import { unlink } from 'node:fs/promises';
import { join } from 'node:path';

export default async function rm(args, ctx) {
  if (args.length < 1) {
    throw new Error('Invalid input');
  }

  const [fileName] = args;

  const path = join(ctx.currentDirectory, fileName);

  await unlink(path);
}
