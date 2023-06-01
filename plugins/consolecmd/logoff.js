const index=require("../../index.js");
module.exports={
	command:function(msg){
		if(msg.split(" ")[1]==="*"){
			for(let i=0;i<index.bots.length;i++){
				if(!index.bots[i].o.disabled){
					index.bots[i].message("Bot logging off...");
					setTimeout(()=>{
						index.bots[i].reconnect=0;
						index.bots[i].end();
					},1000);
				}
			}
		} else {
			index.bots[+(msg.split(" ")[1])].message("Bot logging off...");
			setTimeout(()=>{
				index.bots[+(msg.split(" ")[1])].reconnect=0;
				index.bots[+(msg.split(" ")[1])].end();
			},1000);
		}
	},
	desc: "Log off a bot",
	usage: " <botid | *>"
};
