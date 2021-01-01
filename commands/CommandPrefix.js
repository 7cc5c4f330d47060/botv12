const Command = require("./command.js");
class CommandPrefix extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=9;
  this.confirm=1;
  this.h="Change the bot's prefix";
  this.u="|prefix <PREFIX>"
  }
    command(c,n){
    global.prefix=c.slice(1);
	global.cwc(`Command prefix set to ${global.prefix}`)
  }
}
module.exports = CommandPrefix