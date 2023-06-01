const settings=require("../../settings.json");
module.exports={
	command:function(b,msg,sender,username){
		if(b.o.cc_enabled){
			b.send(`/fill ~2 10 ~2 ~-3 15 ~-3 command_block${b.o.legacy_cc?"":`{CustomName:"{\\"text\\":\\"${settings.coreName}\\"}"}`}`);
			b.send("Core refilled!")
		}
	},
	desc: "Testing command",
	usage: "",
	aliases:["refill","refillcore"]
};

