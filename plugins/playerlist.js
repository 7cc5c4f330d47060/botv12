const index=require("../index.js")
const msg=require("./!message.js")
module.exports={
	load: function(){
		index.p.testing=1.8
	},
	load2: function(b){
		b.players={};
		b.on("player_info",function(packet){
			if(packet.action==0){
				for(let i in packet.data){
					if(packet.data[i].displayName){
						b.players[packet.data[i].UUID]=[msg.parse(JSON.parse(packet.data[i].displayName))[0],msg.parse(packet.data[i].name)[0]]
					} else {
						b.players[packet.data[i].UUID]=["Invalid Username",msg.parse(packet.data[i].name)[0]]
					}
					//console.log(b.players)
				}
			}
		})
	}
}
