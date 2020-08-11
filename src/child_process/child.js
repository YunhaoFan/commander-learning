// 子进程
process.on('message',function (msg) {
  process.send(msg);
});
console.log(process.pid)
