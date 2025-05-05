import { homedir } from 'node:os';

export default function up(_args, ctx) {
  if (ctx.currentDirectory !== homedir()) {
    ctx.currentDirectory = ctx.currentDirectory
      .split('/')
      .slice(0, -1)
      .join('/');
  }
}
