const index=require("../../index.js")
module.exports={
	command:function(b,msg,sender,username,verify){
		//b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
		if(b.o.partial_op || b.o.deop){
			b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
			return;
		}
		b.tellraw(sender,`{"translate":"Command: %s from UUID %s (%s)","color":"aqua","with":[{"text":"${msg}","color":"#FF96FC"},{"text":"${sender}","color":"#FF96FC"},{"text":"${username}","color":"#FF96FC"}]}`)
	},
	desc: "Testing command",
	usage: ""
}
