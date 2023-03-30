const compareObjects = (obj1, obj2) => {
  const entries = Object.entries(obj1);
  const obj2Keys = Object.keys(obj2);

  // Добавляет разницу ключей и значений между obj1 и obj2
  const checkedObj1 = entries.flatMap(([key, value]) => {
    const array = [];

    // Если есть ключ но не совпадают значения
    if (Object.hasOwn(obj2, key) && value !== obj2[key]) {
      array.push(`  - ${key}: ${value}\n`);
      array.push(`  + ${key}: ${obj2[key]}\n`);
    }

    // Если совпадают ключи и значения
    if (Object.hasOwn(obj2, key) && value === obj2[key]) {
      array.push(`    ${key}: ${value}\n`);
    }

    // Если нет ключа
    if (!Object.hasOwn(obj2, key)) {
      array.push(`  - ${key}: ${value}\n`);
    }
    return array;
  });

  // Добавляет остутсвующие ключи и значения в ob1 из obj2
  const checkedObj2 = obj2Keys.flatMap((key) => {
    const array = [];

    if (!Object.hasOwn(obj1, key)) {
      array.push(`  + ${key}: ${obj2[key]}\n`);
    }
    return array;
  });

  return [...checkedObj1, ...checkedObj2];
};

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
console.log(compareObjects(testFile1, testFile2));
export default compareObjects;
