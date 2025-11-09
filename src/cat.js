import { createReadStream } from 'node:fs';
import getFullPath from '../util/getFullPath.js';

export default async function cat(args, ctx) {
  if (args.length < 1) {
    throw new Error('Invalid input');
  }

  const [filePath] = args;
  const fullPath = getFullPath(filePath, ctx.currentDirectory);

  return new Promise((resolve, reject) => {
    const stream = createReadStream(fullPath, 'utf-8');
    
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
