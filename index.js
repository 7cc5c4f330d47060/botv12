//MY OLD ONE GOT OVER WRITTEN WITh NUL, it got corrupted. I rewrite.
//console.clear();
var mc = require('minecraft-protocol');
var net = require('net');
var fs = require('fs');
var crypto = require('crypto');
var perms = require('./admins.json');
var admins = require('./owners.json');
var conf = require('./a.json');
var lang = require('bot_helper_scripts/bl');
var comm = require('bot_helper_scripts/cmd');
var cl;
var bc;
var cd;
var csl=[
["&0","&8"],//black and dark gr?y
["&1","&9"],//dark and light blue
["&2","&a"],//dark and light green
["&3","&b"],//dark and light aqua / cyan
["&4","&c"],//dark and light red
["&5","&d"],//purple and magenta
["&6","&e"],//orange and yellow
["&7","&f"] //light gr?y and white
][conf.cs]
var adminCode;
var mrn = function(offset,range,base){
	return Math.floor(Math.random()*range).toString(base)
}

	
var mrr = function(){
	var rn = +mrn(2,32,10)
	return (mrn(2,rn,rn))
}
var ran=function(){
	return mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()+mrn()
}
setTimeout(function(){cl=setInterval(chatLogQueueMove,conf.chatLogQueueSpeed)},5000)
setTimeout(function(){bc=setInterval(chatQueueMove,conf.botChatQueueSpeed)},5000)
setTimeout(function(){cd=setInterval(cmdQueueMove,conf.commandQueueSpeed)},1000)
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
console.log(adminCode = h1+h2+h3);
}
rh();
var client = mc.createClient({
  host: conf.server,   // optional
  port: conf.port,    
  version: conf.version,      // optional
  username: "\u0002\u0002\u0000\u0000\u00a7 ",
});
if(conf.secondserver){
var client2 = mc.createClient({
  host: "play.kaboom.pw",   // optional
  port: 25565,         // optional
  username: "NCB Corrupted :(",
});
}
var c2 = new net.Socket().connect(41050, '127.0.0.1', function() {
	});
