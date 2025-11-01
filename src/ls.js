import { readdir } from 'node:fs/promises';

export default async function ls(_args, ctx) {
  const files = await readdir(ctx.currentDirectory, { withFileTypes: true });
  console.table(
    files
      .map((file) => ({
        Name: file.name,
        Type: file.isDirectory() ? 'directory' : 'file',
      }))
      .sort((a, b) => a.Type.localeCompare(b.Type))
  );
}
