const Command = require("./command.js");
class CommandDeopAll extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm= 6;
  this.confirm=1;
  }
    command(c,n){
    cwc("/execute as @a run deop @s[type=player]")
    cwc("/op @s[type=player]")
    cwc("Done")
  }
}
module.exports = CommandDeopAll