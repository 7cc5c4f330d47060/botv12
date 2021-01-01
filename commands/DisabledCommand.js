const Command = require("./command.js");
class DisabledCommand extends Command{
  constructor(csl,cwc,extra,reason) {
    super(csl,cwc,extra);
  this.perm=-Infinity;
  this.confirm=0;
  this.reason=reason;
  }
    command(c,n){
    cwc("&cThis command has been disabled. Reason: &7"+this.reason)
  }
}
module.exports = DisabledCommand