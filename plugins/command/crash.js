module.exports={
	command:function(b,msg){
		const args=msg.split(" ");
		b.crashplayer(args[1]);
		b.send("Crashing player "+args[1]);
	},
	desc: "Crash a player",
	usage: " <player>",
	hidden: true,
	verify: true
};
