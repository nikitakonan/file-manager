import { access, constants, rename } from 'node:fs/promises';
import { isAbsolute, join, parse, resolve } from 'node:path';

export default async function rn(args, ctx) {
  if (args.length < 2) {
    throw new Error('Invalid input');
  }

  const [filePath, newName] = args;
  const fullPath = isAbsolute(filePath) ? normalize(filePath) : resolve(ctx.currentDirectory, filePath);

  await access(fullPath, constants.R_OK);

  const parsed = parse(fullPath);
  const newPath = join(parsed.dir, `${newName}${parsed.ext}`);

  await rename(fullPath, newPath);
}
