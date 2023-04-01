const index=require("../index.js")
const msg=require("./!message.js")
const blacklist=require("../blacklist.json")
module.exports={
	load: function(){
		index.p.testing=1.8
	},
	load2: function(b){
		b.players={};
		b.whitelist=false;
		b.on("player_info",function(packet){
			if(packet.action==0){
				for(let i in packet.data){
					if((blacklist.includes(packet.data[i].name) || msg.wordDetect(packet.data[i].name)) && b.o.cc_enabled){
						//console.log("bad name dewtectyi")
						b.ccq.push(`/minecraft:msg ${packet.data[i].name} @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e`)
					}
					if(packet.data[i].displayName){
						b.players[packet.data[i].UUID]=[msg.parse(JSON.parse(packet.data[i].displayName))[0],msg.parse(packet.data[i].name)[0]]
					} else {
						b.players[packet.data[i].UUID]=["@a",msg.parse(packet.data[i].name)[0]]
					}
					//console.log(b.players)
				}
			}
		})
	}
}
