const Command = require("./command.js");
class CommandCommandSpy extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=8;
  this.confirm=0;
  }
    command(c,n,isConsole){
    if(isConsole){
      global.cspyMode=!global.cspyMode;
      global.cwc("/cspy "+["off","on"][+global.cspyMode])
    }
  }
}
module.exports = CommandCommandSpy