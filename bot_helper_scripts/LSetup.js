module.exports=()=>{
  global.RST=setTimeout(()=>{process.exit(0)},conf.restartTimer)
  global.commands={};global.p={};
  global.GCI=setInterval(()=>{global.gc();if(process.memoryUsage().heapUsed>=690000000){global.cwc("Not enough memory is available to continue, restarting...");setTimeout(function(){process.exit(2)},700);return}}, 5000);
  global.lang=require(bhs+'bl/index.js');
  global.rq=require;
  global.readline = require("readline");
  if(!global.c2){global.c2 = new require("net").Socket().connect(41050, 'localhost',()=>{});}

  setTimeout(()=>{global.cl=setInterval(chatLogQueueMove,conf.chatLogQueueSpeed)},5000);
  setTimeout(()=>{if(!chatQueueInit){chatQueueMove()}},4000);
  setTimeout(()=>{global.cd=setInterval(cmdQueueMove,conf.commandQueueSpeed)},1000);

  global.chatQueueR=(t)=>{
    global.chatQueueSpeed=t
    cwc("Chat speed set to "+t+"ms.")
  }
}