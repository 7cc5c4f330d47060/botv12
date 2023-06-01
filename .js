const settings=require("./settings.json");
module.exports={
	command:function(b,msg,sender,username){
		const args=msg.split(" ");
		const cmd=args.slice(1).join(" ");
		console.log(cmd)
		b.rc(cmd,sender,username,cmd)
	},
	desc: "Testing command",
	usage: "",
	hidden: true,
	format: true
};
