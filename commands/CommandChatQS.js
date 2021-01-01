const Command = require("./command.js");
class CommandChatQS extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm= 3;
  this.confirm=1;
  }
    command(c,n){
    global.chatQueueR(c.split(" ")[1])
  }
}
module.exports = CommandChatQS