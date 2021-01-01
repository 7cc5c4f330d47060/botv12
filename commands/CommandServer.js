const Command = require("./command.js");
class CommandServer extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm= 0;
  this.confirm=0;
  }
    command(c,n){
      global.mc.ping({host:c.split(" ")[1],port:+(c.split(" ")[2])},function(err,texter){
        try{
          try{global.cwc("/tellraw @a \""+(global.lang.tth(texter.description)[1]).split("\u00a7").join("\\u00a7").split("\u0020\u0020").join(" \\u0020").split("\"").join("\\\"").split("\n")[0]+"\"")}catch(er1b){}
          if((global.lang.tth(texter.description)[1]).split("\n")[1]){try{global.cwc("/tellraw @a \""+(global.lang.tth(texter.description)[1]).split("\u00a7").join("\\u00a7").split("\u0020\u0020").join(" \\u0020").split("\"").join("\\\"").split("\n")[1]+"\"")}catch(er2b){}}
		  try{global.cwc(`Version: ${texter.version.name} (${texter.version.protocol})`)}catch(e){}
		  try{global.cwc(`Players: ${texter.players.online}/${texter.players.max}`)}catch(e){}
        }
        catch(er2a)
        {
          global.cwc("Error: "+er2a)
      }})
  }
}
module.exports = CommandServer