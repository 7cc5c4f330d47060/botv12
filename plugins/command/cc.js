const index=require("../../index.js");
const cc=require("../commandblock.js");
module.exports={
	command:function(b,msg,sender,username){
		for(let i=0;i<=cc.cs-1;i++){
			for(let j=0;j<=cc.cs-1;j++){
				for(let k=0;k<=cc.cs-1;k++){
					b.ccq.push("/tellraw "+username+" \"The command block thing is working! i:"+i+" j:"+j+" k:"+k+"\"")
				}
			}
		}
	},
	desc: "Command Blocks",
	usage: " "
}

