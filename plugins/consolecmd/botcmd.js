const index=require("../../index.js");
module.exports={
	command:function(msg){
		index.bots[+(msg.split(" ")[1])].rc(msg.slice(8+msg.split(" ")[1].length),"ffffffff-ffff-ffff-ffff-ffffffffffff","Owner",msg.slice(8+msg.split(" ")[1].length));
	},
	desc: "Run a bot-exclusive command",
	usage: " <botid> <command> [args...]"
};
