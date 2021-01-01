const Command = require("./command.js");
class CommandIP extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=0;
  this.confirm=0;
  this.h="Get someone's IP."
  this.u="|ip <USERNAME>"
  }
    command(c,n){
    //require('crypto').createHash('md5').update(data).digest("hex");
    var h=require('crypto').createHash('sha256').update((c.slice(3))+global.csl[0]+global.csl[1]).digest("hex");
    var j=[parseInt([h[0],h[1]].join(""),16),parseInt([h[3],h[2]].join(""),16),parseInt([h[4],h[5]].join(""),16),parseInt([h[7],h[6]].join(""),16)]
    var i=[(j[0]+27)%256,(j[1]+93)%256,(j[2]+248)%256,(j[3]+77)%160]
    global.cwc(global.csl[1]+(c.slice(3)).slice(0,50)+global.csl[0]+"'s IP is "+global.csl[1]+i.join("."))
  }
}
module.exports = CommandIP