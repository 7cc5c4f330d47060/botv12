const Command = require("./command.js");
const LockList = require("../bot_helper_scripts/LockList.js");
class CommandLock extends Command{
  constructor(csl,cwc,extra) {
  super(csl,cwc,extra);
  this.perm=5;
  this.confirm=0;
  this.h="lock <add/remove/get> <uuid> / lock <list/reset>"
  }
    command(c,n){
    if(c.split(" ")[1]=="add"){
      LockList.add(c.split(" ")[2])
      global.cwc("Added "+c.split(" ")[2]+" to the lock list.")
    } else if(c.split(" ")[1]=="remove"){
      LockList.remove(c.split(" ")[2])
      global.cwc("Removed "+c.split(" ")[2]+" from the lock list.")
    } else if(c.split(" ")[1]=="get"){
      global.cwc(c.split(" ")[2]+" "+["is not","is"][+(LockList.get(c.split(" ")[2]))]+" locked.")
    } else if(c.split(" ")[1]=="list"){
      var list = LockList.list()
      global.cwc("Lock list:")
      for(var i in list){
        global.cwc(list[i])
      }
      LockList.add(c.split(" ")[2])
    } else if(c.split(" ")[1]=="reset"){
      LockList.reset();
      global.cwc("Lock list reset.")
    } 
  }
}
module.exports = CommandLock