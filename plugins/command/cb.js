const cc=require("../commandblock.js");
module.exports={
	command:function(b,msg,sender,username){
		const args=msg.split(" ");
		if(b.o.cc_enabled){
			b.ccq.push(args.slice(1,args.length).join(" "))
		} else {
			b.send("Command core is disabled, command will not run.");
			return;
		}
	},
	desc: "Run a command in a command block",
	usage: "",
	hidden: true,
	coreRequired: true,
	aliases: ["cc","commandblock","cblock"]
};

