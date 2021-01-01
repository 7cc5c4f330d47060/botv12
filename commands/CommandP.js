const Command = require("./command.js");
class CommandP extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=9;
  this.confirm=0;
  this.console=1;
  this.h="Check a user's ping, or get a list of pings."
  this.u="|ping list <all/on> OR |ping get <UUID>"
  }
  command(c,n){
    if(c.split(" ")[1]==="list"){
	  if(c.split(" ")[2]==="all"){
	    for(var i in global.p){
		  console.log(i+" has a ping of "+global.p[i].ping+"ms.")
		}
	  }
	  if(c.split(" ")[2]==="on"){
	    for(var i in global.p){
		  if(global.on[i]){
		    console.log(i+" has a ping of "+global.p[i].ping+"ms.")
		  }
		}
	  }
	}
	if(c.split(" ")[1]==="get"){
      if(global.p[c.split(" ")[2]]){console.log(global.p[c.split(" ")[2]].ping)}
	}
  }
}
module.exports = CommandP