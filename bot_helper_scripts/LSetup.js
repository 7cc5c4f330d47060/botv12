module.exports=()=>{
  setTimeout(()=>{process.exit(0)},conf.restartTimer)
  global.commands={};global.p={};
  setInterval(()=>{global.gc();}, 5000);
  require('../commands/Commands.js')();
  global.lang=require(bhs+'bl/index.js');
  global.rq=require;
  global.readline = require("readline");
  global.c2 = new require("net").Socket().connect(41050, 'localhost',()=>{});

  setTimeout(()=>{global.cl=setInterval(chatLogQueueMove,conf.chatLogQueueSpeed)},5000);
  setTimeout(()=>{chatQueueMove()},4000);
  setTimeout(()=>{global.cd=setInterval(cmdQueueMove,conf.commandQueueSpeed)},1000);

  global.chatQueueR=(t)=>{
    global.chatQueueSpeed=t
    cwc("Chat speed set to "+t+"ms.")
  }
}