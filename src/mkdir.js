import { access, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

export default async function mkdirCommand(args, ctx) {
  if (args.length < 1) {
    throw new Error('Invalid input');
  }

  const [dirName] = args;

  const path = join(ctx.currentDirectory, dirName);

  try {
    await access(path, constants.R_OK);
    throw new Error('Directory already exists');
  } catch (error) {
    if (error.message === 'Directory already exists') {
      throw error;
    }
    await mkdir(path);
  }
}
