//copied from u6
//Old name: 020000_console.js
const readln=require("readline");
const index=require("../index.js");
const fs=require("fs");
const loadplug=()=>{
	let botplug=Object.create(null); //block __proto__ and constructor
	const bpl=fs.readdirSync("plugins/consolecmd");
	let id=0;
	for(const i in bpl){
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
let rl;
const write=(text)=>{
	readln.cursorTo(process.stdout,0);
	readln.clearLine(process.stdout,0);
	process.stdout.write(text+"\n");
	rl.prompt(true);
}
module.exports={
	commands: loadplug(),
	description: "Template plugin",
	load: ()=>{
		rl=readln.createInterface({
			input: process.stdin,
			output: process.stdout,
			prompt: "\x1b[0m\x1b[38;5;15m> "
		});
		rl.on("line",(l)=>{
		//00000000-0000-0000-0000-Console00000
			try{
				if(module.exports.commands[l.split(" ")[0].toLowerCase()]){
					if(l.split(" ")[0].toLowerCase()=="help"){
						module.exports.commands[l.split(" ")[0].toLowerCase()].command(l,module.exports.commands);
					} else {
						module.exports.commands[l.split(" ")[0].toLowerCase()].command(l);
					}
				}
			//things.consolecmds[l.toString().toLowerCase().split(" ")[0]].command(l,things)
			}catch(e){
				console.log(e);
			}
			rl.prompt(false);
		});
		rl.prompt();
		index.p.readlineLoaded=1;
	},
	rl,
	write
};