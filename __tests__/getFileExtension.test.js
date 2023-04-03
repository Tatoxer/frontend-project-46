import getFileExtension from '../scripts/getFileExtension.js';
import getFixturePath from '../scripts/getFixturePath.js';

const path1 = getFixturePath('empty.yaml');

test('getFileExtension', () => {
  expect(getFileExtension('index.html')).toEqual('.html');
  expect(getFileExtension('index.coffee.md')).toEqual('.md');
  expect(getFileExtension('index.')).toEqual('.');
  expect(getFileExtension('index')).toEqual('');
  expect(getFileExtension('.index')).toEqual('');
  expect(getFileExtension('.index.md')).toEqual('.md');
  expect(getFileExtension(path1)).toEqual('.yaml');
});
