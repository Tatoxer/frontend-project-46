import fs from 'fs';

const getJsonFile = (filePath) => JSON.parse(fs.readFileSync(filePath));

export default getJsonFile;