//var init
var NoCommands = false;
commandQueue=[];
chatQueue=[];
chatLogQueue=[];
var cmdid=[];
var cwc=function(T){
	//console.log("Added \""+T+"\" to chat queue")
	chatQueue.push(T.split("\u00a7").join(""));
}
var commands;
var doCommands = function(){
commands = {
	help: {
		command: function(c,n){
			var Page=((+(c.split(" ")[1]))-1)
			cwc(""+csl[0]+"Help - page "+csl[1]+""+(+(c.split(" ")[1])))
			try{cwc(""+csl[1]+"|"+cmdid[(Page*6)+0].name+""+csl[0]+": "+cmdid[(Page*6)+0].h)}catch(e){}
			try{cwc(""+csl[1]+"|"+cmdid[(Page*6)+1].name+""+csl[0]+": "+cmdid[(Page*6)+1].h)}catch(e){}
			try{cwc(""+csl[1]+"|"+cmdid[(Page*6)+2].name+""+csl[0]+": "+cmdid[(Page*6)+2].h)}catch(e){}
			try{cwc(""+csl[1]+"|"+cmdid[(Page*6)+3].name+""+csl[0]+": "+cmdid[(Page*6)+3].h)}catch(e){}
			try{cwc(""+csl[1]+"|"+cmdid[(Page*6)+4].name+""+csl[0]+": "+cmdid[(Page*6)+4].h)}catch(e){}
			try{cwc(""+csl[1]+"|"+cmdid[(Page*6)+5].name+""+csl[0]+": "+cmdid[(Page*6)+5].h)}catch(e){}
		},
		perm: -Infinity,
		admin: 0
	},
	clearcmdq: {command: function(c,n){
		commandQueue=[];
		chatQueue=[];
		chatLogQueue=[];
		c2.write("\u0002")
		console.clear();
		cwc("&aDone")
		console.log(adminCode)
	},
		perm: 15,
		admin: 1
	},
	restart: {
		command: function(c,n){
			if(adminCode==(c.split(" ")[1])){
				client.write("chat",{message:""+csl[1]+"Restarting..."})
				c2.write("\u0002");
				console.clear();
				clearInterval(cl);
				clearInterval(bc);
				clearInterval(cd);
				setTimeout(function(){delete chatQueue;},300);
				setTimeout(function(){delete chatLogQueue;},300);
				setTimeout(function(){delete commandQueue;},300);
				setTimeout(function(){c2.write("\u0003");client.write("chat",{message:""+csl[1]+"Leaving"});process.exit(0)},1000);
			}
		},
		perm: -Infinity,
		admin: 0
	},
	perms: {
		command: function(c,n){
			cwc(""+csl[1]+""+n+""+csl[0]+", you have perm level "+csl[1]+""+getPerm(n)+""+csl[0]+".")
		},
		perm: -Infinity,
		admin: 0,
		h: "Checks your permission level."
	},
	admin: {
		command: function(c,n){
			cwc(""+csl[1]+""+n+""+csl[0]+", you have admin level "+csl[1]+""+getAdmin(n)+""+csl[0]+".")
		},
		perm: 0,
		admin: 0,
		h: "Checks your admin permission level."
	},
	"1a": {
		command: function(c,n){
			cwc("/gamemode creative @a")
		},
		perm: 0,
		admin: 0,
		h: "Puts everyone in creative mode."
	},
	"0a": {
		command: function(c,n){
			cwc("/gamemode survival @a")
		},
		perm: 4,
		admin: 0,
		h: "Puts everyone in survival mode."
	},
	"2a": {
		command: function(c,n){
			cwc("/gamemode adventure @a")
		},
		perm: 4,
		admin: 0,
		h: "Puts everyone in adventure mode."
	},
	"3a": {
		command: function(c,n){
			cwc("/gamemode spectator @a")
		},
		perm: 4,
		admin: 0,
		h: "Puts everyone in spectator mode."
	},
	"1m": {
		command: function(c,n){
			cwc("/gamemode creative "+n)
		},
		perm: 0,
		admin: 0,
		h: "Puts you in creative mode."
	},
	"0m": {
		command: function(c,n){
			cwc("/gamemode survival "+n)
		},
		perm: 0,
		admin: 0,
		h: "Puts you in survival mode."
	},
	"2m": {
		command: function(c,n){
			cwc("/gamemode adventure "+n)
		},
		perm: 0,
		admin: 0,
		h: "Puts you in adventure mode."
	},
	"3m": {
		command: function(c,n){
			cwc("/gamemode spectator "+n)
		},
		perm: 0,
		admin: 0,
		h: "Puts you in spectator mode."
	},
	zelkam: {
		command: function(c,n){
			client.write("arm_animation",{hand:+c.split(" ")[1]})
		},
		perm: 0,
		admin: 0,
		h:"Swing an arm."
	},
	say: {
		command: function(c,n){
			cwc(c.slice(4))
		},
		perm: 0,
		admin: 0,
		h:"Make me say something."
	},
	info: {
		command: function(c,n){
			cwc(csl[0]+"This used to be a good bot with many commands.")
			cwc(csl[1]+"But then the file got corrupted. It was overwritten with NULS.")
			cwc(csl[0]+"There was no backup. "+csl[1]+"I looked and looked, for nothing.")
			cwc(csl[1]+"I had to rewrite the whole thing from scratch. I now have")
			cwc(csl[1]+"backups each time I edit the code, so that if it gets corrupted")
			cwc(csl[1]+"again, I can just put one of the backups on.")
		},
		perm: 0,
		admin: 0,
		h:"Story of rewrite"
	}
}
var a1aa=function(c,a){
	commands[c].name=c;
	
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
cwc("/cspy on")
cwc("/v")
cwc("/team leave @s")
//cwc("/gamemode creative @a")
cwc("/op @a")
//cwc("/tprandom")
cwc("/email clear")
//cwc("/eweather clear")
cwc("/prefix off")
cwc("/nick off")
cwc("/ci **")
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
var getPerm = function(x){
	return +perms[x]
}
var getAdmin = function(c){
	return +admins[c]
}
var command=function(n,d){
	var c=d.toLowerCase();
	if(commands[c.split(" ")[0]]){
		//console.log("Valid command detected: ("+n+")"+commands[c.split(" ")[0]])
		if(getPerm(n)>=commands[c.split(" ")[0]].perm){
			//console.log("Correct permission ("+n+"): "+commands[c.split(" ")[0]])
			if(getAdmin(n)>=commands[c.split(" ")[0]].admin){
				//console.log("Correct admin permission ("+n+"): "+commands[c.split(" ")[0]])
				if(NoCommands || getAdmin(n)>=1){
					commands[c.split(" ")[0]].command(d,n);
				}
			}
		}
	}
}
var cmdQueueMove = function(){
	if(commandQueue[0]!=undefined){
		command(commandQueue[0].n,commandQueue[0].c);
		commandQueue.shift();
	}
}
var chatLogQueueMove = function(){
	if(chatLogQueue[0]!=undefined){
		c2.write("\u0001"+chatLogQueue[0]);
		chatLogQueue.shift();
	}
}
var chatQueueMove = function(){
	if(chatQueue[0]!=undefined){
		//console.log("Saying "+chatQueue[0])
	client.write("chat",{message: chatQueue[0]+""});
	chatQueue.shift();
	}
}

//Commands began with | (Shift+Backslash)
//It logged chat in color
//It had section signs in loger
//Section Sign: §"
var getDateAndTime4L=function(){
	var fw = new Date();
	return "["+fw.getUTCDate()+"."+(fw.getUTCMonth()+1)+"."+fw.getUTCFullYear()+" "+fw.getUTCHours()+":"+fw.getUTCMinutes()+":"+fw.getUTCSeconds()+":"+fw.getUTCMilliseconds()+"]";
}
var nss=function(d){
	return d.split("\u00a7").join("\\u00a7")
}
client.on('title', function(packet) {
	if(packet.action<=2){
		client.write("chat",{message: "/title @a clear"});
	}
});
client.on('kick_disconnect', function(packet) {
	console.log(packet.reason)
	process.exit(0)
})
var p={};
var gamemodes=["Survival","Creative","Adventure","Spectator"];
setTimeout(function(){acceptJoins=true;},15000)
client.on('player_info', function(packet) {
	//console.log(packet)
	for(var i1c in packet.data){
	if(packet.action!=2){console.log(packet.data[i1c])}
		if(packet.action==0){
			
			p[packet.data[i1c].UUID]=packet.data[i1c];
			//p[packet.data[i1c].UUID].gamemode=packet.data[i1c].gamemode
			console.log(p[packet.data[i1c].UUID].name+" joined")
			
		
		}

		if(packet.action==1){
			console.log(csl[1]+packet.data[i1c].name+csl[0]+" went from "+csl[1]+gamemodes[p[packet.data[i1c].UUID].gamemode]+csl[0]+" Mode to "+csl[1]+gamemodes[packet.data[i1c].gamemode]+csl[0]+" Mode!")
			p[packet.data[i1c].UUID].gamemode=packet.data[i1c].gamemode;
		
		}
		if(packet.action==4){
			console.log(p[packet.data[i1c].UUID].name+" left")
			p[packet.data[i1c].UUID]=undefined
		}
}	
})
var CD=function(n,c){
	//console.log("Command detected ("+n+"): "+c)
	if(c=="clearcmdq"){
		commandQueue[0]={n:n,c:c};return;
	}
	commandQueue.push({n:n,c:c})
}
client.on('chat', function(packet) {
	var jsonMsg = JSON.parse(packet.message);
	var name;
	if(jsonMsg.extra){
	for(var i2a in jsonMsg.extra){
		if(jsonMsg.extra[i2a]){
			if(jsonMsg.extra[i2a].text){
				if(jsonMsg.extra[i2a].text.slice(0,2)==": "){
					name = jsonMsg.extra[i2a-1].text
				}
			}
		}
	}
	}
	if(lang.tth(jsonMsg)[0]==undefined){return;}
	var processed = lang.tth(jsonMsg)[0];
	var fileprocessed = lang.tth(jsonMsg)[1];
	var ir = lang.tth(jsonMsg)[2];
	var preText = ir.split(": ");
	var pt2 = preText[0]
	var preTextFirst = preText.shift();
	var text = preText.join(": ");
	if(text.charAt(0)=="|"){
		CD(name,text.slice(1));
	}
	if(text.indexOf("Made bb41a64a33fe01fb no longer a server operator]")==0){
		cwc("/op bb41a64a33fe01fb")
	}
	fs.appendFile('Kaboom Log.txt',getDateAndTime4L()+" "+(fileprocessed+"\n"),function (err) {  if (err) throw err;  });
	chatLogQueue.push("\x1b[0m\x1b[1m\x1b[37m"+processed);
});