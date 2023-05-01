const settings=require("../settings.json");
module.exports={
	load: function(){
	},
	load2: function(b){
		b.leftHand=Math.random()<=0.1;
		//console.log(b.leftHand)
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
			});
		});
		b.send(`Version ${settings.version}`);
		b.send(`current prefix: ${b.prefix}`);
	}
};
