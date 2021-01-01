const Command = require("./command.js");
class CommandHelp extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=0;
  this.confirm=0;
  this.h="Get help for commands",
  this.u="|help page <PAGE> OR |help usage <COMMAND>"
  }
    command(c,n,con){
    if(con && n=="bb41a64a33fe01fb"){
      if(c.split(" ")[1]=="usage"){
        try{console.log(Commands.cmdid[c.split(" ")[2]].name+" - "+Commands.cmdid[c.split(" ")[2]].h+" - "+Commands.cmdid[c.split(" ")[2]].usage)
        }catch(e){}
        return;
      }
      if(c.split(" ")[1]=="all"||c.split(" ")[1]=="list"){
        for(var i in cmdid){
          try{console.log(Commands.cmdid[i].name+" - "+Commands.cmdid[i].h+" - "+Commands.cmdid[i].usage)}catch(e){}
        }
        return;
      }
      console.log("help list - list commands");
      console.log("help all - list commands");
      console.log("help usage <COMMAND> - print help for a command");
      console.log("help - print this message");
      return;
    }
    if(c.split(" usage ")[1]){
        var cmd=c.split(" usage ")[1];try{
          global.cwc(""+["&c","&a"][+((global.getPerm(n)>=Commands.commands[cmd].perm) && (!Commands.commands[cmd].console))]+global.prefix+cmd+""+global.csl[0]+": "+global.csl[1]+Commands.commands[cmd].h)
          global.cwc(""+global.csl[0]+"Usage: "+global.csl[1]+Commands.commands[cmd].u)
        }catch(e){}
        return;
      }
    
                
    var Page=Math.floor((+(c.split(" page ")[1]))-1);
    if(Page+""=="NaN"){
      global.cwc("&ehelp &6- print this message")
      global.cwc("&ehelp usage <COMMAND>&6 - print help for a command")
      global.cwc("&ehelp page <PAGE>&6 - print a page of help")
      return;
      }
    global.cwc(""+global.csl[0]+"Help - page "+global.csl[1]+""+(Page+1))
    try{global.cwc(""+["&c","&a"][+((global.getPerm(n)>=Commands.commands[Commands.cmdid[(Page*6)+0].name].perm) && (!Commands.commands[Commands.cmdid[(Page*6)+0].name].console))]+global.prefix+Commands.cmdid[(Page*6)+0].name+""+global.csl[0]+": "+Commands.cmdid[(Page*6)+0].h)}catch(e){}
    try{global.cwc(""+["&c","&a"][+((global.getPerm(n)>=Commands.commands[Commands.cmdid[(Page*6)+1].name].perm) && (!Commands.commands[Commands.cmdid[(Page*6)+1].name].console))]+global.prefix+Commands.cmdid[(Page*6)+1].name+""+global.csl[0]+": "+Commands.cmdid[(Page*6)+1].h)}catch(e){}
    try{global.cwc(""+["&c","&a"][+((global.getPerm(n)>=Commands.commands[Commands.cmdid[(Page*6)+2].name].perm) && (!Commands.commands[Commands.cmdid[(Page*6)+2].name].console))]+global.prefix+Commands.cmdid[(Page*6)+2].name+""+global.csl[0]+": "+Commands.cmdid[(Page*6)+2].h)}catch(e){}
    try{global.cwc(""+["&c","&a"][+((global.getPerm(n)>=Commands.commands[Commands.cmdid[(Page*6)+3].name].perm) && (!Commands.commands[Commands.cmdid[(Page*6)+3].name].console))]+global.prefix+Commands.cmdid[(Page*6)+3].name+""+global.csl[0]+": "+Commands.cmdid[(Page*6)+3].h)}catch(e){}
    try{global.cwc(""+["&c","&a"][+((global.getPerm(n)>=Commands.commands[Commands.cmdid[(Page*6)+4].name].perm) && (!Commands.commands[Commands.cmdid[(Page*6)+4].name].console))]+global.prefix+Commands.cmdid[(Page*6)+4].name+""+global.csl[0]+": "+Commands.cmdid[(Page*6)+4].h)}catch(e){}
    try{global.cwc(""+["&c","&a"][+((global.getPerm(n)>=Commands.commands[Commands.cmdid[(Page*6)+5].name].perm) && (!Commands.commands[Commands.cmdid[(Page*6)+5].name].console))]+global.prefix+Commands.cmdid[(Page*6)+5].name+""+global.csl[0]+": "+Commands.cmdid[(Page*6)+5].h)}catch(e){}
  }
}
module.exports = CommandHelp