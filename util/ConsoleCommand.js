//HOW TO WRITE CLASS JS
const index = require('../index.js')
const { cmds } = require('../plugins/command.js');
const parse = require("../util/chatparse.js")
class ConsoleCommand{
	constructor (cmd,index2){
		this.send = ()=>{}; //not needed for console
		this.reply = text => process.stdout.write(parse(JSON.parse(text))[0]+'\n');
		this.uuid = 'dde5a2a6-ebdd-4bbb-8eac-f75b10c10446_console'; //hard-coded because uuid does not exist at console
		this.username = 'Owner';
		this.nickname = 'Console';
		this.command = cmd;
		this.prefix = ''; //prefix does not exist at console
		this.bot = index2 >= 0 ? index.bot[index2] : {
			printHelp:()=>{
				let helpCmds=[];
				for(const i in cmds){
					//if(cmds[i].hidden) continue;
					helpCmds.push(i)
				}
				console.log("Commands: "+helpCmds.join(" "))
			},
			printCmdHelp:(uuid,cmd)=>{
				console.log(cmd+cmds[cmd].usage+" - "+cmds[cmd].desc);
			}
		}; //bot does not exist at console
		this.type = 'console';
		this.index = index2;
		this.args = cmd.split(' ').slice(1);
		this.verify = 3;
		this.host = "";
		this.port = "3"; // :3
	}
}

module.exports = ConsoleCommand;
