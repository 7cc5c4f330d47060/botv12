
module.exports={
	command:function(b){
		//b.ccq.push(`/tellraw @a [{"text":"${b.username.replace(/=/,"\\u003d")}","color":"gray"},{"text":" left the game","color":"yellow"}]`)
		b.ccq.push(`/tellraw @a [{"selector":"${b.uuid}","color":"yellow"},{"text":" left the game","color":"yellow"}]`);
	},
	desc: "Closes the bot",
	usage: "",
	opRequired: true
};
