const Command = require("./command.js");
class CommandSay extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=1;
  this.confirm=1;
  this.h="Make me say something."
  this.u="|say <MESSAGE>"
  }
    command(c,n){
    global.cwc(c.slice(4))
  }
}
module.exports = CommandSay