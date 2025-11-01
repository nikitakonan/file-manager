import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { createBrotliDecompress } from 'node:zlib';

export default async function decompress(args, ctx) {
  if (args.length < 2) {
    throw new Error('Invalid input');
  }

  const [source, destination] = args;

  const input = createReadStream(join(ctx.currentDirectory, source));
  const out = createWriteStream(join(ctx.currentDirectory, destination));
  const brotli = createBrotliDecompress();

  return new Promise((resolve, reject) => {
    input.pipe(brotli).pipe(out);
    input.on('error', (error) => {
      reject(error);
    });
    out.on('error', (error) => {
      reject(error);
    });
    out.on('finish', () => {
      resolve();
    });
  });
}
