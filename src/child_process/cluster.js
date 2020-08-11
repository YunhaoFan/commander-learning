// cluster模块 cpu进程负载均衡集成模块
const cluster = require('cluster');
const http = require('http');
const cpuNums = require('os').cpus().length;

if (cluster.isMaster){
  console.log(`主进程${process.pid}正在运行`);

  // 派生其他进程
  for (let i = 0; i<cpuNums;i++){
    cluster.fork()
  }

  cluster.on('exit',function (worker,code,signal) {
    console.log(`工作进程${worker.process.pid}已退出`)
  });
}else {
  // 工作进程可以共享任何tcp连接 这里共享整个HTTP服务器
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Fumino done.');
  }).listen(8000);

  console.log(`工作进程${process.pid}已启动`)
}
