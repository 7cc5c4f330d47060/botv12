const Command = require("./command.js");
class CommandPerms extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm= 0;
    this.confirm=0;
  }
    command(c,n,isCon){
    if(!(isCon && n.constructor==Boolean)){try{
      cwc(""+global.csl[0]+"\""+global.csl[1]+""+n.split("&").join("&"+global.csl[1]).split("\u00a7").join("&")+""+global.csl[0]+"\", you have perm level "+global.csl[1]+""+global.getPerm(n)+""+global.csl[0]+" ("+global.csl[1]+global.pll[global.getPerm(n)]+global.csl[0]+").")
    }catch(e){}} else {
      if(c.split(" ")[1]=="get"){
        console.log("\""+c.slice(10)+""+"\" has perm level "+global.getPerm(c.slice(10))+" ("+global.pll[global.getPerm(c.slice(10))]+").")
      } else 
      if(c.split(" ")[1]=="list"){
        for(var i1a in global.perms){
          console.log("\""+i1a+""+"\" has perm level "+global.getPerm(i1a)+" ("+global.pll[global.getPerm(i1a)]+").")
        }
      }
	  if(c.split(" ")[1]=="set"){
        global.perms[c.slice(13)]=(+c.split(" ")[2])
		console.log("\""+c.slice(13)+"\"'s perms were set to "+(+c.split(" ")[2])+".")
      }
    }
  }
}
module.exports = CommandPerms