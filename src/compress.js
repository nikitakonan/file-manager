import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress } from 'node:zlib';
import getFullPath from '../util/getFullPath.js';

export default async function compress(args, ctx) {
  if (args.length < 2) {
    throw new Error('Invalid input');
  }

  const [source, destination] = args;

  const inputPath = getFullPath(source, ctx.currentDirectory);
  const outputPath = getFullPath(destination, ctx.currentDirectory);
  const input = createReadStream(inputPath);
  const out = createWriteStream(outputPath);
  const brotli = createBrotliCompress();


  await pipeline(input, brotli, out);
  // return new Promise((resolve, reject) => {
  //   input.pipe(brotli).pipe(out);
  //   input.on('error', (error) => {
  //     reject(error);
  //   });
  //   out.on('error', (error) => {
  //     reject(error);
  //   });
  //   out.on('finish', () => {
  //     resolve();
  //   });
  // });
}
