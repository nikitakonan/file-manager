import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';

export default async function cp(args, ctx) {
  if (args.length < 2) {
    throw new Error('Invalid input');
  }

  const [fileName, dir] = args;

  const filePath = join(ctx.currentDirectory, fileName);

  return new Promise((resolve, reject) => {
    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(
      join(ctx.currentDirectory, dir, fileName)
    );

    readStream.on('error', reject);
    writeStream.on('error', reject);

    readStream.pipe(writeStream);

    readStream.on('end', resolve);
  });
}
