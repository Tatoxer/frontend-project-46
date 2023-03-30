import compareObjects from '../scripts/compareObjects.js';

const testFile1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
const testFile2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const expected1 = [
  '    host: hexlet.io\n',
  '  - timeout: 50\n',
  '  + timeout: 20\n',
  '  - proxy: 123.234.53.22\n',
  '  - follow: false\n',
  '  + verbose: true\n',
];
const expected2 = [
  '  + timeout: 20\n',
  '  + verbose: true\n',
  '  + host: hexlet.io\n',
];
const expected3 = [
  '  - host: hexlet.io\n',
  '  - timeout: 50\n',
  '  - proxy: 123.234.53.22\n',
  '  - follow: false\n',
];

test('compare objects', () => {
  expect(compareObjects(testFile1, testFile2)).toEqual(expected1);
  expect(compareObjects({}, testFile2)).toEqual(expected2);
  expect(compareObjects({}, {})).toEqual([]);
  expect(compareObjects(testFile1, {})).toEqual(expected3);
});
