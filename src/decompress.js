import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliDecompress } from 'node:zlib';
import getFullPath from '../util/getFullPath.js';

export default async function decompress(args, ctx) {
  if (args.length < 2) {
    throw new Error('Invalid input');
  }

  const [source, destination] = args;

  const inputPath = getFullPath(source, ctx.currentDirectory);
  const outputPath = getFullPath(destination, ctx.currentDirectory);
  const input = createReadStream(inputPath);
  const out = createWriteStream(outputPath);
  const brotli = createBrotliDecompress();

  await pipeline(input, brotli, out);
}
