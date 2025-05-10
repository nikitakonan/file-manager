import cp from './cp.js';
import rm from './rm.js';

export default async function mv(args, ctx) {
  await cp(args, ctx);
  await rm(args, ctx);
}
