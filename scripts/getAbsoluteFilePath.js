import path from 'path';
import fs from 'fs';

const getAbsPathFile = (relativePath) => {
  const currentDir = process.cwd().split('/');
  const projectDir = currentDir.join('/');
  if (fs.existsSync(path.resolve(projectDir, relativePath))) {
    return path.resolve(projectDir, relativePath);
  }
  console.log('Please, check paths!');
  console.log(path.resolve(projectDir, relativePath));
  return null;
};

export default getAbsPathFile;
