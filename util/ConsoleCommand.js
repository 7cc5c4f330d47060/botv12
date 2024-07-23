//HOW TO WRITE CLASS JS
const index = require('../index.js')
const { cmds } = require('../plugins/command.js');
const parse = require("../util/chatparse.js");
const settings = require("../settings.json");
const lang=settings.defaultLang;
class ConsoleCommand{
	constructor (cmd,index2){
		this.send = ()=>{}; //not needed for console
		this.reply = text => process.stdout.write(parse(text)[0]+'\n');
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
				console.log(getMessage(lang,"command.help.cmdList",[helpCmds.join(" ")]))
			},
			printCmdHelp:(uuid,cmd)=>{
				let usage=getMessage(lang,`command.${cmd}.usage`);
				let desc=getMessage(lang,`command.${cmd}.desc`);
				if(cmds[cmd].usage){
					usage=cmds[cmd].usage;
				}
				if(cmds[cmd].desc){
					desc=cmds[cmd].desc;
				}
				console.log(getMessage(lang,"command.help.commandInfo",[cmd,usage,desc]));
			}
		}; //bot does not exist at console
		this.type = 'console';
		this.index = index2;
		this.args = cmd.split(' ').slice(1);
		this.verify = 3;
		this.host = "";
		this.port = "3"; // :3
		this.lang = settings.defaultLang;
	}
}

module.exports = ConsoleCommand;
