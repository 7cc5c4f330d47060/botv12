//MY OLD ONE GOT OVER WRITTEN WITh NUL, it got corrupted. I rewrite.
//console.clear();
'use strict';
setTimeout(function(){process.exit(0)},3600000)
var mc = require('minecraft-protocol');
var fs = require('fs');
const LockList = require("./bot_helper_scripts/LockList.js");
global.setTerminalTitle = function(title)
{
  process.stdout.write(
    String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
  );
}
var amount = function(dirPath,filter){
  var files2 = fs.readdirSync(dirPath)
  var files=[];
  files2.forEach(function(f){
	  if(f.startsWith(filter)){files.push(f)}
  })
  return files.length;
}
const rev = amount("nppBackup","index.js")+amount("commands/nppBackup","Command")+amount("bot_helper_scripts/nppBackup","")
console.log("Revision "+rev)
setTerminalTitle("Revision "+rev)
global.conf = require('./a.json');
var crypto = require('crypto');
global.perms = require('./admins.json');
global.admins = require('./owners.json');
var lang = require('./bot_helper_scripts/bl/index.js');
global.commands={};
setInterval(function(){
	global.gc();
  }, 5000);
require('./commands/Commands.js')();
global.lang=lang;
const Discord = require('discord.js');
global.chatPrefix=""; //If muted use "/minecraft:me"
global.cl=0;
global.bc=0;
global.cd=0;
global.discq=0;
global.destroyed=0;
global.rq=require;
const readline = require("readline");
global.c2 = new require("net").Socket().connect(41050, '127.0.0.1', function() {
	});
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
	prompt: "\x1b[0m\x1b[1m\x1b[37m> "
});
rl.on('line', (line) => {
	command("bb41a64a33fe01fb",line,true,true);
	rl.prompt(false)
});
rl.prompt(false)
global.csl=[
["&0","&7"],["&0","&8"],["&0","&f"],["&1","&3"],["&1","&7"],["&1","&9"],
["&1","&a"],["&1","&b"],["&1","&f"],["&2","&3"],["&2","&7"],["&2","&9"],
["&2","&a"],["&2","&b"],["&2","&e"],["&2","&f"],["&3","&9"],["&3","&b"],
["&4","&c"],["&4","&f"],["&5","&d"],["&6","&7"],["&6","&c"],["&6","&e"],
["&6","&f"],["&7","&f"],["&8","&7"],["&8","&f"],["&9","&a"],["&9","&b"],
["&9","&f"],["&a","&f"],["&a","&b"],["&b","&f"],["&c","&f"],["&d","&f"],
["&e","&f"],["&f","&f"],["",""]
][conf.cs]
if(conf.reversecs){csl=csl.reverse()}
global.adminCode = 0;
global.destroy=function(){
	if(!global.destroyed){
		(new CommandClearQ(cwc,csl,{})).command();global.destroyed=1;
	}
}
global.undestroy=function(){
	if(global.destroyed){
		global.destroyed=0;
		cwc("Enabling disabled bot functions...");
	}
}
var mrn = function(offset,range,base){
	return Math.floor(Math.random()*range).toString(base)			
}
global.clientd = new Discord.Client();
global.clientd.on('message', msg => {
  if (msg.content.startsWith("|eval ")) {
    try{msg.reply(Function("return (function(){"+msg.content.slice(6)+"})()")()).catch(function(t){});}
	catch(ErrorD1a){msg.reply("Error: "+ErrorD1a)}
  }
});
global.clientd.login('');
var mrr = function(){
	var rn = +mrn(2,32,10)
	return (mrn(2,rn,rn))
}
var ran=function(){
	return mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()
}
global.confirm=function(){
	confirmQueueMove(adminCode);
}
setTimeout(function(){global.cl=setInterval(chatLogQueueMove,conf.chatLogQueueSpeed)},5000)
setTimeout(function(){global.bc=setInterval(chatQueueMove,conf.botChatQueueSpeed)},5000)
setTimeout(function(){global.cd=setInterval(cmdQueueMove,conf.commandQueueSpeed)},1000)
setTimeout(function(){global.discq=setInterval(dcqm,1500)},4000)
global.chatQueueR=function(t){
	clearInterval(bc);//bc
	setTimeout(function(){bc=setInterval(chatQueueMove,+t)},100)
	cwc("Chat speed set to "+t+"ms.")
}
var rh=function(){
var hash = crypto.createHash('sha512');
var hash2 = crypto.createHash('sha512');
var hash3 = crypto.createHash('sha512');
hash.update(ran()+mrn(0,100,10)+ran()+mrn(0,100,10)+ran()+mrn(0,1000,10)+Date.now()+"");
hash2.update(ran()+mrn(0,100,11)+ran()+mrn(0,10000,20)+ran()+mrn(0,20000,10)+(Date.now()+2000)+"\u001c");
hash3.update(ran()+mrn(0,100,12)+ran()+mrn(0,1000000,30)+ran()+mrn(0,300000,10)+(Date.now()+4000)+"\u001d");
var h1=hash.digest('hex');var h2=hash2.digest('hex');var h3=hash3.digest('hex')
global.adminCode = h1+h2+h3
setTimeout(function(){global.clientd.channels.cache.get("751617663071158332").send(global.adminCode).catch(function(t){});},3000)
}
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
	//setTimeout(function(){lockBots[uuid].lint=setInterval(function(){lockBots[uuid].write("look",{pitch:Math.random()*10,yaw:Math.random()*10})},50)},500)
	setTimeout(function(){lockBots[uuid].write("chat",{message:'/setblock ~ 15 ~ minecraft:command_block{Command:"/v '+uuid+' off",auto:1b} destroy'})},1500);
	setTimeout(function(){lockBots[uuid].write("chat",{message:"/sudo "+uuid+" username "+name})},2000);
	setTimeout(function(){lockBots[uuid].write("chat",{message:"/execute as "+uuid+" run deop @s[type=player]"})},2500);
	setTimeout(function(){lockBots[uuid].write("chat",{message:"/icu control "+name})},3000);
	}catch(e){
		console.log(e)
	}
}
//var init
var NoCommands = false;
global.commandQueue=[];
global.chatQueue=[];
global.discordChatQueue=[];
global.chatLogQueue=[];
global.confirmQueue=[];
global.loggerEnable = true;
var cdtc = 0;
setInterval(function(){if(cdtc>0){cdtc-=0.1}},100)

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
global.cmdid=[];
/*
for(var ie2=0;ie2<=15;ie2++){
global.chatQueue.push('/tellraw '+n+' "\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'0\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'1\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'2\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+3+'\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'4\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'5\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'6\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'7\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'8\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'9\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'a\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'b\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'c\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'d\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'e\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'f"')}
*/
var packetc=60;
  client.on('packet', function (data, meta) {
    packetc=60;
  })
  setInterval(function(){
	  packetc--;
	  
	  if(packetc<=0){process.exit(0)} else if(packetc<=35){console.log(packetc)}
  },1000)

