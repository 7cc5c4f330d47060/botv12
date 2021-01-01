const Command = require("./command.js");
class CommandConfirm extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=0;
  this.confirm=0;
  }
    command(c,n){
    global.confirmQueueMove(c.split(" ")[1])
  }
}
module.exports = CommandConfirm