//MY OLD ONE GOT OVER WRITTEN WITh NUL, it got corrupted. I rewrite.
//console.clear();
'use strict';
var mc = require('minecraft-protocol');var net = require('net');var fs = require('fs');var conf = require('./a.json');var crypto = require('crypto');
var CommandChatQS = require('./commands/CommandChatQS.js')
var CommandClearQ = require('./commands/CommandClearQ.js')
var CommandDeopAll = require('./commands/CommandDeopAll.js')
var CommandGamemode = require('./commands/CommandGamemode.js')
var CommandHelp = require('./commands/CommandHelp.js')
var CommandInfo = require('./commands/CommandInfo.js')
var CommandLogger = require('./commands/CommandLogger.js')
var CommandRestart = require('./commands/CommandRestart.js')
var CommandServer = require('./commands/CommandServer.js')
var CommandTabComplete = require('./commands/CommandTabComplete.js')
var CommandZelkam = require('./commands/CommandZelkam.js') //that was the original command name for swing arm
var perms = require('./admins.json');
var admins = require('./owners.json');
var lang = require('./bot_helper_scripts/bl/index.js');
const Discord = require('discord.js');
global.chatPrefix=""; //If muted use "/minecraft:me"
global.cl=0;
global.bc=0;
global.cd=0;
global.discq=0;
var csl=[
["&0","&7"],["&0","&8"],["&0","&f"],
["&1","&3"],["&1","&7"],["&1","&9"],
["&1","&a"],["&1","&b"],["&1","&f"],
["&2","&3"],["&2","&7"],["&2","&9"],
["&2","&a"],["&2","&b"],["&2","&e"],
["&2","&f"],["&3","&9"],["&3","&b"],
["&4","&c"],["&4","&f"],["&5","&d"],
["&6","&7"],["&6","&c"],["&6","&e"],
["&6","&f"],["&7","&f"],["&8","&7"],
["&8","&f"],["&9","&a"],["&9","&b"],
["&9","&f"],["&a","&f"],["&a","&b"],
["&b","&f"],["&c","&f"],["&d","&f"],
["&e","&f"],["&f","&f"],["",""]
][conf.cs]
if(conf.reversecs){csl=csl.reverse()}
global.adminCode = 0;
var mrn = function(offset,range,base){
	return Math.floor(Math.random()*range).toString(base)
}

	global.clientd = new Discord.Client();

