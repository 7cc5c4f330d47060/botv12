const Command = require("./command.js");
class CommandU extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=0;
  this.confirm=0;
  }
    command(c,n){
    for(var ie2=0;ie2<=15;ie2++){
  global.cwc('/tellraw '+n+' "\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'0\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'1\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'2\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+3+'\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'4\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'5\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'6\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'7\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'8\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'9\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'a\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'b\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'c\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'d\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'e\\u'+c.split(" ")[1]+''+(+ie2).toString(16)+'f"')}
  }
}
module.exports = CommandU