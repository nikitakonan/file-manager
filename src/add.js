import { constants } from 'node:fs';
import { access, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export default async function add(args, ctx) {
  if (args.length < 1) {
    throw new Error('Invalid input');
  }

  const [fileName] = args;

  const path = join(ctx.currentDirectory, fileName);

  try {
    await access(path, constants.R_OK);
    throw new Error('File already exists');
  } catch (error) {
    if (error.message === 'File already exists') {
      throw error;
    }
    await writeFile(path, '');
  }
}
