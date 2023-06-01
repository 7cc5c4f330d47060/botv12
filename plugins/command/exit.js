
module.exports={
	command:function(b){
		//b.ccq.push(`/tellraw @a [{"text":"${b.username.replace(/=/,"\\u003d")}","color":"gray"},{"text":" left the game","color":"yellow"}]`)
		b.tellraw("@a",JSON.stringify({
			translate:"multiplayer.player.left",
			with:[
				{selector:b.uuid}
			],
			color:"yellow"
		}))	
	},
	desc: "Closes the bot",
	usage: "",
	opRequired: true
};
