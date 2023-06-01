const index=require("../../index.js");
module.exports={
	command:function(msg){
		if(msg.split(" ")[1]==="*"){
			for(let i=0;i<index.bots.length;i++){
				if(!index.bots[i].o.disabled){
					index.bots[i].message("Bot restarting...");
					setTimeout(()=>{index.bots[i].end();},1000);
				}
			}
		} else {
			index.bots[+(msg.split(" ")[1])].message("Bot restarting...");
			setTimeout(()=>{index.bots[+(msg.split(" ")[1])].end();},1000);
		}
	},
	desc: "Relog a bot (log off and back on)",
	usage: " <botid | *>"
};
