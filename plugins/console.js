//copied from u6
//Old name: 020000_console.js
const readln=require('readline');
const index=require('../index.js');
const fs=require('fs');
const { newcommands } = require('./cmd.js')
let rl;
const write=(text)=>{
	readln.cursorTo(process.stdout,0);
	readln.clearLine(process.stdout,0);
	process.stdout.write(text+'\n');
	rl.prompt(true);
};
module.exports={
	description: 'Template plugin',
	load: ()=>{
		rl=readln.createInterface({
			input: process.stdin,
			output: process.stdout,
			prompt: '\x1b[0m\x1b[38;5;15m> '
		});
		rl.on('line',(l)=>{
		//00000000-0000-0000-0000-Console00000
			try{
				newcommands[l.split(' ')[0].toLowerCase()].command_c(l);
			//things.consolecmds[l.toString().toLowerCase().split(" ")[0]].command(l,things)
			}catch(e){
				console.log(e);
			}
			rl.prompt(false);
		});
		rl.prompt();
	},
	rl,
	write
};