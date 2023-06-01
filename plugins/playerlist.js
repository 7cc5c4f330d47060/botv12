const msg=require("./!message.js");
const blacklist=require("../blacklist.json");
const whitelist=require("../whitelist.json");
const {uuidToInt}=require("./commandblock.js");
const {log_date}=require("./!message.js");
const fs=require("fs");
const iswl=function(username,botusername){
	if(whitelist.includes(username)) return true;
	if(username==botusername) return true;
	return false;
};
module.exports={
	load: function(){
	},
	load2: function(b){
		b.players={};
		b.players_o={};
		b.whitelist=false;
		b.lastKick=1293840000000; //January 1, 2011
		b.kick=function(player,uuid,reason){
			if(b.o.kick_method!="none"){
				const d=new Date();
				fs.appendFileSync("UBotLogs/"+d.getUTCDate()+"_"+(d.getUTCMonth()+1)+"_"+d.getUTCFullYear()+"/kick_"+b.host+"_"+b.port+".txt",log_date()+` Player ${player} (${uuid}) kicked (${reason})\n`);
			}
			if(Date.now()-b.lastKick<=b.o.chatqueue_speed*3 && !b.o.cc_enabled && !b.whitelist){
				return;
			}
			b.lastKick=Date.now();
			if(b.o.kick_method=="item" && b.o.cc_enabled && uuid){
				b.ccq.push(`/item replace entity @a[nbt={UUID:[I;${uuidToInt(uuid)}]},team=!0000] container.35 with stone{`+new Array(700).fill("a:{").join("")+new Array(700).fill("}").join("")+"}")
				//b.ccq.push(`/msg @a[nbt={UUID:[I;${uuidToInt(uuid)}]},team=!0000] @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e`);
			} else if(b.o.kick_method=="item" && b.o.cc_enabled){
				b.ccq.push(`/item replace entity @a[name=\"${player}\",team=!0000] container.35 with stone{`+new Array(700).fill("a:{").join("")+new Array(700).fill("}").join("")+"}")
				//b.ccq.push(`/msg @a[name=${player},team=!0000]`);
			} else if(b.o.kick_method=="msg@e" && b.o.cc_enabled && uuid){
				b.ccq.push(`/msg @a[nbt={UUID:[I;${uuidToInt(uuid)}]},team=!0000] @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e`);
			} else if(b.o.kick_method=="msg@e" && b.o.cc_enabled){
				b.ccq.push(`/msg @a[name=${player},team=!0000] @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e`);
			} else if(b.o.kick_method=="tp" && b.o.partial_op){
				b.send(`/sudo ${player} etp 30000000 ~ 30000000`);
			} else if(b.o.kick_method=="tp" && b.o.cc_enabled){
				b.ccq.push(`/tpo ${player} 30000000 ~ 30000000`);
			} else if(b.o.kick_method=="none"){ 
				return;
			}
		};
		b.crashplayer=function(player,uuid){
			if(b.o.cc_enabled && uuid){
				b.ccq.push(`/tellraw @a[nbt={UUID:[I;${uuidToInt(uuid)}]},team=!0000] {"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"outOfMemory.message"}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}`);
			} else if(b.o.cc_enabled){
				b.ccq.push(`/tellraw @a[name=${player},team=!0000] {"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"%s%1$s","with":[{"translate":"outOfMemory.message"}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}`);
			} else return;
		};
		b.on("player_info",function(packet){
			//console.log(packet)
			if(packet.action==0){
				for(const i in packet.data){
					if(blacklist.includes(packet.data[i].name) || msg.wordDetect(packet.data[i].name) || (b.whitelist==true && !iswl(packet.data[i].name,b.username))){
						//console.log("bad name dewtectyi")
						b.crashplayer(packet.data[i].name,packet.data[i].UUID);
						b.kick(packet.data[i].name,packet.data[i].UUID,"username");
					}
					if(packet.data[i].displayName){
						b.players[packet.data[i].UUID]=[msg.parse(JSON.parse(packet.data[i].displayName))[2],msg.parse(packet.data[i].name)[0]];
					} else {
						b.players[packet.data[i].UUID]=["@a",msg.parse(packet.data[i].name)[0]];
					}
					b.players_o[packet.data[i].UUID]=packet.data[i];
				}
			} else if(packet.action==3){
				for(const i in packet.data){
					if(b.players[packet.data[i].UUID] && packet.data[i].displayName){
						b.players[packet.data[i].UUID][0]=msg.parse(JSON.parse(packet.data[i].displayName))[2];
					}
					if(b.players_o[packet.data[i].UUID] && packet.data[i].displayName){
						b.players_o[packet.data[i].UUID].displayName=packet.data[i].displayName;
					}
				}
			} else if(packet.action==63){
				for(const i in packet.data){
					packet.data[i].name=packet.data[i].player.name;
					if(blacklist.includes(packet.data[i].name) || msg.wordDetect(packet.data[i].name) || (b.whitelist==true && iswl(packet.data[i].name,b.username))){
						//console.log("bad name dewtectyi")
						b.crashplayer(packet.data[i].name,packet.data[i].uuid);
						b.kick(packet.data[i].name,packet.data[i].uuid,"username");
					}
					if(packet.data[i].displayName){
						b.players[packet.data[i].uuid]=[msg.parse(JSON.parse(packet.data[i].displayName))[0],msg.parse(packet.data[i].name)[0]];
					} else {
						b.players[packet.data[i].uuid]=["@a",msg.parse(packet.data[i].name)[0]];
					}
					b.players_o[packet.data[i].uuid]=packet.data[i];
				}
			} else if(packet.action==4){
				for(let i in packet.data){
					b.emit("_player_remove",{players:[packet.data[i].UUID]});
				}
			}
		});
		const remove=function(packet){
			//console.log(packet);
			for(let i in packet.players){
				//console.log(b.players_o[packet.players[i]])
				delete b.players_o[packet.players[i]];
				//console.log(b.players_o[packet.players[i]])
			}
		};
		b.on("player_remove",remove);
		b.on("_player_remove",remove);
	}
};
