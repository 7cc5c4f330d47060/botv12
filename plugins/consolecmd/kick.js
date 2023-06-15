const index=require("../../index.js");
module.exports={
	command:function(msg){
		const args=msg.split(" ");
		args.shift();
		const bot=+args.shift();
		const kickedplayer=args.slice(1).join(" ");
		index.bots[bot].kick(kickedplayer,undefined,"command");
		index.bots[bot].send("Kicking player "+args[1]);
		console.log("Kicking player "+args[1])
	},
	desc: "Kick a player",
	usage: " <player>",
	hidden: true,
	verify: true
};
//nbt={UUID:[I;${uuidToInt(uuid)}]}
//eval index.bots[0].ccq.push("/give 75a0985a1353b0c1 stone{"+new Array(700).fill("a:{").join("")+new Array(700).fill("}").join("")+"}")
