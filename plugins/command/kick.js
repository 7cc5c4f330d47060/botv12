const index=require("../../index.js")
module.exports={
	command:function(b,msg,sender,username){
		const args=msg.split(" ")
		if(args[1]=="@a" && args[1]=="confirm" && b.kickAllConfirm){
			b.kickAllConfirm=0;
			//b.ccq.push("/bcraw &bKicking all players in 10 seconds!")
			setTimeout(()=>{b.ccq.push("/say @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e")},10000)
		} else if(args[1]=="@a" && !b.kickAllConfirm){
			b.kickAllConfirm=1;
		} else {
			b.ccq.push("/msg "+msg.split(" ")[1]+" @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e")
			b.send("Kicking player "+msg.split(" ")[1])
		}
	},
	desc: "Testing command",
	usage: "",
	hidden: true,
	verify: true
}