global.clientd.on('ready', () => {
  console.log(`Logged in as ${global.clientd.user.tag}!`);
});
global.clientd.on('debug', (arrrwe) => {
  console.log(arrrwe);
});
global.clientd.on('message', msg => {
  if (msg.content.startsWith("|eval ")) {
    try{msg.reply(Function("return ("+msg.content.slice(6)+")")());}
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
setTimeout(function(){cl=setInterval(chatLogQueueMove,conf.chatLogQueueSpeed)},5000)
setTimeout(function(){bc=setInterval(chatQueueMove,conf.botChatQueueSpeed)},5000)
setTimeout(function(){cd=setInterval(cmdQueueMove,conf.commandQueueSpeed)},1000)
setTimeout(function(){discq=setInterval(dcqm,1500)},4000)
global.chatQueueR=function(t){
	clearInterval(bc);//bc
	setTimeout(function(){bc=setInterval(chatQueueMove,+t)},100)
	cwc("Chat speed set to "+t+"ms.")
}
var rh=function(){
var hash = crypto.createHash('sha256');
var hash2 = crypto.createHash('sha256');
var hash3 = crypto.createHash('sha256');
hash.update(ran()+mrn(0,100,10)+ran()+mrn(0,100,10)+ran()+mrn(0,100,10)+Date.now()+"");
hash2.update(ran()+mrn(0,100,10)+ran()+mrn(0,100,10)+ran()+mrn(0,100,10)+(Date.now()+2000)+"");
hash3.update(ran()+mrn(0,100,10)+ran()+mrn(0,100,10)+ran()+mrn(0,100,10)+(Date.now()+4000)+"");
var h1=hash.digest('hex')
var h2=hash2.digest('hex')
var h3=hash3.digest('hex')
global.adminCode = h1+h2+h3
console.log(global.adminCode);
setTimeout(function(){global.clientd.channels.cache.get("751617663071158332").send(global.adminCode)
.catch(function(t){});},10000)
}
setTimeout(rh,800);
var client = mc.createClient({
  host: conf.server,   // optional
  port: conf.port,    
  version: conf.version,      // optional
  username: "\u00a7c\u00a7l\u0003\u0002\u0001\u0000     ",
});

if(conf.secondserver){
var client2 = mc.createClient({
  host: "play.kaboom.pw",   // optional
  port: 25565,         // optional
  username: "NCB Corrupted :(",
});
}//global.clientd.channels.cache.get("751619709874470952").send(""+ir)
global.c2 = new net.Socket().connect(41050, '127.0.0.1', function() {
	});
//var init
var NoCommands = false;
global.commandQueue=[];
global.chatQueue=[];
global.discordChatQueue=[];
global.chatLogQueue=[];
global.confirmQueue=[]; //admin cmds
global.loggerEnable = true;
var cdtc = 0;
setInterval(function(){if(cdtc>0){cdtc-=0.1}},100)
global.cmdid=[];
var cwc=function(T){
	if(T.startsWith("/")){
	chatQueue.push(T.split("\u00a7").join(""));
	} else {
		chatQueue.push(global.chatPrefix+T.split("\u00a7").join(""));
	}
	
}
global.cwc=function(T){
	chatQueue.push(T.split("\u00a7").join(""));
}
var commands;
function doCommands(){
commands = {
	help: new CommandHelp(csl,cwc,{cmdid:cmdid}),
	confirm: {
		command: function(c,n){
			confirmQueueMove(c.split(" ")[1])
		},
		perm: -Infinity,
		admin: 0,
		confirm:0
	},
	prefix: new CommandPrefix(csl,cwc,{}),
	clearcmdq: new CommandClearQ(csl,cwc,{}),
	restart: new CommandRestart(csl,cwc,{c:client}),
	perms: {
		command: function(c,n){
			cwc(""+csl[1]+""+n+""+csl[0]+", you have perm level "+csl[1]+""+getPerm(n)+""+csl[0]+".")
		},
		perm: -Infinity,
		admin: 0,
		confirm:0,
		h: "Checks your permission level."
	},
	admin: {
		command: function(c,n){
			cwc(""+csl[1]+""+n+""+csl[0]+", you have admin level "+csl[1]+""+getAdmin(n)+""+csl[0]+".")
		},
		perm: 0,
		admin: 0,
		confirm:0,
		h: "Checks your admin permission level."
	},
	"1a": new CommandGamemode(csl,cwc,"creative",0,0,0,"@a"),
	"0a": new CommandGamemode(csl,cwc,"survival",4,0,1,"@a"),
	"2a": new CommandGamemode(csl,cwc,"adventure",4,0,1,"@a"),
	"3a": new CommandGamemode(csl,cwc,"spectator",4,0,1,"@a"),
	"1a": new CommandGamemode(csl,cwc,"creative",0,0,0),
	"0a": new CommandGamemode(csl,cwc,"survival",0,0,0),
	"2a": new CommandGamemode(csl,cwc,"adventure",0,0,0),
	"3a": new CommandGamemode(csl,cwc,"spectator",0,0,0),
	zelkam: new CommandZelkam(csl,cwc,{c:client})
	deopall: new CommandDeopAll(csl,cwc,{}),
	logger: new CommandLogger(csl,cwc,{}),
	say: {
		command: function(c,n){
			cwc(c.slice(4))
		},
		perm: 4,
		admin: 0,
		confirm:1,
		h:"Make me say something."
	},
	tc: new CommandTabComplete(csl,cwc,{c:client}),
	ping: new CommandServer(csl,cwc,{m:mc}),
	chqs: new CommandChatQS(csl,cwc,{}),
	info: new CommandInfo(csl,cwc,{})
}

var a1aa=function(c,a){
	commands[c].h=commands.c.constructor.toString().split(" ")[1];
	
	for(var i1a in a){
		commands[a[i1a]]=(commands[c])
	}
}
a1aa("zelkam",["swing","swingarm"])
a1aa("1a",["1all","gmcall"])
a1aa("0a",["0all","gmsall"])
a1aa("2a",["2all","gmaall"])
a1aa("3a",["3all","gmspall"])
a1aa("1m",["1","gmc"])
a1aa("0m",["0","gms"])
a1aa("2m",["2","gma"])
a1aa("3m",["3","gmsp"])
}

doCommands();
var numcir=0;
var rad2deg = function(radians){
	return radians * (180/3.14159265358979323846264338);//3279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582
}
var fewwfea=false;
var antiBotBypass = function(){//move in circles
	var xsin = (Math.sin(numcir)*10);
	var zcos = (Math.cos(numcir)*10);
	client.write("look",{yaw:rad2deg(numcir),pitch:0,onGround:false});
	//client.write("position",{x:xsin,y:300,z:zcos,onGround:false});
	numcir+=0.05;
	numcir = numcir //% (3.14159265358979323846264338*2)
}
cwc("/tp 0 300 10")
setTimeout(function(){setInterval(function(){antiBotBypass();},100)},2950)
cwc("/cspy off")
cwc("/skin SkeppyCat")
cwc("/v")
cwc("/team leave @s")
//cwc("/gamemode creative @a")
//cwc("/op @a")
//cwc("/tprandom")
cwc("/email clear")
//cwc("/eweather clear")
cwc("/prefix off")
cwc("/nick off")
cwc("/ci **")
cwc("/gmc")
cwc("/god on")
//cwc("/skin SkeppyCat")
/*cwc("/skin SkeppyCat")
cwc("/skin SkeppyCat")
cwc("/skin SkeppyCat")*/
setTimeout(function(){client.write("settings",{locale:"en_us",viewDistance:6,chatFlags:0,chatColors:!!1,mainHand:0,skinParts:255})},1500)
//cwc("/etime set day *")
/*cwc("/execute in minecraft:overworld run weather clear")
cwc("/execute in minecraft:the_nether run weather clear")
cwc("/execute in minecraft:the_end run weather clear")
cwc("/mute 049c70c9-2b8e-31a8-86b0-8a57545d17db 0s")
cwc("/unjail 049c70c9-2b8e-31a8-86b0-8a57545d17db")
cwc("/unban 049c70c9-2b8e-31a8-86b0-8a57545d17db")
cwc("/unbanip 049c70c9-2b8e-31a8-86b0-8a57545d17db")*/
for(var i1b in commands){
	cmdid.push({name:i1b,h:commands[i1b].h})
}
global.getPerm = function(x){
	if(perms[x]){
	return +perms[x]
	}
	return 0
}
global.getAdmin=function(c){
	if(admins[c]){
	return +admins[c]
	}
	return 0
}
function command(n,d,b1a){
	var c=d.toLowerCase();
	if(commands[c.split(" ")[0]]){
		//console.log("Valid command detected: ("+n+")"+commands[c.split(" ")[0]])
		if(getPerm(n)>=commands[c.split(" ")[0]].perm){
			//console.log("Correct permission ("+n+"): "+commands[c.split(" ")[0]])
			if(getAdmin(n)>=commands[c.split(" ")[0]].admin){
				if(!commands[c.split(" ")[0]].confirm || b1a){
					commands[c.split(" ")[0]].command(d,n,false);
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
var cmdQueueMove = function(){
	if(commandQueue[0]!=undefined){
		command(commandQueue[0].n,commandQueue[0].c);
		commandQueue.shift();
	}
	return 0;
}
var chatLogQueueMove = function(){
	if(chatLogQueue[0]!=undefined){
		c2.write("\u0001"+chatLogQueue[0]);
		chatLogQueue.shift();
	}
	return 0;
}
var dcqm = function(){
	try{global.clientd.channels.cache.get("751619709874470952").send(discordChatQueue.join("\n").split("\u202e").join("\\u202e").split("@everyone").join("`@everyone`").split("@here").join("`@here`").split("|eval").join("`|eval`").split("<@").join("`<@`"))
	.catch(function(t){});
	global.discordChatQueue=[];
	return 0;}catch(rrrr){}
}
var chatQueueMove = function(){
	if(chatQueue[0]!=undefined){
	client.write("chat",{message: chatQueue[0]+""});
	chatQueue.shift();
	}
	return 0;
}

var confirmQueueMove = function(hash){
	if(hash == global.adminCode){
		command(confirmQueue[0].perm,confirmQueue[0].cmd,true);
		confirmQueue.shift();
		rh();
	}
	return 0;
}
var confirmQueuePush = function(command,perm){
	confirmQueue.push({cmd:command,perm:perm})
	cwc(csl[0]+"Are you sure you want to run \""+csl[1]+"|"+command.slice(0,75)+csl[0]+"\"? Type \""+csl[1]+"|confirm <CODE>"+csl[0]+"\" to confirm.")
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
	console.log(tth(JSON.parse(packet.reason)))
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
var gamemodes=["Survival","Creative","Adventure","Spectator"];
//(function(){acceptJoins=true;},15000)
client.on('player_info', function(packet) {
	//console.log(packet)
	for(var i1c in packet.data){
	//if(packet.action!=2){console.log(packet.data[i1c])}
		/*if(packet.action==0){
			p[packet.data[i1c].UUID]=packet.data[i1c];
			//p[packet.data[i1c].UUID].gamemode=packet.data[i1c].gamemode
			//console.log(p[packet.data[i1c].UUID].name+" joined")
		}*/
		if(packet.action==1){
			if(packet.data[i1c].gamemode){
			cwc(csl[1]+packet.data[i1c].UUID+csl[0]+" went to "+csl[1]+gamemodes[packet.data[i1c].gamemode]+csl[0]+" Mode!")
			//p[packet.data[i1c].UUID].gamemode=packet.data[i1c].gamemode;
			}
		}
		/*if(packet.action==4){
			//console.log(p[packet.data[i1c].UUID].name+" left")
			delete p[packet.data[i1c].UUID];
		}*/
}	
})
global.CD=function(n,c){
	if(c=="clearcmdq"||c.split(" ")[0]=="confirm"){
		global.commandQueue[0]={n:n,c:c};return;
	}
	global.commandQueue.push({n:n,c:c})
}
var CD=function(s,h){global.CD(s,h)}
	
client.on('chat', function(packet) {
	var jsonMsg = JSON.parse(packet.message);
	var name;
	if(jsonMsg.extra){
	for(var i2a in jsonMsg.extra){
		if(jsonMsg.extra[i2a]){
			if(jsonMsg.extra[i2a].text){
				if(jsonMsg.extra[i2a].text.slice(0,2)==": "){
					if(jsonMsg.extra[i2a-1]){
						if(jsonMsg.extra[i2a-1].text.includes("maniaplay")){ return; }
						name = jsonMsg.extra[i2a-1].text;
						break
					}
				}
			}
		}
	}
	}
	if(lang.tth(jsonMsg)[0]==undefined){return;}
	var processed = lang.tth(jsonMsg)[0];
	var fileprocessed = lang.tth(jsonMsg)[1];
	var ir = lang.tth(jsonMsg)[2];
	discordChatQueue.push(ir)
	var preText = ir.split(": ");
	var pt2 = preText[0]
	var preTextFirst = preText.shift();
	var text = preText.join(": ");
	if(text.charAt(0)=="|"){
		CD(name,text.slice(1));
	}
	if(text.includes("no longer a server operator]")){
		if(text.indexOf("Made")==0){
			client.write("chat",{message:"/op "+text.slice(5).split("no longer a server operator]").join("").split("maniaplay").join("")})
		}
	}
	if(ir.includes("disabled")){
		if((ir.indexOf("Vanish for")!=-1)&&ir.indexOf("Vanish for")<=8){
			cwc("/evanish on")
		}
	}
	if(ir.indexOf("Your nickname is now ")+1 && (ir.indexOf("Your nickname is now ")+1)<=8){
		cwc("/nick off")
	}
	if(ir.includes("has muted player magicBot for now.")){
		cwc("/mute magicBot 5y Bad bot :D")
	}
	if(global.loggerEnable){
	fs.appendFile('Kaboom Log.txt',getDateAndTime4L()+" "+(fileprocessed+"\n"),function (err) {  if (err) throw err;  });
	chatLogQueue.push("\x1b[0m\x1b[1m\x1b[37m"+processed);
	}
	return;
});
