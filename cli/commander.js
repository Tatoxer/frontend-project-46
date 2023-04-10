import { program } from 'commander';
import gendiff from './gendiff.js';

const commander = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format', 'stylish')
    .action((filepath1, filepath2, options) => console.log(gendiff(filepath1, filepath2, options.format)));

  program.parse();
};

export default commander;

