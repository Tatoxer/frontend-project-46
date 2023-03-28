#!/usr/bin/env node

import fs from 'fs';
import getSortedJSON from '../scripts/getSortedJSON.js';
import getAbsPathFile from '../scripts/getAbsoluteFilePath.js';
import commander from '../scripts/commander.js';

// commander();

const genDiff = (obj1, obj2) => {
  const entries = Object.entries(obj1);
  const obj2Keys = Object.keys(obj2);

  const obj1Difference = entries.flatMap(([key, value]) => {
    const array = [];

    // Если есть ключ но не совпадают значения
    if (Object.hasOwn(obj2, key) && value !== obj2[key]) {
      array.push(`- ${key}: ${value}\n`);
      array.push(`+ ${key}: ${obj2[key]}\n`);
    }

    // Если совпадают ключи и значения
    if (Object.hasOwn(obj2, key) && value === obj2[key]) {
      array.push(`  ${key}: ${value}\n`);
    }

    // Если нет ключа
    if (!Object.hasOwn(obj2, key)) {
      array.push(`- ${key}: ${value}\n`);
    }
    return array;
  });

  const obj2Difference = obj2Keys.flatMap((key) => {
    const array = [];

    if (!Object.hasOwn(obj1, key)) {
      array.push(`+ ${key}: ${obj2[key]}\n`);
    }
    return array;
  });
  return [...obj1Difference, ...obj2Difference].join('');
};

const path1 = getAbsPathFile('src/file1.json');
const path2 = getAbsPathFile('src/file2.json');

const file1 = getSortedJSON(JSON.parse(fs.readFileSync(path1)));
const file2 = getSortedJSON(JSON.parse(fs.readFileSync(path2)));

console.log(genDiff(file1, file2));
