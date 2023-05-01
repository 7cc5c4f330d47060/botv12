const index=require("../index.js");
const fs=require("fs");
const ba=fs.readFileSync("./ba.txt").toString();
module.exports={
	load: function(){
       	        index.p.advancecq=function(botno){
			if(index.bots[botno].chatqueue[0].length!=0){
				index.bots[botno].write("chat",{message:index.bots[botno].chatqueue[0]});
			}
			index.bots[botno].chatqueue.splice(0,1);
		};
		for(let i in index.bots){
			index.bots[i].on("success",function(){
				index.bots[i].chatqueue=ba.split("\n");
				index.bots[i].cqa=Function("index.p.advancecq("+i+")");
				setInterval(Function("index.p.advancecq("+i+")"),2500);
			});
		}
	}
};
