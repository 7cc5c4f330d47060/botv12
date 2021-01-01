const Command = require("./command.js");
class CommandOpAll extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm= 0;
  this.confirm=0;
  }
    command(c,n){
    cwc("/op @e[type=player]")
    cwc("Done")
  }
}
module.exports = CommandOpAll