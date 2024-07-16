//HOW TO WRITE CLASS JS
const parse = require("../util/chatparse.js")
class Command{
	constructor (uuid,user,nick,cmd,prefix,bot,verify){
		this.send = (text,uuid)=>{bot.tellraw(uuid?uuid:"@a",text)}; 
		this.reply = text => bot.tellraw(uuid,text);
		this.uuid = uuid;
		this.username = user;
		this.nickname = nick;
		this.command = cmd;
		this.prefix = prefix;
		this.bot = bot;
		this.type = 'minecraft';
		this.index = bot.id;
		this.args = cmd.split(' ').slice(1);
		this.verify = verify;
		this.host = bot.host;
		this.port = bot.port;
	}
}

module.exports = Command;
