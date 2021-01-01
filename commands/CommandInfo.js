const Command = require("./command.js");
class CommandInfo extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=0;
  this.confirm=0;
  }
    command(c,n){
    global.cwc(JSON.stringify(process.memoryUsage()));
  }
}
module.exports = CommandInfo