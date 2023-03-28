import path from 'path';

const getAbsPathFile = (relativePath) => {
  const projectDir = process.cwd().split('/');
  projectDir.pop();
  const pathToFile = projectDir.join('/');
  return path.resolve(pathToFile, relativePath);
};

export default getAbsPathFile;
