const Command = require("./command.js");
class CommandStopLag extends Command{
  constructor(csl,cwc,extra) {
  super(csl,cwc,extra);
  this.perm= 0;
  this.confirm=0;
  this.usage="|stoplag [undo]"
  }
  command(c,n){
	if(c.split(" ")[1]=="undo"){
	  for(var i in global.conf.startLag){
        setTimeout(Function("global.cwc(global.conf.startLag["+i+"])"),i)
      }
	}
	else
	{
      for(var i in global.conf.stopLag){
        setTimeout(Function("global.cwc(global.conf.stopLag["+i+"])"),i)
      }
	}
  }
}
module.exports = CommandStopLag