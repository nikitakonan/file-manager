import { homedir } from 'node:os';
import { parse, dirname } from 'node:path';

export default function up(_args, ctx) {
  const root = parse(homedir()).root;

  if (ctx.currentDirectory !== root) {
    ctx.currentDirectory = dirname(ctx.currentDirectory);
  }
}
