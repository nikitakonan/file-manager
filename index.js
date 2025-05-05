import { homedir } from 'node:os';
import { join } from 'node:path';
import { readdir } from 'node:fs/promises';
import { parseArgs } from './src/args.js';

const args = parseArgs();
const username = args.username ?? 'anonymous';

let currentDirectory = homedir();

process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
printCurrentDirectory();

const commandFactory = {
  exit,
  up,
  cd,
  ls,
};

process.stdin.on('data', async (chunk) => {
  const input = chunk.toString().trim();
  const [command, ...args] = input.split(' ');
  console.log('command: ', command, args);

  const fn = commandFactory[command];

  if (typeof fn === 'function') {
    try {
      await fn(args);
      printCurrentDirectory();
    } catch (error) {
      process.stdout.write(`Operation failed\n${error.message}\n`);
    }
  } else {
    // Invalid input
    process.stdout.write('Invalid input\n');
  }
});

process.on('SIGINT', () => {
  exit();
});

function printCurrentDirectory() {
  process.stdout.write(`You are currently in  ${currentDirectory}\n`);
}

function exit() {
  process.stdout.write(
    `Thank you for using File Manager, ${username}, goodbye!\n`
  );
  process.exit();
}

function up() {
  if (currentDirectory !== homedir()) {
    currentDirectory = currentDirectory.split('/').slice(0, -1).join('/');
  }
}

async function cd(args) {
  if (args.length < 1) {
    throw new Error('Invalid input');
  }

  const [path] = args;

  const files = await readdir(currentDirectory, { withFileTypes: true });
  const dir = files
    .filter((file) => file.isDirectory())
    .find((dir) => dir.name === path);

  if (!dir) {
    throw new Error('Operation failed');
  }

  currentDirectory = join(currentDirectory, path);
}

async function ls() {
  const files = await readdir(currentDirectory, { withFileTypes: true });
  console.table(
    files
      .map((file) => ({
        Name: file.name,
        Type: file.isDirectory() ? 'directory' : 'file',
      }))
      .sort((a, b) => a.Type.localeCompare(b.Type))
  );
}
