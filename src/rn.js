import { rename } from 'node:fs/promises';
import { join } from 'node:path';

export default async function rn(args, ctx) {
  if (args.length < 2) {
    throw new Error('Invalid input');
  }

  const [oldName, newName] = args;

  const oldPath = join(ctx.currentDirectory, oldName);
  const newPath = join(ctx.currentDirectory, newName);

  await rename(oldPath, newPath);
}
