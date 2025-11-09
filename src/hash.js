import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import getFullPath from '../util/getFullPath.js';

export default async function hash(args, ctx) {
  if (args.length < 1) {
    throw new Error('Invalid input');
  }

  const [path] = args;
  const fullPath = getFullPath(path, ctx.currentDirectory);

  const stream = createReadStream(fullPath);
  const hash = createHash('sha256');

  return new Promise((resolve, reject) => {
    stream.pipe(hash);

    stream.on('end', () => {
      resolve();
      process.stdout.write(`${hash.digest('hex')}\n`);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}
