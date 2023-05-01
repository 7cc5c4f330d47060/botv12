const index=require("../../index.js");
module.exports={
	command:function(msg){
		if(msg.split(" ")[1]==="*"){
			for(let i=0;i<index.bots.length;i++){
				index.bots[i].send(msg.slice(5+msg.split(" ")[1].length));
			}
		} else {	
			index.bots[+(msg.split(" ")[1])].send(msg.slice(5+msg.split(" ")[1].length));
		}
	},
	desc: "Send a message or command to chat",
	usage: " <botid | *> <message>"
};
