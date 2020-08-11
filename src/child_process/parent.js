// 父进程
const cp = require('child_process');
const child = cp.fork('./child.js');
child.on('message',function (msg) {
  console.log(`the message is ${msg}.`);
  // 切断进程通信
  child.disconnect();
});
child.send('fffumino');
console.log(process.pid)

