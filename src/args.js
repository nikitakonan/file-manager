export default function parseArgs() {
  return process.argv.slice(2).reduce((acc, arg) => {
    if (arg.startsWith('--')) {
      const pair = arg.slice(2);
      const [key, value] = pair.split('=');
      acc[key] = value;
    }
    return acc;
  }, {});
}
