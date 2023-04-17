import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import getAbsolutePathFile from '../scripts/getAbsoluteFilePath.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absPath = path.join(__dirname, '..', '__fixtures__', 'empty.json');

test('getAbsoluteFilePath', () => {
  expect(fs.existsSync(getAbsolutePathFile('__fixtures__/empty.json'))).toEqual(true);
  expect(fs.existsSync(getAbsolutePathFile(absPath))).toEqual(true);
  expect(fs.existsSync(getAbsolutePathFile('empty.json'))).toEqual(false);
});
