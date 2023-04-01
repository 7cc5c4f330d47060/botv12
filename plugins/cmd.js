const index=require("../index.js")
const fs=require("fs")
//index.p.cmdloader=1;
const loadplug=()=>{
  let botplug={};
  const bpl=fs.readdirSync("plugins/command")
  let id=0;
  for(var i in bpl){
    if(!bpl[i].endsWith(".js")){
      continue
    }
    try{
      botplug[bpl[i].slice(0,bpl[i].length-3)]=require(`./command/${bpl[i]}`);
      botplug[bpl[i].slice(0,bpl[i].length-3)].id=id++;
     // botplug.push());
    }catch(e){console.log(e)}
  }
  return botplug;
}

module.exports={
	commands: loadplug(),
	load: function(){
		//index.p.testing=1.8
		console.log(module.exports.commands)
		index.p.commandsLoaded=true;
	},
	load2: function(b){
		b.prefix="\"";
		b.autoVerify=false; //LEAVE THIS DISABLED, UNLESS THERE IS NO DANGER OF PLAYERS DAMAGING YOUR SYSTEM
		b.rc=function(cmd,sender,user){
			console.log("a");
			let v=false;
			if(b.prefix=="\"" && cmd.endsWith("\"")){ //Quote
				return;
			}
			if(b.prefix=="?" && cmd==""){ //Single question mark
				return;
			}
			//b.send("Comment")
			const args=cmd.split(" ");
			const command=cmd.split(" ")[0].toLowerCase();
			try{
				if(module.exports.commands[command]){
					//if(module.exports.commands[command].verify && sender!="00000000-0000-0000-0000-Console00000"){
					if(!b.autoVerify && args[args.length-1]!=b.hash && module.exports.commands[command].verify && sender!="ffffffff-ffff-ffff-ffff-ffffffffffff"){
						b.send("Invalid hash")
						return;
					} else if(args[args.length-1]==b.hash || sender=="ffffffff-ffff-ffff-ffff-ffffffffffff"){
						if(sender!="ffffffff-ffff-ffff-ffff-ffffffffffff"){
							cmd=args.slice(0,args.length-1).join(" ");
							b.regenCode();
						}
						v=true;
					}
					if(sender=="ffffffff-ffff-ffff-ffff-ffffffffffff"){
						sender=b.uuid;
						user="Console";
					}
					//}
					if(module.exports.commands[command].opRequired && (b.o.partial_op || b.o.deop)){
						b.send("Operator access required to run command.")
					} else {
						if(command=="help"){
							module.exports.commands[command].command(b,cmd,sender,user,v,module.exports.commands)
						} else {
							module.exports.commands[command].command(b,cmd,sender,user,v)
						}
					}
				} else {
					b.send(`Command ${b.prefix+command} does not exist, try ${b.prefix}help for a list of commands.`.slice(0,100))
				}
			} catch(err){
				b.send(err+"")
			}
			//b.send("Command: "+cmd+" from UUID "+sender+" ("+user+")")
		}
		b.on("command_u",b.rc)
	}
}
