module.exports=()=>{
global.consoleOnly = conf.consoleOnly; global.fileLogger = conf.fileLoggerOn; global.consoleLogger = conf.consoleLoggerOn; global.pll = conf.permLevelList; global.cspyMode=conf.cspyOn; global.csl=conf.cs; global.prefix=conf.prefix;
global.cl=0; global.cd=0;global.entityid=0;
global.LockList = require(bhs+"LockList.js");
global.lockBots = {}; global.on={}; global.cmdid=[];
global.consolet=require(bhs+"Console.js")
global.connectLockBot=require(bhs+"lock.js")
global.cwc=T=>{global.chatQueue.push(T)}
global.pri = setInterval(()=>{global.cwc(conf.chat.split("%prefix%").join(global.prefix))},conf.chatInterval);global.cwc(conf.chat.split("%prefix%").join(global.prefix))
global.packetc=conf.packetSet;
global.pki = setInterval(()=>{packetc--;if(packetc<=0){process.exit(0)} else if(packetc<=conf.packetCountdown){console.log(packetc)}},1000)
for(var i1b in global.commands){global.cmdid.push({name:i1b,h:commands[i1b].h,usage:commands[i1b].u})}
if(conf.revision){global.cwc("Version "+global.rev)}
global.cwc("/cspy "+["off","on"][+global.cspyMode])
for(var i in conf.run){global.cwc(conf.run[i])}
global.getPerm=x=>{if(global.perms[x]!=undefined){return +global.perms[x]};return 0}
global.command=(n,d,b1a,C)=>{
var c=d.toLowerCase();
if(process.memoryUsage().heapUsed>=650000000 && c.split(" ")[0]!="eval" && c.split(" ")[0]!="logger" && c.split(" ")[0]!="clearcmdq" && c.split(" ")[0]!="restart" ){if(C){console.log("Not enough memory available to run command")}else{global.cwc("Not enough memory available to run command")};return}
  if(!global.consoleOnly || C || getPerm(n)==11){
  if(commands[c.split(" ")[0]]){if(commands[c.split(" ")[0]].console && !(C || getPerm(n)==11)){cwc(`/bc &r${global.prefix}${c.split(" ")[0]} may only be run from console.`)}else{
    if(getPerm(n)>=commands[c.split(" ")[0]].perm || C || getPerm(n)==11){
      if(!commands[c.split(" ")[0]].confirm || b1a || C || getPerm(n)==11){
        commands[c.split(" ")[0]].command(d,n,C || getPerm(n)==11);
        return 0;
      } else {
        confirmQueuePush(d,n)
        return 1;
      }
    }
  }}
  }
  return 79;
}
global.cmdQueueMove=()=>{
  if(commandQueue[0]!=undefined){
    command(commandQueue[0].n,commandQueue[0].c,false,false);
    commandQueue.shift();
  }
  return 0;
}
global.chatLogQueueMove=()=>{
  if(chatLogQueue[0]!=undefined){
    c2.write("\u0001"+chatLogQueue[0]);
    chatLogQueue.shift();
  }
  return 0;
}
global.chatQueueInit=false;
global.chatQueueMove=()=>{
  global.chatQueueInit=true;
  if(chatQueue[0]!=undefined){client.write("chat",{message: chatQueue[0]+""});chatQueue.shift();}
  global.CQT=setTimeout(global.chatQueueMove,global.chatQueueSpeed)
  return 0;
}
global.confirmQueueMove=(h)=>{
  if(h == global.adminCode){
    command(confirmQueue[0].perm,confirmQueue[0].cmd,true);
    confirmQueue.shift();
    rh();
  }
  return 0;
}
global.confirmQueuePush=require(bhs+"cnqm.js")
global.getDateAndTime4L=require(bhs+"date.js")
global.CD=require(bhs+"commandPush.js");
}