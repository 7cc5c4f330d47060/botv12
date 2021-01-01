const Command = require("./command.js");
class CommandGamemode extends Command{
  constructor(csl,cwc,gm,p,c,name) {
    super(csl,cwc,{});
  this.perm=p;
  this.confirm=c;
  this.gm=gm;
  this.name=(name?name:false);
  this.h="Sets "+(this.gm.split(" ")[1]?this.gm.split(" ")[1]+"'s":"your")+" gamemode to "+this.gm.split(" ")[0]+" mode."
  this.u="|<GAMEMODE COMMAND>"
  }
    command(c,n){
    global.cwc("/gamemode "+this.gm+" "+(this.name ? this.name : (this.gm.split(" ")[1]?"":n)))
  }
}
module.exports = CommandGamemode