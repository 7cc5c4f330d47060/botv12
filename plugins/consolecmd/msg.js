const index=require("../../index.js");
module.exports={
	command:function(msg){
		if(msg.split(" ")[1]==="*"){
			for(let i=0;i<index.bots.length;i++){
				if(index.bots[i].real) index.bots[i].message(msg.slice(5+msg.split(" ")[1].length));
			}
		} else {	
			index.bots[+(msg.split(" ")[1])].message(msg.slice(5+msg.split(" ")[1].length));
		}
	},
	desc: "Send a bot announcement message",
	usage: " <botid | *> <message>"
};
