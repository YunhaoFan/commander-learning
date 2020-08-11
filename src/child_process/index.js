// child process使用
const cp = require('child_process');
const fs = require('fs');
//const iconv = require('iconv-lite');
//const encoding = 'cp936';

// exec 执行的是shell命令/bat命令
cp.exec('echo this is exec,exec a command',
  (err,stdout,stderr)=>{
  console.log(stdout)
})
// execFile 执行的是非node应用，执行结果以回调函数返回
cp.execFile('winEcho.bat',[1,'rm -rf'],
  (err,stdout,stderr)=>{
    console.log(stdout);
});

// 安全性分析 spawn fork execFile都不能直接执行shell/bat
// 会先进行安全性分析

//---------------------------------------------------------------------
// spawn 也是执行非node应用，以流的形式输出
const SpawnOutStream = cp.spawn('testSpawn.bat',[1,2,3]);
const SpawnInStream = fs.createWriteStream('spawn.txt');

SpawnOutStream.stdout.setEncoding("UTF8");

SpawnOutStream.stdout.on('data',function(chunk){
  console.log(chunk);
  console.log(SpawnOutStream.stdout)
})
//---------------------------------------------------------------------
// fork 执行node应用 child.js parent.js

