const chalk = require(`chalk`);
const jsonfy = (s) => (typeof s === `object`) ? JSON.stringify(s) : s;

const log = (s) => {
  console.log(jsonfy(s));
};
const warn = (s) => {
  console.log(chalk.yellow(`-x ${jsonfy(s)}`));
};
const err = (s) => {
  console.log(chalk.red(`-X ${jsonfy(s)}`));
};
const succ = (s) => {
  console.log(chalk.green(`-V ${jsonfy(s)}`));
};
const inf = (s) => {
  console.log(chalk.blue(jsonfy(s)));
};
const fillSucc = (s) => {
  console.log(chalk.rgb(0, 0, 0).bgGreen(`-V ${jsonfy(s)} `));
};


export {
  log,
  warn,
  err,
  succ,
  inf,
  fillSucc
};
