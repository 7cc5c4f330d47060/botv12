const cc=require("../commandblock.js");
module.exports={
	command:function(b,msg,sender,username){
		if(b.o.cc_enabled){
			for(let i=0;i<=cc.cs-1;i++){
				for(let j=0;j<=cc.cs-1;j++){
					for(let k=0;k<=cc.cs-1;k++){
						b.ccq.push("/tellraw "+username+" \"The command block thing is working! i:"+i+" j:"+j+" k:"+k+"\"");
					}
				}
			}
		} else {
			b.send("Command core is disabled, command will not run.");
			return;
		}
	},
	desc: "Command Blocks",
	usage: "",
	hidden: true
};

