console.log("Loading...");
'use strict';
global.bhs="./bot_helper_scripts/"
global.fs = require('fs');global.conf = require('./a.json');
exit=(v)=>{if(v){console.log("Done");process.exit(0)}}
global.mc = require('minecraft-protocol');const admin = require('is-elevated');
(async()=>{exit(await admin())})();
global.commandQueue=[];global.chatQueue=[];global.chatLogQueue=[];global.confirmQueue=[];
global.chatQueueSpeed = conf.botChatQueueSpeed;
global.init = ()=>{
	  global.rh=require(bhs+'Hash.js');
   global.adminCode = 0; global.adminCode=rh();
  global.moduleDetector=global.perms = require(bhs+'ModuleDetector.js'); moduleDetector("mineflayer",true,()=>{});
  global.amount = (dirPath,filter)=>{
    var files2 = fs.readdirSync(dirPath)
    var files=[];
    files2.forEach((f)=>{
      if(f.startsWith(filter)){files.push(f)}
    })
    return files.length;
  }
  global.realRev = amount("nppBackup","index.js")+amount("commands/nppBackup","Command")+amount(bhs+"nppBackup","")
  console.log("Revision "+realRev)
  global.type=["Debug","Normal"][+conf.isNormal]
  global.title = (title)=>{process.stdout.write(String.fromCharCode(27)+"]0;"+title+String.fromCharCode(7));}
  global.perms = require('./admins.json');
  global.rev2 = conf.rev;
  global.rev = rev2 + ` [${type}]`;
  if(conf.revision){console.log("Version "+global.rev);title("NCB Version "+global.rev)}
}
global.setup=()=>{
  setTimeout(()=>{process.exit(0)},conf.restartTimer)
  global.commands={};global.p={};
  setInterval(()=>{global.gc();}, 5000);
  require('./commands/Commands.js')();
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
global.connect=()=>{
  global.client = mc.createClient({
    host: conf.server,   
    port: conf.port,    
    version: conf.version, 
    username: "\u00a7"+Math.floor(Math.random()*16).toString(16)+"\u00a7\u00a7"+["\u0000","\u0001","\u0002","\u0003","\u0004","\u0005","\u0006","\u0007"][Math.floor(Math.random()*8)]+["\u0008","\u0009","\u007f","\u000b","\u000c","\u000d","\u000e","\u000f"][Math.floor(Math.random()*8)]+["\u0010","\u0011","\u0012","\u0013","\u0014","\u0015","\u0016","\u0017"][Math.floor(Math.random()*8)]+["\u0018","\u0019","\u001a","\u001b","\u001c","\u001d","\u001e","\u001f"][Math.floor(Math.random()*8)]+"   ",
  });
}
global.setup2=()=>{
global.consoleOnly = conf.consoleOnly; global.fileLogger = conf.fileLoggerOn; global.consoleLogger = conf.consoleLoggerOn; global.pll = conf.permLevelList; global.cspyMode=conf.cspyOn; global.csl=conf.cs; global.prefix=conf.prefix;
global.cl=0; global.bc=0; global.cd=0;global.entityid=0;
global.LockList = require(bhs+"LockList.js");
global.lockBots = {}; global.on={}; global.cmdid=[];
global.consolet=require(bhs+"Console.js")
global.connectLockBot=require(bhs+"lock.js")
global.cwc=T=>{global.chatQueue.push(T)}
global.pri = setInterval(()=>{global.cwc(conf.chat.split("%prefix%").join(global.prefix))},conf.chatInterval);global.cwc(conf.chat.split("%prefix%").join(global.prefix))
global.packetc=conf.packetSet;
setInterval(()=>{packetc--;if(packetc<=0){process.exit(0)} else if(packetc<=conf.packetCountdown){console.log(packetc)}},1000)
for(var i1b in global.commands){global.cmdid.push({name:i1b,h:commands[i1b].h,usage:commands[i1b].u})}
if(conf.revision){global.cwc("Version "+global.rev)}
global.cwc("/cspy "+["off","on"][+global.cspyMode])
for(var i in conf.run){global.cwc(conf.run[i])}
global.getPerm=x=>{if(global.perms[x]!=undefined){return +global.perms[x]};return 0}
global.command=(n,d,b1a,C)=>{
  if(!global.consoleOnly || C || getPerm(n)==11){
  var c=d.toLowerCase();
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
global.chatQueueMove=()=>{
  if(chatQueue[0]!=undefined){client.write("chat",{message: chatQueue[0]+""});chatQueue.shift();}
  setTimeout(global.chatQueueMove,global.chatQueueSpeed)
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
global.pt=a=>{var b=a;delete b.flags;delete b.teleportId;b.onGround=true;return b}
global.events=function(){
global.playerInfo=require(bhs+"PlayerInfoE.js"); global.ChatE=require(bhs+"ChatE.js");
client.on('player_info', global.playerInfo)
client.on('kick_disconnect', p=>{console.log(lang.tth(JSON.parse(p.reason.split("\n").join("\\n"))));setTimeout(function(){process.exit(0)},2000)})
client.on('tab_complete', p=>{global.cwc(global.csl[0]+"Results: "+global.csl[1]+p.matches.length);for(var i5a in p.matches){global.cwc(global.csl[1]+p.matches[i5a].match)}})
client.on('login', p=>{if(p.entityId){global.entityid=p.entityId}})
client.on('position', p=>{global.position=p;/*if(global.pa){global.pa=true;client.write("teleport_confirm",{teleportId:(p.teleportId?p.teleportId:0)});client.write("position_look",global.pt(position))}*/})
client.on('entity_status', p=>{if(p.entityId==global.entityid && p.entityStatus == 24){global.cwc("/op @s[type=player]")}})
client.on('chat', ChatE);
client.on('packet', (data, meta)=>{packetc=conf.packetSet;})
}

require("./run.js")()