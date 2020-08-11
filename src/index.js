#!/usr/bin/env node
console.log("fumino's first cli");

// 自定义选项处理(自定义函数)
/**
 * 自定义处理
 * @param val 输入
 * @param dummyPrevious 前置输入
 * @returns {*}
 */
function concatString(val,dummyPrevious) {
  return val+dummyPrevious
}

const {program} = require('commander');
const colors = require('colors');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'red',
  info: 'green',
  data: 'blue',
  help: 'cyan',
  warn: 'yellow',
  debug: 'magenta',
  error: 'red'
});

program.version('0.0.1');

// option 提供选项
program
  .option('-n, --res-name', 'get fumino name')
  .option('-a, --age', 'get fumino age')
  // 默认值
  .option('-d, --degree-type <type>', 'set fumino degree','graduated')
  // 布尔值
  .option('--no-hobbies','has hobby?')
  // 可选参数
  .option('-comic --suki-mannga [type]','add loved mannga')

  // 自定义选项处理
  .option('-concat --stringfy <value>','concat string',concatString,'')

  // 必填选项
  .requiredOption('-i --identity <value>','fumino id number')

program.parse(process.argv);
//console.log(process.argv);
// 未使用的参数会被放在 program.args里
if (program.resName) console.log("fumino",program.args);
if (program.age) console.log("24",program.args);
if (program.degreeType) console.log(`fumino's degree is :${program.degreeType}`);

// 可选参数
if (program.sukiMannga===undefined) console.log('no loved mannga.'.yellow); // 不带指令和参数
else if (program.sukiMannga===true) console.log('has loved mannga.'.yellow); // 带comic指令不带参数
else console.log(`loved mannga is : ${program.sukiMannga}`.yellow); // 带comic指令和参数

// 布尔值
const hobby = program.hobbies?'yeah,hobby is anime':'no,no hobby and noob';
console.log(`the hobby status of fumino : ${hobby}`.green);

// 自定义处理
if (program.stringfy !== undefined) console.log(`concat result is : ${program.stringfy}`);

// 必填选项
if (program.identity!==undefined) console.log(`id is ${program.identity}`.error)
else console.log('PLZ INPUT YOUR id THROUGH -i'.error) // 没用





