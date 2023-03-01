const index=require("../index.js")
module.exports={
	load: function(){
		index.p.testing=1.8
	},
	load2: function(b){
		b.leftHand=Math.random()<=0.1;
		console.log(b.leftHand)
		if(b.leftHand){
			//b.send("The bot is left handed!");
		}
		b.on("success",()=>{
			b.write("settings",{
				locale: "en_US",
				viewDistance: 4,
				chatFlags: 0,
				chatColors: true,
				skinParts: 127,
				mainHand: +!b.leftHand,
				enableServerListing: false
			})
		})
	}
}
