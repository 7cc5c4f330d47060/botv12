const Command = require("./command.js");
class CommandTabComplete extends Command{
  constructor(csl,cwc,extra) {
    super(csl,cwc,extra);
  this.perm=7;
  this.confirm=0;//|423314
  //this.u="|tc <515514|515504|515503|515502|515501|515500|512500|511500|510500|424414|422214|399214|394214|392890|391690|391151|390897|390857|390856|390791|390780|390674|172782>"
  }
    command(c,n){
	if((+(c.split(" ")[1]))==515514 || c.split(" ")[1]=="team"){
			global.client.write("tab_complete",{transactionId:515514,text:"/team remove "});
	} else if((+(c.split(" ")[1]))==515504 || c.split(" ")[1]=="bossbar"){
			global.client.write("tab_complete",{transactionId:515504,text:"/bossbar remove "});
	} else if((+(c.split(" ")[1]))==515503 || c.split(" ")[1]=="jail"){
			global.client.write("tab_complete",{transactionId:515503,text:"/rmjail "});
	} else if((+(c.split(" ")[1]))==515502 || c.split(" ")[1]=="kit"){
			global.client.write("tab_complete",{transactionId:515502,text:"/rmkit "});
	} else if((+(c.split(" ")[1]))==515501 || c.split(" ")[1]=="warp"){
			global.client.write("tab_complete",{transactionId:515501,text:"/rmwarp "});
	} else if((+(c.split(" ")[1]))==515500 || c.split(" ")[1]=="warp"){
			global.client.write("tab_complete",{transactionId:515500,text:"/rmhome "});
	} else if((+(c.split(" ")[1]))==512500 || c.split(" ")[1]=="fly"){
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * speed fly 1\",auto:1b} destroy")
	} else if((+(c.split(" ")[1]))==511500 || c.split(" ")[1]=="walk"){
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * speed walk 1\",auto:1b} destroy")
	} else if((+(c.split(" ")[1]))==510500 || c.split(" ")[1]=="effect"){
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/effect clear @a\",auto:1b} destroy")
	} else if((+(c.split(" ")[1]))==424414 || c.split(" ")[1]=="scoreboard"){
			global.client.write("tab_complete",{transactionId:424414,text:"/scoreboard objectives remove "});
	} else if((+(c.split(" ")[1]))==422214 || c.split(" ")[1]=="ipban"){
			global.client.write("tab_complete",{transactionId:422214,text:"/pardon-ip "});
	} else if((+(c.split(" ")[1]))==399214 || c.split(" ")[1]=="op"){
		global.client.write("tab_complete",{transactionId:399214,text:"/deop "});
	} else if((+(c.split(" ")[1]))==394214 || c.split(" ")[1]=="title"){
		global.cwc("/title @a clear")
	} else if((+(c.split(" ")[1]))==392890 || c.split(" ")[1]=="cspy"){
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * c off\",auto:1b} destroy")
	} else if((+(c.split(" ")[1]))==391690 || c.split(" ")[1]=="prefix"){
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * prefix off\",auto:1b} destroy")
	} else if((+(c.split(" ")[1]))==391151 || c.split(" ")[1]=="nickname"){
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * nick off\",auto:1b} destroy")
	} else if((+(c.split(" ")[1]))==390897 || c.split(" ")[1]=="godmode"){
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * god off\",auto:1b} destroy")
	} else if((+(c.split(" ")[1]))==390857 || c.split(" ")[1]=="vanish"){
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * v off\",auto:1b} destroy")
	} else if((+(c.split(" ")[1]))==390856 || c.split(" ")[1]=="disguise"){
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * u\",auto:1b} destroy")
	} else if((+(c.split(" ")[1]))==390791 || c.split(" ")[1]=="inv"){
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/ci **\",auto:1b} destroy")
	} else if((+(c.split(" ")[1]))==390780 || c.split(" ")[1]=="money"){
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"eco set ** 0\",auto:1b} destroy")
	} else if((+(c.split(" ")[1]))==390674 || c.split(" ")[1]=="worldedit"){
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * /sel\",auto:1b} destroy");
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * /clearclipboard\",auto:1b} destroy");
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * /undo 50\",auto:1b} destroy");
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * /clearhistory\",auto:1b} destroy");
	} else if((+(c.split(" ")[1]))==172782 || c.split(" ")[1]=="full"){
		global.client.write("tab_complete",{transactionId:515514,text:"/team remove "});
		global.client.write("tab_complete",{transactionId:515504,text:"/bossbar remove "});
		global.client.write("tab_complete",{transactionId:515503,text:"/rmjail "});
		global.client.write("tab_complete",{transactionId:515502,text:"/rmkit "});
		global.client.write("tab_complete",{transactionId:515501,text:"/rmwarp "});
		global.client.write("tab_complete",{transactionId:515500,text:"/rmhome "});
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * speed fly 1\",auto:1b} destroy")
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * speed walk 1\",auto:1b} destroy")
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/effect clear @a\",auto:1b} destroy")
		global.client.write("tab_complete",{transactionId:424414,text:"/scoreboard objectives remove "});
		global.client.write("tab_complete",{transactionId:422214,text:"/pardon-ip "});
		global.cwc("/title @a clear")
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * c off\",auto:1b} destroy")
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * prefix off\",auto:1b} destroy")
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * nick off\",auto:1b} destroy")
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * god off\",auto:1b} destroy")
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * v off\",auto:1b} destroy")
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * u\",auto:1b} destroy")
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/ci **\",auto:1b} destroy")
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/eco set ** 0\",auto:1b} destroy")
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * /sel\",auto:1b} destroy");
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * /clearclipboard\",auto:1b} destroy");
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * /undo 50\",auto:1b} destroy");
		global.cwc("/setblock ~ 15 ~ minecraft:command_block{Command:\"/sudo * /clearhistory\",auto:1b} destroy");
	}
  }
}
module.exports = CommandTabComplete