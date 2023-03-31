import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import getAbsPathFile from '../scripts/getAbsoluteFilePath.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absPath = path.join(__dirname, '..', '__fixtures__', 'empty.json');

test('getAbsoluteFilePath', () => {
  expect(fs.existsSync(getAbsPathFile('__fixtures__/empty.json'))).toEqual(true);
  expect(fs.existsSync(getAbsPathFile(absPath))).toEqual(true);
  expect(fs.existsSync(getAbsPathFile('empty.json'))).toEqual(false);
});
