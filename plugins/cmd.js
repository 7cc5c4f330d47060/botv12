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
		b.prefix="\""
		b.rc=function(cmd,sender,user){
			//b.send("Comment")
			const command=cmd.split(" ")[0]
			try{
				if(module.exports.commands[command]){
					module.exports.commands[command].command(b,cmd,sender,user,module.exports.commands)
				} else {
					b.send("Command "+b.prefix+command+" does not exist!")
				}
			} catch(err){
				b.send(err+"")
			}
			//b.send("Command: "+cmd+" from UUID "+sender+" ("+user+")")
		}
		b.on("command_u",b.rc)
	}
}
