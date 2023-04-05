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

const expected1 = {
  host: ['hexlet.io', 2, 'unchanged', ''],
  timeout: [50, 2, 'changed', 20],
  proxy: ['123.234.53.22', 2, 'removed', ''],
  follow: [false, 2, 'removed', ''],
  verbose: [true, 2, 'added', ''],
};

const expected2 = {
  timeout: [20, 2, 'added', ''],
  verbose: [true, 2, 'added', ''],
  host: ['hexlet.io', 2, 'added', ''],
};

const expected3 = {
  host: ['hexlet.io', 2, 'removed', ''],
  timeout: [50, 2, 'removed', ''],
  proxy: ['123.234.53.22', 2, 'removed', ''],
  follow: [false, 2, 'removed', ''],
};

test('compare objects', () => {
  expect(compareObjects(testFile1, testFile2)).toEqual(expected1);
  expect(compareObjects({}, testFile2)).toEqual(expected2);
  expect(compareObjects({}, {})).toEqual({});
  expect(compareObjects(testFile1, {})).toEqual(expected3);
});
