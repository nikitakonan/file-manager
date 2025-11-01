import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

export default async function hash(args, ctx) {
  if (args.length < 1) {
    throw new Error('Invalid input');
  }

  const [fileName] = args;
  const filePath = join(ctx.currentDirectory, fileName);

  const stream = createReadStream(filePath);
  const hash = createHash('sha256');

  return new Promise((resolve, reject) => {
    stream.pipe(hash);

    stream.on('end', () => {
      process.stdout.write(`${hash.digest('hex')}\n`);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}
