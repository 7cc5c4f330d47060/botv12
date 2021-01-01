const Command = require("./command.js");
class CommandTabCode extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm= 0;
  this.confirm=0;
  }
  command(c,n){
    if(c.split(" ")[1]=="a"){
	  global.cwc("/team add "+c.split(" ")[2])
	}
	if(c.split(" ")[1]=="p"){
	  global.cwc("/team modify "+c.split(" ")[2]+" prefix "+c.split(" ")[3])
	}
	if(c.split(" ")[1]=="s"){
	  global.cwc("/team modify "+c.split(" ")[2]+" suffix "+c.split(" ")[3])
	}
	if(c.split(" ")[1]=="j"){
	  global.cwc("/team join "+c.slice(4))
	}
	if(c.split(" ")[1]=="l"){
	  global.cwc("/team leave "+c.slice(4))
	}
	if(c.split(" ")[1]=="r"){
	  global.cwc("/team remove "+c.slice(4))
	}
	if(c.split(" ")[1]=="m"){
	  global.cwc("/team modify "+c.slice(4))
	}
  }
}
module.exports = CommandTabCode