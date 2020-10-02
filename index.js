'use strict';
global.fs = require('fs');
var mc = require('minecraft-protocol');
global.commandQueue=[];
global.chatQueue=[];
global.chatLogQueue=[];
global.confirmQueue=[];
global.conf = require('./a.json');
global.init = function(){
  var amount = function(dirPath,filter){
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
  
  global.title = function(title)      {process.stdout.write(String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7));}
  global.perms = require('./admins.json');
  global.rev2 = conf.rev;
  global.rev = rev2 + ` [${type}]`;
  if(conf.revision){console.log("Version "+global.rev);title("NCB Version "+global.rev)}
}
global.setup=function(){
  setTimeout(function(){process.exit(0)},conf.restartTimer)
  global.commands={};
  setInterval(function(){global.gc();}, 5000);
  require('./commands/Commands.js')();
  global.lang=require('./bot_helper_scripts/bl/index.js');
  global.rq=require;
  global.readline = require("readline");
  global.c2 = new require("net").Socket().connect(41050, 'localhost', function() {});
  global.mrn = function(o,r,b){return (Math.floor(Math.random()*r)+o).toString(b)};
  global.crypto = require('crypto');
  global.mrr = function(){  var rn = +mrn(2,32,10);  return (mrn(2,rn,rn))};
  global.ran=function(){  return mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()}
  global.rh=function(){var h1 = crypto.createHash('sha512').update(ran()+mrn(0,100,10)+ran()+mrn(0,100,10)+ran()+mrn(0,1000,10)+Date.now()+"").digest('hex');var h2 = crypto.createHash('sha512').update(ran()+mrn(0,100,11)+ran()+mrn(0,10000,20)+ran()+mrn(0,20000,10)+(Date.now()+2000)+"\u001c").digest('hex');var h3 = crypto.createHash('sha512').update(ran()+mrn(0,100,12)+ran()+mrn(0,1000000,30)+ran()+mrn(0,300000,10)+(Date.now()+4000)+"\u001d").digest('hex');global.adminCode = h1+h2+h3}
  rh();
  setTimeout(function(){global.cl=setInterval(chatLogQueueMove,conf.chatLogQueueSpeed)},5000);setTimeout(function(){global.bc=setInterval(chatQueueMove,conf.botChatQueueSpeed)},5000);setTimeout(function(){global.cd=setInterval(cmdQueueMove,conf.commandQueueSpeed)},1000);
  global.chatQueueR=function(t){
    clearInterval(bc);
    setTimeout(function(){bc=setInterval(chatQueueMove,+t)},100);
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
}

global.consoleOnly = conf.consoleOnly;
global.pll = conf.permLevelList;
global.cspyMode=conf.cspyOn;
global.csl=conf.cs;
global.chatPrefix="";
global.cl=0;
global.bc=0;
global.cd=0;
global.LockList = require("./bot_helper_scripts/LockList.js");
global.lockBots = {};
global.on={};
global.fileLogger = conf.fileLoggerOn;
global.consoleLogger = conf.consoleLoggerOn;
global.cmdid=[];
global.adminCode = 0;
global.entityid=0;

vars();
function consolet(){
  if(conf.consoleOn){
    global.rl = readline.createInterface({input: process.stdin,output: process.stdout,prompt: "\x1b[0m\x1b[2m\x1b[37m> "});
    rl.on('line', (line) => {global.command("bb41a64a33fe01fb",line,true,true);rl.prompt(false)});rl.prompt(false)
  }
}

function connectLockBot(uuid){
  try{lockBots[uuid] = mc.createClient({
    host: conf.server,   
    port: conf.port,    
    version: conf.version, 
    username: "\u00a7o\u00a7\u00a7"+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0007"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+"   ",
  });
  global.lclock=true;
  setTimeout(function(){global.lclock=false},4500)
  var name="LOCK"+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16);
  setTimeout(function(){lockBots[uuid].write("chat",{message:'/setblock ~ 15 ~ minecraft:command_block{Command:"/v '+uuid+' off",auto:1b} destroy'})},1500);
  setTimeout(function(){lockBots[uuid].write("chat",{message:"/sudo "+uuid+" username "+name})},2000);
  setTimeout(function(){lockBots[uuid].write("chat",{message:"/execute as "+uuid+" run deop @s[type=player]"})},2500);
  setTimeout(function(){lockBots[uuid].write("chat",{message:"/icu control "+name})},3000);
  }catch(e){
    console.log(e)
  }
}

global.cwc=function(T){
  global.chatQueue.push(T);
}
global.pri = setInterval(function(){global.cwc(conf.chat)},300000)
global.cwc(conf.chat)

