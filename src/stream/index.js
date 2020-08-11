// 测试nodejs stream
const fs = require('fs');
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
