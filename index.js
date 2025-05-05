import { homedir } from 'node:os';
import add from './src/add.js';
import parseArgs from './src/args.js';
import cat from './src/cat.js';
import cd from './src/cd.js';
import exit from './src/exit.js';
import ls from './src/ls.js';
import mkdir from './src/mkdir.js';
import up from './src/up.js';

const args = parseArgs();

const commandCtx = {
  username: args.username ?? 'anonymous',
  currentDirectory: homedir(),
};

const commandFactory = {
  exit,
  up,
  cd,
  ls,
  cat,
  add,
  mkdir,
};

greet();
printCurrentDirectory();

process.stdin.on('data', async (chunk) => {
  const input = chunk.toString().trim();
  const [command, ...args] = input.split(' ');
  console.log('command: ', command, args);

  const fn = commandFactory[command];

  if (typeof fn === 'function') {
    try {
      await fn(args, commandCtx);
      printCurrentDirectory();
    } catch (error) {
      process.stdout.write(`Operation failed\n${error.message}\n`);
    }
  } else {
    process.stdout.write('Invalid input\n');
  }
});

process.on('SIGINT', () => {
  exit(null, commandCtx);
});

function greet() {
  process.stdout.write(
    `Welcome to the File Manager, ${commandCtx.username}!\n`
  );
}

function printCurrentDirectory() {
  process.stdout.write(
    `You are currently in  ${commandCtx.currentDirectory}\n`
  );
}
