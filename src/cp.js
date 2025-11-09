import { createReadStream, createWriteStream } from 'node:fs';
import { access, constants } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { pipeline } from 'node:stream/promises';
import getFullPath from '../util/getFullPath.js';

export default async function cp(args, ctx) {
  if (args.length < 2) {
    throw new Error('Invalid input');
  }

  const [pathToFile, dir] = args;

  const filePath = getFullPath(pathToFile, ctx.currentDirectory);
  await access(filePath, constants.R_OK);
  const toBase = parse(filePath).base;
  const fullDir = getFullPath(dir, ctx.currentDirectory);
  const toPath = join(fullDir, toBase);

  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(toPath);

  await pipeline(readStream, writeStream);
}