for(var i1b in global.commands){
	global.cmdid.push({name:i1b,h:commands[i1b].h,usage:commands[i1b].u})
		}
var numcir=0;
var rad2deg = function(radians){
	return radians * (180/3.14159265358979323846264338);}
var fewwfea=false;
cwc("Revision "+rev)
cwc("/cspy on")
cwc("/evanish on")
cwc("/team leave @s")
cwc("/email clear")
cwc("/prefix off")
cwc("/nick off")
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
global.getAdmin=function(c){
	if(global.admins[c]!=undefined){
	return +global.admins[c]
	console.log(global.admins[x])
	}
	return 0
}
function command(n,d,b1a,C){
	if(!global.destroyed){
	var c=d.toLowerCase();
	if(commands[c.split(" ")[0]]){
		if(getPerm(n)>=commands[c.split(" ")[0]].perm){
			if(getAdmin(n)>=commands[c.split(" ")[0]].admin){
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
	return 3;
	}
	return 14;
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
global.dcqm = function(){
	if(!global.destroyed){
	try{global.clientd.channels.cache.get("751619709874470952").send(discordChatQueue.join("\n").split("|eval").join("| eval").split("\\").join("\\\\").split("\u202e").join("\\u202e").split("@").join("\\@ ").split("@here").join("`@here`").split("<").join("\\<").split("`").join("\\`").split("|").join("\\|").split("_").join("\\_").split("*").join("\\*"))
	.catch(function(t){});
	global.discordChatQueue=[];
	return 0;}catch(rrrr){}
	}
	return 15;
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
	global.cwc(csl[0]+"Are you sure you want to run \""+csl[1]+"|"+command.slice(0,75)+csl[0]+"\"? Type \""+csl[1]+"|confirm <CODE>"+csl[0]+"\" to confirm.")
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
		if(packet.action==0){
			p[packet.data[i1c].UUID]=packet.data[i1c];
			on[packet.data[i1c].UUID]=true;
			/*if(LockList.get(packet.data[i1c].UUID) && on[packet.data[i1c].UUID]){
				connectLockBot(packet.data[i1c].UUID)
			}*/
			fs.appendFile('Kaboom Join Leave Log.txt',getDateAndTime4L()+" "+p[packet.data[i1c].UUID].name+" ("+packet.data[i1c].UUID+") joined or unvanished.\n",function (err) {  if (err) throw err;  });
		}
		/*if(packet.action==1){
			if(!leave) {on[packet.data[i1c].UUID]=true;}
		}
		if(packet.action==2){
			if(!leave) {on[packet.data[i1c].UUID]=true;}
		}
		if(packet.action==3){
			if(!leave) {on[packet.data[i1c].UUID]=true;}
		}*/
		if(packet.action==4){
			on[packet.data[i1c].UUID]=false;
			fs.appendFile('Kaboom Join Leave Log.txt',getDateAndTime4L()+" "+p[packet.data[i1c].UUID].name+" ("+packet.data[i1c].UUID+") left or vanished.\n",function (err) {  if (err) throw err;  });
		}
}	
})

global.CD=function(n,c){
	if(!global.destroyed){
	if(c=="clearcmdq"||c.split(" ")[0]=="confirm"){
		global.commandQueue[0]={n:n,c:c};return;
	}
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
							if(jsonMsg.extra[i2a-1].text.includes("maniaplay")){ return; }
							if(jsonMsg.extra[i2a-1].text.includes("threadrippa")){ return; }
							//if(jsonMsg.extra[i2a-1].text.startsWith("@")){ return; }
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
	discordChatQueue.push(ir)
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
	if(ir.includes("disabled")){
		if((ir.indexOf("Vanish for")!=-1)&&ir.indexOf("Vanish for")<=8){
			cwc("/evanish on")
		}
	}
	if(ir.startsWith("Your nickname is now ")){
		cwc("/nick off")
	}
	if(ir.startsWith("Successfully disabled CommandSpy")){
		cwc("/cspy on")
	}
	if(global.loggerEnable){
	fs.appendFile('Kaboom Log.txt',getDateAndTime4L()+" "+(fileprocessed+"\n"),function (err) {  if (err) throw err;  });
	chatLogQueue.push("\x1b[0m\x1b[1m\x1b[37m"+processed);
	}
	return;
	}
});
