const Command = require("./command.js");
const translate = require('@vitalets/google-translate-api');
translate:{
  command:(bot,name,c){try{
	translate(c.slice(c.split(" ")[1].length+c.split(" ")[2].length+4), { from: c.split(" ")[1], to: c.split(" ")[2] }).then(a=>{global.cwc(a.text)}).catch(()=>{});
  }catch(e){}}
}
module.exports = CommandT
