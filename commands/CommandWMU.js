const Command = require("./command.js");
class CommandWMU extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=0;
  this.confirm=0;
  this.h="Make me say something."
  this.u="|whomadeyou"
  }
  command(c,n){
    global.cwc("This bot was made by 31bcf470538f4a30.")
  }
}
module.exports = CommandWMU