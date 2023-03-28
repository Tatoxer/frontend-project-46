import path from 'path';
import fs from 'fs';

const getAbsPathFile = (relativePath) => {
  const projectDir = process.cwd().split('/');
  // projectDir.pop();
  const pathToFile = projectDir.join('/');
  if (fs.existsSync(path.resolve(pathToFile, relativePath))) {
    return path.resolve(pathToFile, relativePath);
  }
  console.log('Please, check paths!');
  console.log(path.resolve(pathToFile, relativePath));
  return null;
};

export default getAbsPathFile;
