const Command = require("./command.js");
class CommandZelkam extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm= 15;
  this.confirm=0;
  }
    command(c,n){
    global.client.write("arm_animation",{hand:+c.split(" ")[1]})
  }
}
module.exports = CommandZelkam