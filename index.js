//MY OLD ONE GOT OVER WRITTEN WITh NUL, it got corrupted. I rewrite.
//console.clear();
'use strict';
var mc = require('minecraft-protocol');
var fs = require('fs');
global.conf = require('./a.json');
var crypto = require('crypto');
global.perms = require('./admins.json');
global.admins = require('./owners.json');
var lang = require('./bot_helper_scripts/bl/index.js');
global.lang=lang;
const Discord = require('discord.js');
global.chatPrefix=""; //If muted use "/minecraft:me"
global.cl=0;
global.bc=0;
global.cd=0;
global.discq=0;
global.destroyed=0;
global.rq=require;
var CommandAdminPerms = require('./commands/CommandAdminPerms.js')
var CommandChatQS = require('./commands/CommandChatQS.js')
var CommandClearQ = require('./commands/CommandClearQ.js')
var CommandConfirm = require('./commands/CommandConfirm.js')
var CommandDeopAll = require('./commands/CommandDeopAll.js')
var CommandGamemode = require('./commands/CommandGamemode.js')
var CommandHelp = require('./commands/CommandHelp.js')
var CommandInfo = require('./commands/CommandInfo.js')
var CommandIP = require('./commands/CommandIP.js')
var CommandLogger = require('./commands/CommandLogger.js')
var CommandPerms = require('./commands/CommandPerms.js')
var CommandPrefix = require('./commands/CommandPrefix.js')
var CommandReload = require('./commands/CommandReload.js')
var CommandRestart = require('./commands/CommandRestart.js')
var CommandServer = require('./commands/CommandServer.js')
var CommandTabComplete = require('./commands/CommandTabComplete.js')
var CommandZelkam = require('./commands/CommandZelkam.js')
var DisabledCommand = require('./commands/DisabledCommand.js') //that was the original command name for swing arm
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

global.clientd.on('ready', () => {
  console.log(`Logged in as ${global.clientd.user.tag}!`);
});
global.clientd.on('debug', (arrrwe) => {
if(!global.destroyed){console.log(arrrwe)}
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
console.log(global.adminCode);
setTimeout(function(){global.clientd.channels.cache.get("751617663071158332").send(global.adminCode).catch(function(t){});},4000)
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
global.c2 = new require("net").Socket().connect(41050, '127.0.0.1', function() {
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
	
global.commands={};
global.doCommands = function(){
global.commands = {
	help: new CommandHelp(csl,cwc,{cmdid:cmdid}),
	confirm: new CommandConfirm(csl,cwc,{}),
	prefix: new CommandPrefix(csl,cwc,{}),
	clearcmdq: new CommandClearQ(csl,cwc,{}),
	restart: new CommandRestart(csl,cwc,{c:client}),
	perms: new CommandPerms(csl,cwc,{}),
	admin: new CommandAdminPerms(csl,cwc,{}),
	"1a": new CommandGamemode(csl,cwc,"creative @a",0,0,0),
	"0a": new CommandGamemode(csl,cwc,"survival @a",4,0,1),
	"2a": new CommandGamemode(csl,cwc,"adventure @a",4,0,1),
	"3a": new CommandGamemode(csl,cwc,"spectator @a",4,0,1),
	"1m": new CommandGamemode(csl,cwc,"creative",0,0,0),
	"0m": new CommandGamemode(csl,cwc,"survival",0,0,0),
	"2m": new CommandGamemode(csl,cwc,"adventure",0,0,0),
	"3m": new CommandGamemode(csl,cwc,"spectator",0,0,0),
	zelkam: new CommandZelkam(csl,cwc,{c:client}),
	deopall: new CommandDeopAll(csl,cwc,{}),
	logger: new CommandLogger(csl,cwc,{}),
	say: new DisabledCommand(csl,cwc,{},"|say coming soon."),
	tc: new CommandTabComplete(csl,cwc,{c:client}),
	ping: new CommandServer(csl,cwc,{m:mc}),
	chqs: new CommandChatQS(csl,cwc,{}),
	info: new CommandInfo(csl,cwc,{}),
	ip: new CommandIP(csl,cwc,{}),
	reload: new CommandReload(csl,cwc,{}),
}

var a1aa=function(c,a){
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
global.cmdid=[];
for(var i1b in global.commands){
	global.cmdid.push({name:i1b,h:commands[i1b].h})
}

}

global.doCommands("");
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

setTimeout(function(){client.write("settings",{locale:"en_us",viewDistance:6,chatFlags:0,chatColors:!!1,mainHand:0,skinParts:255})},1500)

global.getPerm = function(x){
	if(global.perms[x]){
	return +global.perms[x]
	}
	return 0
}
global.getAdmin=function(c){
	if(global.admins[c]){
	return +global.admins[c]
	}
	return 0
}
function command(n,d,b1a){
	if(!global.destroyed){
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
	return 14;
}
global.cmdQueueMove = function(){
	if(!global.destroyed){
	if(commandQueue[0]!=undefined){
		command(commandQueue[0].n,commandQueue[0].c);
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
/*client.on('title', function(packet) {
	if(!tad){
	if(packet.action==2){
		setTimeout(function(){tad=1;},1);
		setTimeout(function(){client.write("chat",{message: "/title @a actionbar \"\""});},3);setTimeout(function(){tad=0},900);return;
	}
	}
	if(packet.action<=3 && packet.action!=2){
		client.write("chat",{message: "/title @a clear"});
	}
});*/
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
			//cwc(csl[1]+packet.data[i1c].UUID+csl[0]+" went to "+csl[1]+gamemodes[packet.data[i1c].gamemode]+csl[0]+" Mode!")
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
	if(!global.destroyed){
	if(c=="clearcmdq"||c.split(" ")[0]=="confirm"){
		global.commandQueue[0]={n:n,c:c};return;
	}
	global.commandQueue.push({n:n,c:c})
	}
}
var CD=function(s,h){global.CD(s,h)}
	
client.on('chat', function(packet) {
	if(!global.destroyed){
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
	if(ir.startsWith("Your nickname is now ")){
		cwc("/nick off")
	}
	/*if(ir.includes("has muted player magicBot for now.")){
		cwc("/mute magicBot 5y Bad bot :D")
	}*/
	if(global.loggerEnable){
	fs.appendFile('Kaboom Log.txt',getDateAndTime4L()+" "+(fileprocessed+"\n"),function (err) {  if (err) throw err;  });
	chatLogQueue.push("\x1b[0m\x1b[1m\x1b[37m"+processed);
	}
	return;
	}
});
