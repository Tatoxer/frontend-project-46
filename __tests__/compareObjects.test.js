import { compareObjectsByKeys, compareObjectsByEntries } from '../scripts/compareObjects.js';

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

const expected1 = ['  + verbose: true\n'];
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
const expected4 = [
  '    host: hexlet.io\n',
  '  - timeout: 50\n',
  '  + timeout: 20\n',
  '  - proxy: 123.234.53.22\n',
  '  - follow: false\n',
];
const expected5 = [
  '  + host: hexlet.io\n',
  '  + timeout: 50\n',
  '  + proxy: 123.234.53.22\n',
  '  + follow: false\n',
];

test('keys comparison', () => {
  expect(compareObjectsByKeys(testFile1, testFile2)).toEqual(expected1);
  expect(compareObjectsByKeys({}, testFile2)).toEqual(expected2);
  expect(compareObjectsByKeys({}, {})).toEqual([]);
  expect(compareObjectsByKeys(testFile1, {})).toEqual([]);
});

test('entries comparison', () => {
  expect(compareObjectsByEntries(testFile1, testFile2)).toEqual(expected4);
  expect(compareObjectsByEntries(testFile1, {})).toEqual(expected3);
  expect(compareObjectsByEntries({}, testFile1)).toEqual([]);
  expect(compareObjectsByEntries({}, {})).toEqual(expected5);
});
