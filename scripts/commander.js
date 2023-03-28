import { program } from 'commander';
import gendiff from '../cli/gendiff.js';

const commander = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format')
    .action((filepath1, filepath2) => console.log(gendiff(filepath1, filepath2)));
  program.parse();
};

export default commander;