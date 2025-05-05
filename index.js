import { homedir } from 'node:os';
import parseArgs from './src/args.js';
import { commands } from './src/commands.js';
import exit from './src/exit.js';

const args = parseArgs();

const ctx = {
  username: args.username ?? 'anonymous',
  currentDirectory: homedir(),
};

greet();
printCurrentDirectory();

process.stdin.on('data', async (chunk) => {
  const input = chunk.toString().trim();
  const [command, ...args] = input.split(' ');

  const fn = commands[command];

  if (typeof fn === 'function') {
    try {
      await fn(args, ctx);
      printCurrentDirectory();
    } catch (error) {
      process.stdout.write(`Operation failed\n${error.message}\n`);
    }
  } else {
    process.stdout.write('Invalid input\n');
  }
});

process.on('SIGINT', () => {
  exit(null, ctx);
});

function greet() {
  process.stdout.write(`Welcome to the File Manager, ${ctx.username}!\n`);
}

function printCurrentDirectory() {
  process.stdout.write(`You are currently in  ${ctx.currentDirectory}\n`);
}