var packetc=conf.packetSet;
setInterval(function(){packetc--;if(packetc<=0){process.exit(0)} else if(packetc<=conf.packetCountdown){console.log(packetc)}},1000)
for(var i1b in global.commands){
  global.cmdid.push({name:i1b,h:commands[i1b].h,usage:commands[i1b].u})
}
if(conf.revision){global.cwc("Version "+global.rev)}
global.cwc("/cspy "+["off","on"][+global.cspyMode])
for(var i in conf.run){global.cwc(conf.run[i])}
global.getPerm = function(x){
  if(global.perms[x]!=undefined){
  return +global.perms[x]
  }
  return 0
}
global.command=function(n,d,b1a,C){
  if(!global.consoleOnly || C){
  var c=d.toLowerCase();
  if(commands[c.split(" ")[0]]){
    if(getPerm(n)>=commands[c.split(" ")[0]].perm){
      if(!commands[c.split(" ")[0]].confirm || b1a){
        commands[c.split(" ")[0]].command(d,n,C);
        return 0;
      } else {
        confirmQueuePush(d,n)
        return 1;
      }
    }
  }
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
global.chatQueueMove = function(){
  if(chatQueue[0]!=undefined){
  client.write("chat",{message: chatQueue[0]+""});
  chatQueue.shift();
  }
  return 0;
}

global.confirmQueueMove = function(hash){
  if(hash == global.adminCode){
    command(confirmQueue[0].perm,confirmQueue[0].cmd,true);
    confirmQueue.shift();
    rh();
  }
  return 0;
}
global.confirmQueuePush = function(command,perm){
  confirmQueue.push({cmd:command,perm:perm})
  global.cwc(csl[0]+"Are you sure you want to run \""+csl[1]+"|"+command.slice(0,75)+csl[0]+"\"? Type \""+csl[1]+"|confirm <CONSOLE-CODE>"+csl[0]+"\" to confirm.")
}

global.getDateAndTime4L=function(){
  var fw = new Date();
  return "["+fw.getUTCDate()+"."+(fw.getUTCMonth()+1)+"."+fw.getUTCFullYear()+" "+fw.getUTCHours()+":"+fw.getUTCMinutes()+":"+fw.getUTCSeconds()+":"+fw.getUTCMilliseconds()+"]";
}
global.p={};
global.on={};
global.leave=false;


global.CD=function(n,c){
  if(c=="clearcmdq"||c.split(" ")[0]=="confirm"){
    global.commandQueue[0]={n:n,c:c};return;
  }
  fs.appendFile('Command Log.txt',getDateAndTime4L()+" \""+n+"\" ran command: \""+c+"\"\n",function (err) {  if (err) throw err;  });
  global.commandQueue.push({n:n,c:c})

};var CD=function(s,h){global.CD(s,h)}
global.events=function(){
client.on('player_info', require("./bot_helper_scripts/PlayerInfoE.js"))
client.on('kick_disconnect', function(packet) {
  console.log(lang.tth(JSON.parse(packet.reason.split("\n").join("\\n"))))
  setTimeout(function(){process.exit(0)},2000)
})
client.on('tab_complete', function(packet) {
  global.cwc(global.csl[0]+"Results: "+global.csl[1]+packet.matches.length)
  for(var i5a in packet.matches){
    global.cwc(global.csl[1]+packet.matches[i5a].match)
  }
})
client.on('login', function(packet) {
  if(packet.entityId){global.entityid=packet.entityId}
})
client.on('entity_status', function(packet) {
  if(packet.entityId==global.entityid && packet.entityStatus == 24){
    global.cwc("/op @s[type=player]")
  }
})
client.on('chat', function(packet) {
  if(!global.destroyed){
  var jsonMsg = JSON.parse(packet.message);
  var name;
  var nf=0;
  if(jsonMsg.extra){
    for(var i2a in jsonMsg.extra){
      if(jsonMsg.extra[i2a]){
        if(jsonMsg.extra[i2a].text){
          if(jsonMsg.extra[i2a].text.slice(0,2)==": "){
            if(jsonMsg.extra[i2a-1]){
              name = jsonMsg.extra[i2a-1].text;
              break
            }
          }
        }
      }
    };
    nf=1;
  }
  if(!nf){
  if(jsonMsg.translate) {
    if(jsonMsg.translate.startsWith("chat.type.")) {
      try{
        name = jsonMsg.with[0].text+"";
        if(jsonMsg.with[1].text){
          text2 = jsonMsg.with[1].text+"";
        } else {
          text2 = jsonMsg.with[1]+"";
        }
      }catch(e){};
  }}}
  if(lang.tth(jsonMsg)[0]==undefined){return;}
  var processed = lang.tth(jsonMsg)[0];
  var fileprocessed = lang.tth(jsonMsg)[1];
  var ir = lang.tth(jsonMsg)[2];
  var preText = ir.split(": ");
  var pt2 = preText[0]
  var preTextFirst = preText.shift();
  if(text2==undefined){ var text2 = preText.join(": ");}
  if(text2.charAt(0)=="|"){
    CD(name,text2.slice(1));
  }
  if(ir.endsWith("disabled")){
    if((ir.indexOf("Vanish for")!=-1)&&ir.indexOf("Vanish for")<=3){
      cwc("/evanish on")
    }
  }
  if(ir.startsWith("Your nickname is now ")){
    cwc("/nick off")
  }
  if(ir.startsWith("Successfully "+["enabled","disabled"][+global.cspyMode]+" CommandSpy")){
    global.cwc("/cspy "+["off","on"][global.cspyMode])
  }
  if(global.fileLogger){
  fs.appendFile('Kaboom Log.txt',getDateAndTime4L()+" "+(fileprocessed+"\n"),function (err) {  if (err) throw err;  });
  }
  if(global.consoleLogger){
  chatLogQueue.push("\x1b[0m\x1b[1m\x1b[37m"+processed);
  }
  return;
  }
});
client.on('packet', function (data, meta) {packetc=conf.packetSet;})
}

global.run=function(){
  init();
  setup();
  consolet();
  connect();
  events();
}

run();