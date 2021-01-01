const Command = require("./command.js");
class CommandConsole extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=10;
  this.confirm=0;
  }
    command(c,n,isConsole2){
    if(isConsole2){
      global.consoleOnly=!global.consoleOnly;
      console.log("Commands can now "+["be run by everyone","only be run from console"][+global.consoleOnly]+"!")
    }
  }
}
module.exports = CommandConsole