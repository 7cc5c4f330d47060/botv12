const index=require("../../index.js")
module.exports={
	command:function(b,msg,sender,username){
		b.ccq.push(`/tellraw @a [{"text":"${b.username.replace(/=/,"\\u003d")}","color":"gray"},{"text":" left the game","color":"yellow"}]`)
	},
	desc: "Closes the bot",
	usage: " "
}
