const Command = require("./command.js");
class CommandRestart extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=0;
  this.confirm=0;
  this.console=1;
  this.h="Restart the bot";
  this.u="|restart"
  }
    command(c,n,iC){
    if(iC){
    global.client.write("chat",{message:""+global.csl[1]+"Restarting..."})
	setTimeout(function(){process.exit(0)},200)
 } else {global.cwc("/bc &r|"+c.slice(0,75)+" may only be run from console.")}}
}
module.exports = CommandRestart