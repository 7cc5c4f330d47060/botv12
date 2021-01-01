const Command = require("./command.js");
class CommandClearQ extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm= 15;
  this.admin= 1;
  this.confirm=0;
  }
    command(c,n){
    delete global.commandQueue;
    delete global.chatQueue;
    delete global.chatLogQueue;
    delete global.confirmQueue;
    delete global.discordChatQueue;
    global.commandQueue=[];
    global.chatQueue=[];
    global.chatLogQueue=[];
    global.confirmQueue=[];
    global.discordChatQueue=[];
    global.c2.write("\u0002")
    console.clear();
    global.cwc("&aDone")
    console.log(global.adminCode)
  }
}
module.exports = CommandClearQ