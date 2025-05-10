import { createReadStream } from 'node:fs';
import { join } from 'node:path';

export default async function cat(args, ctx) {
  if (args.length < 1) {
    throw new Error('Invalid input');
  }

  return new Promise((resolve, reject) => {
    const [filePath] = args;

    const path = join(ctx.currentDirectory, filePath);
    const stream = createReadStream(path, 'utf-8');
    const startLine = `----------  ${filePath} ----------`;
    process.stdout.write(`\n${startLine}\n`);
    stream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
    stream.on('end', () => {
      process.stdout.write(`\n${'-'.repeat(startLine.length)}\n\n`);
      resolve();
    });
    stream.on('error', (error) => {
      reject(error);
    });
  });
}
