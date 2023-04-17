import fs from 'fs';

const getRawFileData = (filePath) => fs.readFileSync(filePath);

export default getRawFileData;
