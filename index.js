console.log("Loading...");
'use strict';
global.fs = require('fs');global.conf = require('./a.json');
exit=(v)=>{if(v){console.log("Done");process.exit(0)}}
global.mc = require('minecraft-protocol');const admin = require('is-elevated');
(async()=>{exit(await admin())})();
global.commandQueue=[];global.chatQueue=[];global.chatLogQueue=[];global.confirmQueue=[];
global.chatQueueSpeed = conf.botChatQueueSpeed;
global.init = function(){
  global.moduleDetector=global.perms = require('./bot_helper_scripts/ModuleDetector.js'); moduleDetector("mineflayer",true,()=>{});
  global.amount = (dirPath,filter)=>{
    var files2 = fs.readdirSync(dirPath)
    var files=[];
    files2.forEach(function(f){
      if(f.startsWith(filter)){files.push(f)}
    })
    return files.length;
  }
  global.realRev = amount("nppBackup","index.js")+amount("commands/nppBackup","Command")+amount("bot_helper_scripts/nppBackup","")
  console.log("Revision "+realRev)
  global.type=["Debug","Normal"][+conf.isNormal]
  global.title = (title)=>{process.stdout.write(String.fromCharCode(27)+"]0;"+title+String.fromCharCode(7));}
  global.perms = require('./admins.json');
  global.rev2 = conf.rev;
  global.rev = rev2 + ` [${type}]`;
  if(conf.revision){console.log("Version "+global.rev);title("NCB Version "+global.rev)}
}
global.setup=function(){
  setTimeout(function(){process.exit(0)},conf.restartTimer)
  global.commands={};global.p={};
  setInterval(function(){global.gc();}, 5000);
  require('./commands/Commands.js')();
  global.lang=require('./bot_helper_scripts/bl/index.js');
  global.rq=require;
  global.readline = require("readline");
  global.crypto = require('crypto');
  global.c2 = new require("net").Socket().connect(41050, 'localhost', function() {});
  global.mrn = function(o,r,b){return (Math.floor(Math.random()*r)+o).toString(b)};
  global.mrr = function(){  var rn = +mrn(2,32,10);  return (mrn(2,rn,rn))};
  global.ran=function(){  return mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()}
  global.rh=function(){var h1 = crypto.createHash('sha512').update(ran()+mrn(0,100,10)+ran()+mrn(0,100,10)+ran()+mrn(0,1000,10)+Date.now()+"").digest('hex');var h2 = crypto.createHash('sha512').update(ran()+mrn(0,100,11)+ran()+mrn(0,10000,20)+ran()+mrn(0,20000,10)+(Date.now()+2000)+"\u001c").digest('hex');var h3 = crypto.createHash('sha512').update(ran()+mrn(0,100,12)+ran()+mrn(0,1000000,30)+ran()+mrn(0,300000,10)+(Date.now()+4000)+"\u001d").digest('hex');global.adminCode = h1+h2+h3}
setTimeout(function(){global.cl=setInterval(chatLogQueueMove,conf.chatLogQueueSpeed)},5000);setTimeout(function(){chatQueueMove()},4000)  ;setTimeout(function(){global.cd=setInterval(cmdQueueMove,conf.commandQueueSpeed)},1000);
  rh();
  global.chatQueueR=function(t){
    clearInterval(bc);
    global.chatQueueSpeed=t
    cwc("Chat speed set to "+t+"ms.")
  }
}
global.connect=function(){
  global.client = mc.createClient({
    host: conf.server,   
    port: conf.port,    
    version: conf.version, 
    username: "\u00a7"+Math.floor(Math.random()*16).toString(16)+"\u00a7\u00a7"+["\u0000","\u0001","\u0002","\u0003","\u0004","\u0005","\u0006","\u0007"][Math.floor(Math.random()*8)]+["\u0008","\u0009","\u007f","\u000b","\u000c","\u000d","\u000e","\u000f"][Math.floor(Math.random()*8)]+["\u0010","\u0011","\u0012","\u0013","\u0014","\u0015","\u0016","\u0017"][Math.floor(Math.random()*8)]+["\u0018","\u0019","\u001a","\u001b","\u001c","\u001d","\u001e","\u001f"][Math.floor(Math.random()*8)]+"   ",
  });
  const states = mc.states
const srv = mc.createServer({'online-mode': false,port: 40000,keepAlive: false,'max-players': 2})
srv.on('login', function (cliet) {
	setTimeout(function(){cliet.write("position_look",{x:global.position.x,y:global.position.y,z:global.position.z,yaw:0,pitch:0,onGround:true})},1000)
  let endedClient = false
  let endedTargetClient = false
  cliet.on('end', function () {
    endedClient = true
  })
  cliet.on('error', function (err) {
    endedClient = true
  })
  cliet.on('packet', function (data, meta) {
    if (client.state === states.PLAY && meta.state === states.PLAY) {
      if (!endedTargetClient) { client.write(meta.name, data) }
    }
  })
  client.on('packet', function (data, meta) {
    if (meta.state === states.PLAY && cliet.state === states.PLAY) {
      if (!endedClient) {
        cliet.write(meta.name, data)
        if (meta.name === 'set_compression') {
          cliet.compressionThreshold = data.threshold
        } 
      }
    }
  })
  client.on('kick_disconnect', function (gt) {
    endedTargetClient = true
    if (!endedClient) { cliet.end(gt.reason) }
  })
  client.on('end', function () {
    endedTargetClient = true
    if (!endedClient) { cliet.end('End') }
  })
  client.on('error', function (err) {
    endedTargetClient = true
    if (!endedClient) { cliet.end('Error') }
  })
})
}
global.setup2=function(){
global.consoleOnly = conf.consoleOnly; global.fileLogger = conf.fileLoggerOn; global.consoleLogger = conf.consoleLoggerOn; global.pll = conf.permLevelList; global.cspyMode=conf.cspyOn; global.csl=conf.cs; global.prefix=conf.prefix;
global.cl=0; global.bc=0; global.cd=0; global.adminCode = 0; global.entityid=0;
global.LockList = require("./bot_helper_scripts/LockList.js");
global.lockBots = {}; global.on={}; global.cmdid=[];
global.consolet=function(){
  global.rl = readline.createInterface({input: process.stdin,output: process.stdout,prompt: "\x1b[0m\x1b[2m\x1b[37m> "});
  rl.on('line', (line) => {global.command("bb41a64a33fe01fb",line,true,true);rl.prompt(false)});rl.prompt(false)
}

global.connectLockBot=require("./bot_helper_scripts/lock.js")

global.cwc=function(T){global.chatQueue.push(T)}
global.pri = setInterval(function(){global.cwc(conf.chat.split("%prefix%").join(global.prefix))},conf.chatInterval);global.cwc(conf.chat.split("%prefix%").join(global.prefix))

global.packetc=conf.packetSet;
setInterval(function(){packetc--;if(packetc<=0){process.exit(0)} else if(packetc<=conf.packetCountdown){console.log(packetc)}},1000)
for(var i1b in global.commands){global.cmdid.push({name:i1b,h:commands[i1b].h,usage:commands[i1b].u})}
if(conf.revision){global.cwc("Version "+global.rev)}
global.cwc("/cspy "+["off","on"][+global.cspyMode])
for(var i in conf.run){global.cwc(conf.run[i])}
global.getPerm = function(x){if(global.perms[x]!=undefined){return +global.perms[x]};return 0}

global.command=(n,d,b1a,C)=>{
  if(!global.consoleOnly || C || getPerm(n)==11){
  var c=d.toLowerCase();
  if(commands[c.split(" ")[0]]){if(commands[c.split(" ")[0]].console && !(C || getPerm(n)==11)){cwc(`/bc &r${global.prefix}${c.split(" ")[0]} may only be run from console.`)}else{
    if(getPerm(n)>=commands[c.split(" ")[0]].perm){
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
global.cmdQueueMove = function(){
  if(commandQueue[0]!=undefined){
    command(commandQueue[0].n,commandQueue[0].c,false,false);
    commandQueue.shift();
  }
  return 0;
}
global.chatLogQueueMove = function(){if(!global.destroyed){
  if(chatLogQueue[0]!=undefined){
    c2.write("\u0001"+chatLogQueue[0]);
    chatLogQueue.shift();
}}
  return 0;
}
global.chatQueueMove = ()=>{
  if(chatQueue[0]!=undefined){client.write("chat",{message: chatQueue[0]+""});chatQueue.shift();}
  setTimeout(global.chatQueueMove,global.chatQueueSpeed)
  return 0;
}

global.confirmQueueMove = function(h){
  if(h == global.adminCode){
    command(confirmQueue[0].perm,confirmQueue[0].cmd,true);
    confirmQueue.shift();
    rh();
  }
  return 0;
}
global.confirmQueuePush=require("./bot_helper_scripts/cnqm.js")
global.getDateAndTime4L=require("./bot_helper_scripts/date.js")
global.CD=require("./bot_helper_scripts/commandPush.js");
}
global.events=function(){
global.playerInfo=require("./bot_helper_scripts/PlayerInfoE.js"); global.ChatE=require("./bot_helper_scripts/ChatE.js");
client.on('player_info', global.playerInfo)
client.on('kick_disconnect', p=>{console.log(lang.tth(JSON.parse(p.reason.split("\n").join("\\n"))));setTimeout(function(){process.exit(0)},2000)})
client.on('tab_complete', p=>{global.cwc(global.csl[0]+"Results: "+global.csl[1]+p.matches.length);for(var i5a in p.matches){global.cwc(global.csl[1]+p.matches[i5a].match)}})
client.on('login', p=>{if(p.entityId){global.entityid=p.entityId}})
client.on('entity_status', p=>{if(p.entityId==global.entityid && p.entityStatus == 24){global.cwc("/op @s[type=player]")}})
client.on('position', p=>{global.position=p;})
client.on('chat', ChatE);
client.on('packet', (data, meta)=>{packetc=conf.packetSet;})
}

require("./run.js")()
