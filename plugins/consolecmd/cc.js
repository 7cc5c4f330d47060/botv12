const index=require("../../index.js");
module.exports={
	command:function(msg){
		if(msg.split(" ")[1]==="*"){
			for(let i=0;i<index.bots.length;i++){
				if(index.bots[i].real) index.bots[i].ccq.push(msg.slice(4+msg.split(" ")[1].length));
			}
		} else {	
			index.bots[+(msg.split(" ")[1])].ccq.push(msg.slice(4+msg.split(" ")[1].length));
		}
	},
	desc: "Run command in a command block",
	usage: " <botid | *> <command> [args...]"
};
