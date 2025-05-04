import { homedir } from 'node:os';
import { parseArgs } from './src/args.js';

const args = parseArgs();

const username = args.username ?? 'anonymous';

const currentDirectory = homedir();

process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
printCurrentDirectory();

const commandFactory = {
  exit: () => {
    beforeExit();
    process.exit();
  },
};

process.stdin.on('data', (chunk) => {
  const command = chunk.toString().trim();

  const fn = commandFactory[command];

  if (typeof fn === 'function') {
    try {
      fn();
    } catch (error) {
      process.stdout.write('Operation failed\n');
    }
  } else {
    // Invalid input
    process.stdout.write('Invalid input\n');
  }
});

process.on('SIGINT', () => {
  beforeExit();
  process.exit();
});

function beforeExit() {
  process.stdout.write(
    `Thank you for using File Manager, ${username}, goodbye!\n`
  );
}

function printCurrentDirectory() {
  process.stdout.write(`You are currently in  ${currentDirectory}\n`);
}
