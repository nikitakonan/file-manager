import { homedir } from 'node:os';
import parseArgs from './src/args.js';
import { commands } from './src/commands.js';
import exit from './src/exit.js';
import { createInterface } from 'node:readline';

const args = parseArgs();

const ctx = {
  username: args.username ?? 'anonymous',
  currentDirectory: homedir(),
  rl: createInterface({
    input: process.stdin,
    output: process.stdout,
  }),
};

greet();
printCurrentDirectory();
ctx.rl.question('Enter one of the commands:\n', handleInput);

process.on('SIGINT', () => {
  exit(null, ctx);
});

async function handleInput(input) {
  const [command, ...args] = input.split(' ');

  const fn = commands[command];

  if (typeof fn === 'function') {
    try {
      await fn(args, ctx);
      printCurrentDirectory();
      ctx.rl.question('Enter one of the commands:\n', handleInput);
    } catch (error) {
      process.stdout.write(`Operation failed\n${error.message}\n`);
      printCurrentDirectory();
      ctx.rl.question('Enter one of the commands:\n', handleInput);
    }
  } else {
    process.stdout.write('Invalid input\n');
    printCurrentDirectory();
    ctx.rl.question('Enter one of the commands:\n', handleInput);
  }
}

function greet() {
  process.stdout.write(`Welcome to the File Manager, ${ctx.username}!\n`);
}

function printCurrentDirectory() {
  process.stdout.write(`You are currently in  ${ctx.currentDirectory}\n`);
}
