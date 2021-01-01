const Command = require("./command.js");
class CommandReload extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=0;
  this.confirm=0;
  this.console=1;
  this.h="Reload"
  this.u="|reload"
  }
  command(c,n,isCon){
	require("../bot_helper_scripts/Reload.js")()
  }
}
module.exports = CommandReload