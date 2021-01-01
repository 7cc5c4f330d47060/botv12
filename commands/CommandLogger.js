const Command = require("./command.js");
class CommandLogger extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm= 7;
  this.confirm=1;
  this.console=1;
  this.h="Toggle loggers";
  this.u="|logger <console/file/all>"
  }
    command(c,n,isC){
    if(isC){
      if(c.split(" ")[1]=="file"){
        if(c.split(" ")[2]){global.fileLogger=c.split(" ")[2]=="off"?false:true}else{
        global.fileLogger = !global.fileLogger}
        cwc(global.csl[0]+"File logger "+global.csl[1]+["disabled","enabled"][+global.fileLogger]+global.csl[0]+".")
      } else
      if(c.split(" ")[1]=="console"){
        if(c.split(" ")[2]){global.consoleLogger=c.split(" ")[2]=="off"?false:true}else{
        global.consoleLogger = !global.consoleLogger}
        cwc(global.csl[0]+"Console logger "+global.csl[1]+["disabled","enabled"][+global.consoleLogger]+global.csl[0]+".")
      } else
      if(c.split(" ")[1]=="all"){
        if(c.split(" ")[2]){global.fileLogger=c.split(" ")[2]=="off"?false:true}else{
        return}
        cwc(global.csl[0]+"File logger "+global.csl[1]+["disabled","enabled"][+global.fileLogger]+global.csl[0]+".")
        if(c.split(" ")[2]){global.consoleLogger=c.split(" ")[2]=="off"?false:true}else{
        return}
        cwc(global.csl[0]+"Console logger "+global.csl[1]+["disabled","enabled"][+global.consoleLogger]+global.csl[0]+".")
      }
    } else {
      global.cwc("/bc &r|"+c.slice(0,75)+" may only be run from console.")
    }
  }
}
module.exports = CommandLogger