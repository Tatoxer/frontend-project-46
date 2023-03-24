import {program} from "commander";

const commander = () => {
  program
    .name('genDiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1');

  program.parse()
};

export default commander;