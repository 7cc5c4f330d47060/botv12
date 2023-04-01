const index=require("../../index.js")
module.exports={
	command:function(b,msg,sender,username){
		return;
		b.ccq.push(`/tellraw ${username} {"text":"This bot is called U8 or UBot (formerly UnnamedBot)."}`);
		b.ccq.push(`/tellraw ${username} {"text":"It is written in JavaScript using minecraft-protocol."}`);
		b.ccq.push(`/tellraw ${username} {"text":"Development for this version was started on 11 February 2023."}`);
		b.ccq.push(`/tellraw ${username} {"text":"The first version was made in August 2020."}`);
		b.ccq.push(`/tellraw ${username} {"text":"-------------------------","color":"black"}`);
		b.ccq.push(`/tellraw ${username} {"text":"No version of this bot has anything to do with the \\\"nocom exploit\\\"."}`);
	},
	desc: "Testing command",
	usage: "",
	hidden: true
}
