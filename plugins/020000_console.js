//copied from u6
const readln=require("readline");
const index=require("../index.js");
const fs=require("fs");
const loadplug=()=>{
	let botplug=Object.create(null); //block __proto__ and constructor
	const bpl=fs.readdirSync("plugins/consolecmd");
	let id=0;
	for(var i in bpl){
		if(!bpl[i].endsWith(".js")){
			continue;
		}
		try{
			botplug[bpl[i].slice(0,bpl[i].length-3)]=require(`./consolecmd/${bpl[i]}`);
			botplug[bpl[i].slice(0,bpl[i].length-3)].id=id++;
			//botplug.push());
		}catch(e){console.log(e);}
	}
	return botplug;
};
module.exports={
	commands: loadplug(),
	description: "Template plugin",
	load: ()=>{
		index.p.rl=readln.createInterface({
			input: process.stdin,
			output: process.stdout,
			prompt: "\x1b[0m\x1b[38;5;15m> "
		});
		index.p.rl.on("line",(l)=>{
		//00000000-0000-0000-0000-Console00000
			try{
				if(module.exports.commands[l.split(" ")[0].toLowerCase()]){
					module.exports.commands[l.split(" ")[0].toLowerCase()].command(l);
				}
			//things.consolecmds[l.toString().toLowerCase().split(" ")[0]].command(l,things)
			}catch(e){
				console.log(e);
			}
			index.p.rl.prompt(false);
		});
		index.p.rl.prompt();
		index.p.readlineLoaded=1;
	}
};