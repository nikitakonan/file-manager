export default function exit(_args, ctx) {
  process.stdout.write(
    `Thank you for using File Manager, ${ctx.username}, goodbye!\n`
  );
  ctx.rl.close();
  process.exit();
}
