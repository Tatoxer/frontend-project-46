const compareObjectsByEntries = (obj1, obj2) => {
  const entries = Object.entries(obj1);

  return entries.flatMap(([key, value]) => {
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
};
const compareObjectsByKeys = (obj1, obj2) => {
  const obj2Keys = Object.keys(obj2);

  return obj2Keys.flatMap((key) => {
    const array = [];

    if (!Object.hasOwn(obj1, key)) {
      array.push(`  + ${key}: ${obj2[key]}\n`);
    }
    return array;
  });
};

export { compareObjectsByEntries, compareObjectsByKeys };
