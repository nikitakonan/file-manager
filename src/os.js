import { EOL, cpus, homedir, userInfo, arch } from 'node:os';

export default async function os(args, ctx) {
  const param = args[0] ? args[0].slice(2) : '';

  switch (param) {
    case 'EOL': {
      process.stdout.write(`${EOL}\n`);
      break;
    }
    case 'cpus': {
      console.table(
        cpus().map((cpu) => ({
          model: cpu.model,
          speed: `${cpu.speed / 1000}GHz`,
          times: cpu.times.nice,
        }))
      );
      break;
    }
    case 'homedir': {
      process.stdout.write(`${homedir()}\n`);
      break;
    }
    case 'username': {
      process.stdout.write(`${userInfo().username}\n`);
      break;
    }
    case 'architecture': {
      process.stdout.write(`${arch()}\n`);
      break;
    }
  }
}
