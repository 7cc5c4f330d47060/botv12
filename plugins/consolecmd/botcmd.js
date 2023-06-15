const index=require("../../index.js");
module.exports={
	command:function(msg){
		const args=msg.split(" ");
		const cmd=args.slice(2).join(" ");
		console.log(cmd)
		index.bots[+args[1]].rc(cmd.replace(/&([0-9a-fk-or])/g,"\u00a7$1"),"ffffffff-ffff-ffff-ffff-ffffffffffff","Owner",cmd);
	},
	desc: "Run a bot-exclusive command",
	usage: " <botid> <command> [args...]"
};
