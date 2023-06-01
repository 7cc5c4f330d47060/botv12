const settings=require("../settings.json");
//b.uuid
module.exports={
	load: function(){
		
	},
	load2: function(b){
		b.check=!b.o.nocheck
		b.opped=0;
		b.nwordsaid=0;
		b.creativemode=0;
		b.usent=0;
		b.commandspy=0;
		/*b.on("update_time",(a)=>{
			if(a.time>=10000 && !(b.o.partial_op || b.o.deop)){
				if(!b.o.cc_enabled){
					b.send("/minecraft:time set 1000");
				} else {
					b.ccq.push("/minecraft:time set 1000");
				}
			}
		});*/
		b.on("game_state_change",(a)=>{
			if(a.reason==3&&a.gameMode!=1){
				b.creativemode=0;
			} else if(a.reason==3&&a.gameMode==1){
				b.creativemode=1;
			}
		});
		b.on("success",()=>{
			b.fi=setInterval(()=>{
				if(!b.check) return;
				if(b.nwordsaid>=1){
					b.nwordsaid=0;
				}
				if(b.usent==1){
					b.send(`I am a bot and not a player. You can get a list of my commands by running ${b.prefix}help.`);
					b.usent=0;
				}
				if(!b.o.deop){
					if(b.muted==1){
						b.send(`/mute ${b.uuid} 0s`);
						b.muted=0;
					}
				}
				if(!b.o.partial_op && !b.o.deop){
					if(b.o.cc_enabled && b.pos.correct==0){
						/*if(b.o.ccore_teleport){
							b.send("/tp "+Math.floor(b.original_pos.x)+".0 "+b.original_pos.y+" "+Math.floor(b.original_pos.z)+".0");
						}*/
						b.send(`/fill ~2 10 ~2 ~-3 15 ~-3 command_block${b.o.legacy_cc?"":`{CustomName:"{\\"text\\":\\"${settings.coreName}\\"}"}`}`);
						b.pos.correct=1;
					}
					if(b.opped==0){
						b.send("/op @s[type=player]");
					}
					if(b.creativemode==0){
						b.send("/gamemode creative");
						b.creativemode=1;
					}
					if(b.commandspy==false){
						b.send("/cspy on");
						b.commandspy=true;
					}
				}
			},600);
		});
		b.on("login",(p)=>{
			b.entityId=p.entityId;
		});
		b.on("entity_status",(p)=>{
			//console.log(p)
			if(p.entityId==b.entityId && p.entityStatus==24){
				b.opped=0;
			} else if(p.entityId==b.entityId && p.entityStatus==28){
				b.opped=1;
			}
		});
	},
};
