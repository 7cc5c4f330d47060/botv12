const index=require("../index.js")
const settings=require("../settings.json")
//b.uuid
module.exports={
	load: function(){
		index.p.testing=1.8
	},
	load2: function(b){
		b.opped=0;
		b.nwordsaid=0;
		b.creativemode=0;
		b.usent=0;
		b.on("update_time",(a)=>{
			if(a.time>=10000){
				//b.send("/time set 1000")
			}
		})
		b.on("game_state_change",(a)=>{
			if(a.reason==3&&a.gameMode!=1){
				b.creativemode=0;
			} else if(a.reason==3&&a.gameMode==1){
				b.creativemode=1;
			}
		})
		b.on("success",()=>{
			b.fi=setInterval(()=>{
				if(b.pos.correct==0){
					if(b.o.ccore_teleport){
						b.send("/tp "+Math.floor(b.original_pos.x)+".0 "+b.original_pos.y+" "+Math.floor(b.original_pos.z)+".0");
					}
					b.send(`/fill ~2 0 ~2 ~-3 5 ~-3 command_block{CustomName:"{\\"text\\":\\"${settings.coreName}\\"}"}`)
					b.pos.correct=1
				}
				if(b.nwordsaid==1){
					//Big Blue Bubble will sue me if I keep this
					//b.send("Air Island Mammott")
					b.nwordsaid=0
				}
				if(b.opped==0){
					b.send("/op @s[type=player]")
				}
				if(b.usent==1){
					b.ccq.push(`I am a bot and not a player. You can get a list of my commands by running ${b.prefix}help!`)
					b.usent=0
				}
				if(b.creativemode==0){
					b.ccq.push("/gamemode creative")
					b.creativemode=1
				}
			},600)
		})
		b.on("login",(p)=>{
			b.entityId=p.entityId;
		})
		b.on("entity_status",(p)=>{
			//console.log(p)
			if(p.entityId==b.entityId && p.entityStatus==24){
				b.opped=0
			} else if(p.entityId==b.entityId && p.entityStatus==28){
				b.opped=1
				console.log(b.opped)
			}
		})
	},
}
