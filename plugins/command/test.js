const index=require("../../index.js")
module.exports={
	command:function(b,msg,sender,username){
		//b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
		b.ccq.push("/tellraw "+username+" \"Command: "+msg+" from UUID "+sender+" ("+username+")\"")
	},
	desc: "Testing command",
	usage: " "
}
