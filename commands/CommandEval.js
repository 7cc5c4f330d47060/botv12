const Command = require("./command.js");
class CommandEval extends Command{
  constructor(csl,cwc,gm) {
    super(csl,cwc,{});
  this.perm=-Infinity;
  this.confirm=0;
  this.console=1;
  }
    command(c,n,CON){
    if(CON){
      try{console.log(Function((c+"").slice(5))()+"")}
      catch(er){console.log("&cError: "+er)
      }
    } else {
      global.cwc("/bc &r|"+c.slice(0,75)+" may only be run from console.")
    }
  }
}
module.exports = CommandEval