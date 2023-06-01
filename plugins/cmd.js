//next: command_7
const index=require("../index.js");
const settings=require("../settings.json");
const crypto=require("./crypto.js");
const fs=require("fs");
//index.p.cmdloader=1;
const loadplug=()=>{
	let botplug=Object.create(null); //block __proto__ and constructor
	const bpl=fs.readdirSync("plugins/command");
	let id=0;
	for(const i in bpl){
		if(!bpl[i].endsWith(".js")){
			continue;
		}
		try{
			const name=bpl[i].slice(0,bpl[i].length-3);
			botplug[name]=require(`./command/${bpl[i]}`);
			botplug[name].id=id++;
			if(botplug[name].aliases){
				for(const j in botplug[name].aliases){
					botplug[botplug[name].aliases[j]]={};
					botplug[botplug[name].aliases[j]].command=botplug[name].command;
					botplug[botplug[name].aliases[j]].verify=botplug[name].verify;
					botplug[botplug[name].aliases[j]].opRequired=botplug[name].opRequired;
					botplug[botplug[name].aliases[j]].delay=botplug[name].delay;
					botplug[botplug[name].aliases[j]].desc=`Alias for ${name}`;//botplug[name].desc;
					botplug[botplug[name].aliases[j]].usage=botplug[name].usage;
					botplug[botplug[name].aliases[j]].hidden=true;
				}
			}
			// botplug.push());
		}catch(e){console.log(e);}
	}
	return botplug;
};

module.exports={
	commands: loadplug(),
	load: function(){
		//index.p.testing=1.8
		console.log(module.exports.commands)
		index.p.commandsLoaded=true;
	},
	load2: function(b){
		b.cmddelay={};
		b.prefix=settings.prefix;
		b.lastCommand=1293840000000; //January 1, 2011
		b.autoVerify=false; //LEAVE THIS DISABLED, UNLESS THERE IS NO DANGER OF PLAYERS DAMAGING YOUR SYSTEM
		if(!b.o.command_time){
			b.o.command_time=1000;
		}
		b.rc=function(cmdFormat,sender,user,cmd){
			if(b.o.commands_disabled) return;
			if(b.username==user) return;
			let v=false;
			if(b.prefix=="\"" && cmd.endsWith("\"")){ //Quote
				return;
			}
			if(b.prefix=="?" && cmd==""){ //Single question mark
				return;
			}
			if(Date.now()-b.lastCommand<=b.o.command_time){
				return;
			} else {
				b.lastCommand=Date.now();
			}
			//b.send("Comment")
			const args=cmd.split(" ");
			const command=cmd.split(" ")[0].toLowerCase();
			try{
				if(module.exports.commands[command]){
					if(module.exports.commands[command].delay && b.cmddelay[command] && Date.now()-b.cmddelay[command]<=module.exports.commands[command].delay && !b.o.cc_enabled){
						b.message(`You must wait ${Math.floor((b.cmddelay[command]-Date.now()+module.exports.commands[command].delay)/1000)} more second${Math.floor((b.cmddelay[command]-Date.now()+module.exports.commands[command].delay)/1000)==1?"":"s"} to run this command again.`);
						return;
					} else {
						b.cmddelay[command]=Date.now();
					}
					//if(module.exports.commands[command].verify && sender!="00000000-0000-0000-0000-Console00000"){
					if(!b.autoVerify && args[args.length-1]!=crypto.genCode(user) && module.exports.commands[command].verify && sender!="ffffffff-ffff-ffff-ffff-ffffffffffff"){
						b.message("Invalid hash");
						return;
					} else if(args[args.length-1]==crypto.genCode(user) || b.autoVerify || sender=="ffffffff-ffff-ffff-ffff-ffffffffffff"){
						if(sender!="ffffffff-ffff-ffff-ffff-ffffffffffff" && !b.autoVerify){
							cmd=args.slice(0,args.length-1).join(" ");
						}
						v=true;
					}
					if(sender=="ffffffff-ffff-ffff-ffff-ffffffffffff"){
						sender=b.uuid;
						user="Console";
					}
					//}
					if(module.exports.commands[command].opRequired && (b.o.partial_op || b.o.deop)){
						b.send("Operator access required to run command.");
					} else {
						if(command=="help"){
							module.exports.commands[command].command(b,module.exports.commands[command].format?cmdFormat:cmd,sender,user,v,module.exports.commands);
						} else {
							module.exports.commands[command].command(b,module.exports.commands[command].format?cmdFormat:cmd,sender,user,v);
						}
					}
				} else {
					//b.send(`Command ${b.prefix+command} does not exist, try ${b.prefix}help for a list of commands.`.slice(0,100));
				}
			} catch(err){
				b.send(err+"");
			}
			//b.send("Command: "+cmd+" from UUID "+sender+" ("+user+")")
		};
		b.on("command_u",b.rc);
	}
};
