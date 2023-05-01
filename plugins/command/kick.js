const {uuidToInt}=require("../commandblock.js");
const {log_date}=require("../!message.js");
const fs=require("fs");
module.exports={
	command:function(b,msg){
		const args=msg.split(" ");
		if(args[1]=="@a"){
			b.ccq.push(`/msg @a[nbt=!{UUID:[I;${uuidToInt(b.uuid)}]}] @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e`);
			b.send("Kicking all players");
		} else {
			b.kick(args[1]);
			const d=new Date();
			fs.appendFileSync("UBotLogs/"+d.getUTCDate()+"_"+(d.getUTCMonth()+1)+"_"+d.getUTCFullYear()+"/kick_"+b.host+"_"+b.port+".txt",log_date()+` Player ${args[1]} (no UUID) kicked (command)\n`);
			b.send("Kicking player "+args[1]);
		}
	},
	desc: "Kick a player",
	usage: " <player>",
	hidden: true,
	verify: true
};
//nbt={UUID:[I;${uuidToInt(uuid)}]}