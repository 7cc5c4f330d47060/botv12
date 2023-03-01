const index=require("../index.js")
const fs=require("fs")
const ba=fs.readFileSync("./ba.txt").toString()
module.exports={
        load: function(){
		
        }
	load2: function(b){
       	        b.advancecq=function(){
			if(b.chatqueue[0].length!=0){
				b.write("chat",{message:index.bots[botno].chatqueue[0]})
			}
			b.splice(0,1)
		}
		index.bots[i].on("success",function(){
			b.chatqueue=ba.split("\n")
			index.bots[i].cqa=Function("index.p.advancecq("+i+")")
			setTimeout(()=>{setInterval(,260)},2240)
		})
	
	}
}
