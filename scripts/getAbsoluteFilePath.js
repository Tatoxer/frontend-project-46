import path from 'path';
import fs from 'fs';

const getAbsPathFile = (relativePath) => {
  const projectDir = process.cwd().split('/');
  projectDir.pop();
  const pathToFile = projectDir.join('/');
  if (fs.existsSync(path.resolve(pathToFile, relativePath))) {
    return path.resolve(pathToFile, relativePath);
  }
  console.log('Please, check paths!');
  return null;
};

export default getAbsPathFile;

// const relative = 'src/file1.json';
// const absolute = '/Users/tatoxa/JS/Hexlet/frontend-project-46/src/file1.json';
// const wrong = '/Users/tatoxa/JS/Hexlet/frontend-project-46/file1.json';
// console.log(getAbsPathFile(relative));
// console.log(getAbsPathFile(absolute));
// console.log(getAbsPathFile(wrong));
