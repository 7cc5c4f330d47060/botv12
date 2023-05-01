const index=require("../../index.js");
module.exports={
	command:function(msg){
		if(msg.split(" ")[1]==="*"){
			for(let i=0;i<index.bots.length;i++){
				if(!index.bots[i].o.disabled){
					index.bots[i].end();
				}
			}
		} else {
			index.bots[+(msg.split(" ")[1])].end();
		}
	},
	desc: "Relog a bot (log off and back on)",
	usage: " <botid | *>"
};
