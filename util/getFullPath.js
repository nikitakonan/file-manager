import { isAbsolute, normalize, resolve } from 'node:path';

export default function getFullPath(path, currentDirectory) {
  return isAbsolute(path) ? normalize(path) : resolve(currentDirectory, path);
}
