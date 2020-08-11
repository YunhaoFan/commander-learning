// 测试nodejs stream
const fs = require('fs');
const zlib = require('zlib');

let data = '';

// 创建可读流
const readerStream = fs.createReadStream('input.txt');
// 设置编码为utf8
readerStream.setEncoding('UTF8');
// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
  data += chunk;
});
readerStream.on('end',function(){
  console.log(data);
});
readerStream.on('error', function(err){
  console.log(err.stack);
});
console.log("程序执行完毕");
const writeData  = 'written fumino!';
//-------------------------------------------------------------------------
// 创建一个可以写入的流，写入到文件 output.txt 中
const writerStream = fs.createWriteStream('output.txt');
// 使用 utf8 编码写入数据
writerStream.write(writeData,'UTF8');
// 标记文件末尾
writerStream.end();
// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
  console.log("写入完成。");
});
writerStream.on('error', function(err){
  console.log(err.stack);
});
console.log("程序执行完毕");
//-------------------------------------------------------------------------
// 创建一个可读流
const readerStream2 = fs.createReadStream('input2.txt');
// 创建一个可写流
const writerStream2 = fs.createWriteStream('output.txt');
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream2.pipe(writerStream2);
console.log("程序执行完毕");
//-------------------------------------------------------------------------
// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input2.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input2.txt.gz'));

console.log("文件压缩完成。");

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input2.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input2.txt'));

console.log("文件解压完成。");

//-------------------------------------------------------------------------
// 将com1写入com2不覆盖
const comOne = fs.createReadStream('comOne.txt');
// 添加参数append(需要特殊操作的时候查看配置文档)
const comTwo = fs.createWriteStream('comTwo.txt',{flags:'a'});

comOne.pipe(comTwo);
console.log('追加完毕')
