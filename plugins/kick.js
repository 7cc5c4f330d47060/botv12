const _whitelist=require("../whitelist.json");
let whitelist=[]; 
let whitelist_regex=[];
for(const i in _whitelist){
	if(_whitelist[i].startsWith("regex:")){
		whitelist_regex.push(new RegExp(_whitelist[i].slice(6),"i"));
	} else {
		whitelist.push(_whitelist[i]);
	}
}
const settings=require("../settings.json");
const fs=require("fs");
const {uuidToInt}=require("./commandblock.js");
const {log_date,log_filename}=require("./chatlog.js");
const iswl=function(username,botusername){
	if(whitelist.includes(username)) return true;
	for(const i in whitelist_regex){
		if(username.match(whitelist_regex[i])){
			return true;
		}
	}
	if(username==botusername) return true;
	return false;
};
module.exports={
	load: function(){
		
	},
	load2: function(b){
		b.whitelist=false;
		b.lastKick=1293840000000; //January 1, 2011
		b.kick=function(player,uuid,reason){
			let player2;
			if(player=="@a" && uuid=="ffffffff-0000-0000-0000-000000000000"){
				player2=`@a[nbt=!{UUID:[I;${uuidToInt(b.uuid)}]}]`
			} else if(player=="@a"){
				player2=`@a[nbt=!{UUID:[I;${uuidToInt(b.uuid)}]},team=!ubotwl,team=!0000]`
			} else if(uuid && b.whitelist!=2){
				player2=`@a[nbt={UUID:[I;${uuidToInt(uuid)}]},team=!0000]`
			} else if(uuid){
				player2=`@a[nbt={UUID:[I;${uuidToInt(uuid)}]}]`
			} else if(b.whitelist!=2){
				player2=`@a[name=\"${player}\",team=!0000]`
			} else {
				player2=`@a[name=\"${player}\"]`
			}

			if(b.o.kick_method!="none"){
				const d=new Date();
				fs.appendFileSync(log_filename(Date.now(),b.host,b.port,"kick"),log_date()+` Player ${player} (${uuid}) kicked (${reason})\n`);
			}
			if(Date.now()-b.lastKick<=b.o.chatqueue_speed*3 && !b.o.cc_enabled && !b.whitelist){
				return;
			}
			b.lastKick=Date.now();
			if(b.o.kick_method=="sus" && b.o.cc_enabled){
				b.ccq.push(`/execute as ${player2} at @s run particle minecraft:dust_color_transition 9 1 0 3 3 3 3 ~ ~ ~ ~ ~ ~ 2147483646 2147483646 force @s`)
			}
			if(b.o.kick_method=="item" && b.o.cc_enabled){
				b.ccq.push(`/item replace entity ${player2} container.35 with stone{`+new Array(700).fill("a:{").join("")+new Array(700).fill("}").join("")+"}")
				//b.ccq.push(`/msg @a[name=${player},team=!0000]`);
			} else if(b.o.kick_method=="msg@e" && b.o.cc_enabled){
				b.ccq.push(`/msg ${player2} @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e`);
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
		b.whitelist_toggle=function(state,full){
			if(state==0){ //disabled
				b.whitelist=false;
				return;
			} else { //enabled
				if(full){
					b.whitelist=2;
				} else {
					b.whitelist=true;
				}
				if(state==2 && full){
					b.kick("@a","ffffffff-0000-0000-0000-000000000000","whitelist")
				} else if(state==2){
					b.ccq.push(`/team add ubotwl ${
						JSON.stringify({
							text:`${settings.name} ${settings.version} whitelist`,
							color: "green"
						})
					}`)
					for(const i in whitelist){
						b.ccq.push(`/team join ubotwl ${whitelist[i]}`);
					}
					b.kick("@a",null,"whitelist")
				}
			}
		}
		b.on("playerJoined",(name,uuid)=>{
			if(b.whitelist==true && !iswl(name,b.username) || b.whitelist==2){
				//console.log("bad name dewtectyi")
				//b.crashplayer(name,uuid);
				b.kick(name,uuid,"username");
			}
		})
	}
}