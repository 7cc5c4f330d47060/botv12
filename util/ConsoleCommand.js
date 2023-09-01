//HOW TO WRITE CLASS JS
const index = require('../index.js')
const { parse } = require('../plugins/!message.js');
class ConsoleCommand{
	constructor (cmd,index2){
		this.send = ()=>{}; //not needed for console
		this.reply = text => process.stdout.write(parse(JSON.parse(text))[1]+'\n');
		this.uuid = 'dde5a2a6-ebdd-4bbb-8eac-f75b10c10446_console'; //hard-coded because uuid does not exist at console
		this.username = 'Owner';
		this.nickname = 'Console';
		this.command = cmd;
		this.prefix = ''; //prefix does not exist at console
		this.bot = index2 >= 0 ? index.bots[index2] : {}; //bot does not exist at console
		this.type = 'console';
		this.index = index2;
		this.args = cmd.split(' ').slice(1);
		this.verify = true;
		this.host = "";
		this.port = "3";
	}
}

module.exports = ConsoleCommand;