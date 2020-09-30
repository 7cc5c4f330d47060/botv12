'use strict';
global.conf = require('./a.json');
global.consoleOnly = conf.consoleOnly;global.pll = conf.permLevelList;
global.cspyMode=conf.cspyOn;
global.csl=conf.cs;
var amount = function(dirPath,filter){
  var files2 = fs.readdirSync(dirPath)
  var files=[];
  files2.forEach(function(f){
	  if(f.startsWith(filter)){files.push(f)}
  })
  return files.length;
}
const realRev = amount("nppBackup","index.js")+amount("commands/nppBackup","Command")+amount("bot_helper_scripts/nppBackup","")
console.log("Revision "+realRev)
setTimeout(function(){process.exit(0)},conf.restartTimer)
var mc = require('minecraft-protocol');
var fs = require('fs');
const LockList = require("./bot_helper_scripts/LockList.js");
global.title = function(title)			{process.stdout.write(String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7));}
const type=["Debug","Normal"][+conf.isNormal]
const rev2 = "Beta";
const rev = rev2 + ` [${type} Mode]`;
var crypto = require('crypto');
if(conf.revision){console.log("Version "+rev);title("NCB Version "+rev)}
global.perms = require('./admins.json');
var lang = require('./bot_helper_scripts/bl/index.js');
global.commands={};
setInterval(function(){global.gc();}, 5000);
require('./commands/Commands.js')();
global.lang=lang;
global.chatPrefix="";global.cl=0;global.bc=0;global.cd=0;global.rq=require;
const readline = require("readline");
global.c2 = new require("net").Socket().connect(41050, 'localhost', function() {});
const rl = readline.createInterface({input: process.stdin,output: process.stdout,prompt: "\x1b[0m\x1b[1m\x1b[37m> "});
rl.on('line', (line) => {command("bb41a64a33fe01fb",line,true,true);rl.prompt(false)});rl.prompt(false)
global.adminCode = 0;
var mrn = function(o,r,b){return (Math.floor(Math.random()*r)+o).toString(b)}
var mrr = function(){	var rn = +mrn(2,32,10);	return (mrn(2,rn,rn))};var ran=function(){	return mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()}
global.confirm=function(){	confirmQueueMove(adminCode);};setTimeout(function(){global.cl=setInterval(chatLogQueueMove,conf.chatLogQueueSpeed)},5000);setTimeout(function(){global.bc=setInterval(chatQueueMove,conf.botChatQueueSpeed)},5000);setTimeout(function(){global.cd=setInterval(cmdQueueMove,conf.commandQueueSpeed)},1000);
global.chatQueueR=function(t){clearInterval(bc);setTimeout(function(){bc=setInterval(chatQueueMove,+t)},100);cwc("Chat speed set to "+t+"ms.")}
var rh=function(){var h1 = crypto.createHash('sha512').update(ran()+mrn(0,100,10)+ran()+mrn(0,100,10)+ran()+mrn(0,1000,10)+Date.now()+"").digest('hex');var h2 = crypto.createHash('sha512').update(ran()+mrn(0,100,11)+ran()+mrn(0,10000,20)+ran()+mrn(0,20000,10)+(Date.now()+2000)+"\u001c").digest('hex');var h3 = crypto.createHash('sha512').update(ran()+mrn(0,100,12)+ran()+mrn(0,1000000,30)+ran()+mrn(0,300000,10)+(Date.now()+4000)+"\u001d").digest('hex');global.adminCode = h1+h2+h3}
setTimeout(rh,800);
global.client = mc.createClient({
  host: conf.server,   
  port: conf.port,    
  version: conf.version, 
  username: "\u00a7"+Math.floor(Math.random()*16).toString(16)+"\u00a7\u00a7"+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+"   ",
});
global.lockBots = {};
global.on={};
function connectLockBot(uuid){
	try{lockBots[uuid] = mc.createClient({
		host: conf.server,   
		port: conf.port,    
		version: conf.version, 
		username: "\u00a7o\u00a7\u00a7"+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+"   ",
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
global.commandQueue=[];
global.chatQueue=[];
global.chatLogQueue=[];
global.confirmQueue=[];
global.loggerEnable = true;

var cwc=function(T){
	if(!global.destroyed){
	if(T.startsWith("/")){
	chatQueue.push(T.split("\u00a7").join(""));
	} else {
		chatQueue.push(global.chatPrefix+T.split("\u00a7").join(""));
	}
	}
	
}
global.cwc=function(T){
	chatQueue.push(T.split("\u00a7").join(""));
}
global.pri = setInterval(function(){global.cwc("Say |help page <PAGE> in chat for a list of commands on a page and say |help usage <COMMAND> for more detail on a command.")},300000)
global.cwc("Say |help page <PAGE> in chat for a list of commands on a page and say |help usage <COMMAND> for more detail on a command.")

global.cmdid=[];
var packetc=60;
client.on('packet', function (data, meta) {packetc=60;})
setInterval(function(){packetc--;if(packetc<=0){process.exit(0)} else if(packetc<=35){console.log(packetc)}},1000)

for(var i1b in global.commands){
	global.cmdid.push({name:i1b,h:commands[i1b].h,usage:commands[i1b].u})
		}
var numcir=0;
var rad2deg = function(radians){
	return radians * (180/3.14159265358979323846264338);}
var fewwfea=false;
if(conf.revision){cwc("Version "+rev)}
global.cwc("/cspy "+["off","on"][+global.cspyMode])
cwc("/evanish on")
cwc("/team leave @s")
cwc("/email clear")
cwc("/prefix off")
cwc("/nick off")
cwc("/save-off")
cwc("/gmsp")
cwc("/god on")

setTimeout(function(){client.write("settings",{locale:"en_us",viewDistance:6,chatFlags:0,chatColors:!!1,mainHand:0,skinParts:255})},1500)

global.getPerm = function(x){
	if(global.perms[x]!=undefined){
	return +global.perms[x]
	console.log(global.perms[x])
	}
	return 0
}
function command(n,d,b1a,C){
	if(!global.consoleOnly || C){
	if(!global.destroyed){
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
	return 3;
	}
	return 14;
	}
	return 79;
}
global.cmdQueueMove = function(){
	if(!global.destroyed){
	if(commandQueue[0]!=undefined){
		command(commandQueue[0].n,commandQueue[0].c,false,false);
		commandQueue.shift();
	}}
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
	if(!global.destroyed){
	if(chatQueue[0]!=undefined){
	client.write("chat",{message: chatQueue[0]+""});
	chatQueue.shift();
	}
	return 0;
	}
}

global.confirmQueueMove = function(hash){
	if(!global.destroyed){
	if(hash == global.adminCode){
		command(confirmQueue[0].perm,confirmQueue[0].cmd,true);
		confirmQueue.shift();
		rh();
	}
	return 0;
	}
}
var confirmQueuePush = function(command,perm){
	if(!global.destroyed){
	confirmQueue.push({cmd:command,perm:perm})
	global.cwc(csl[0]+"Are you sure you want to run \""+csl[1]+"|"+command.slice(0,75)+csl[0]+"\"? Type \""+csl[1]+"|confirm <CONSOLE-CODE>"+csl[0]+"\" to confirm.")
	}
}

var getDateAndTime4L=function(){
	var fw = new Date();
	return "["+fw.getUTCDate()+"."+(fw.getUTCMonth()+1)+"."+fw.getUTCFullYear()+" "+fw.getUTCHours()+":"+fw.getUTCMinutes()+":"+fw.getUTCSeconds()+":"+fw.getUTCMilliseconds()+"]";
}
var nss=function(d){
	return d.split("\u00a7").join("\\u00a7")
}
var tad=0;
client.on('title', function(packet) {
	if(!tad){
	if(packet.action==2){
		setTimeout(function(){tad=1;},1);
		setTimeout(function(){client.write("chat",{message: "/title @a actionbar \"\""});},3);setTimeout(function(){tad=0},900);return;
	}
	}
	if(packet.action<=3 && packet.action!=2){
		client.write("chat",{message: "/title @a clear"});
	}
});
client.on('kick_disconnect', function(packet) {
	console.log(lang.tth(JSON.parse(packet.reason.split("\n").join("\\n"))))
	setTimeout(function(){process.exit(0)},2000)
})
client.on('tab_complete', function(packet) {
	cwc(csl[0]+"Results: "+csl[1]+packet.matches.length)
	for(var i5a in packet.matches){
		cwc(csl[1]+packet.matches[i5a].match)
	}
})
client.on('end', function(packet) {
	setTimeout(function(){process.exit(0)},3000)
})
var p={};
global.leave=false;
client.on('player_info', function(packet) {
	for(var i1c in packet.data){
		if(p[packet.data[i1c].UUID]){
		if(packet.action==0){
			p[packet.data[i1c].UUID]=packet.data[i1c];
			on[packet.data[i1c].UUID]=true;
			/*if(LockList.get(packet.data[i1c].UUID) && on[packet.data[i1c].UUID]){
				connectLockBot(packet.data[i1c].UUID)
			}*/
			fs.appendFile('Kaboom Join Leave Log.txt',getDateAndTime4L()+" "+p[packet.data[i1c].UUID].name+" ("+packet.data[i1c].UUID+") joined or unvanished.\n",function (err) {  if (err) throw err;  });		}
		if(packet.action==1){
			if(!leave) {on[packet.data[i1c].UUID]=true;}
		}
		if(packet.action==2){
			if(!leave) {on[packet.data[i1c].UUID]=true;}
		}
		if(packet.action==3){
			if(!leave) {on[packet.data[i1c].UUID]=true;}
		}
		if(packet.action==4){
			setTimeout(function(){on[packet.data[i1c].UUID]=false;},100)
			fs.appendFile('Kaboom Join Leave Log.txt',getDateAndTime4L()+" "+p[packet.data[i1c].UUID].name+" ("+packet.data[i1c].UUID+") left or vanished.\n",function (err) {  if (err) throw err;  });
		}
		}
}	
})

global.CD=function(n,c){
	if(!global.destroyed){
	if(c=="clearcmdq"||c.split(" ")[0]=="confirm"){
		global.commandQueue[0]={n:n,c:c};return;
	}
	fs.appendFile('Command Log.txt',getDateAndTime4L()+" \""+n+"\" ran command: \""+c+"\"\n",function (err) {  if (err) throw err;  });
	global.commandQueue.push({n:n,c:c})
	}
};var CD=function(s,h){global.CD(s,h)}
	
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
	if(text2.includes("no longer a server operator]")){
		if(text2.indexOf("Made")==0){
			client.write("chat",{message:"/op "+text.slice(5).split("no longer a server operator]").join("").split("maniaplay").join("")})
		}
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
	if(global.loggerEnable){
	fs.appendFile('Kaboom Log.txt',getDateAndTime4L()+" "+(fileprocessed+"\n"),function (err) {  if (err) throw err;  });
	chatLogQueue.push("\x1b[0m\x1b[1m\x1b[37m"+processed);
	}
	return;
	}
});
