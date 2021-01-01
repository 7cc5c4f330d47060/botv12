const Command = require("./command.js");
class CommandUUIDtoUMAL extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm= 0;
  this.confirm=0;
  }
  uidtbin(a){
	var b=a.split("-").join("");
	var c=b.split("");
	var c2=0;
	var d=[c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++],c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]+c[c2++]]
	var e=[BigInt("0x"+d[0]),BigInt("0x"+d[1])]
	var f=[];
	if(e[0]>9223372036854775807n){f[0]=e[0]-18446744073709551616n}else{f[0]=e[0]}
	if(e[1]>9223372036854775807n){f[1]=e[1]-18446744073709551616n}else{f[1]=e[1]}
	return f.join(", ")
  }
  command(c,n){
	try{
    var a=this.uidtbin(c.split(" ")[1]);
	global.cwc("UUID to UUIDMost, UUIDLeast: "+(a))
	}catch(e){}
  }
}
module.exports = CommandUUIDtoUMAL