import { createReadStream, createWriteStream } from 'node:fs';
import { access, constants } from 'node:fs/promises';
import { isAbsolute, join, normalize, parse, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';

export default async function cp(args, ctx) {
  if (args.length < 2) {
    throw new Error('Invalid input');
  }

  const [pathToFile, dir] = args;

  const filePath = isAbsolute(pathToFile)
    ? normalize(pathToFile)
    : resolve(ctx.currentDirectory, pathToFile);
  await access(filePath, constants.R_OK);
  const toBase = parse(filePath).base;
  const fullDir = isAbsolute(dir)
    ? normalize(dir)
    : resolve(ctx.currentDirectory, dir);
  const toPath = join(fullDir, toBase);

  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(toPath);

  await pipeline(readStream, writeStream);
}
