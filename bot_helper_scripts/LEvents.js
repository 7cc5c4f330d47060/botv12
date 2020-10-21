module.exports=()=>{
global.playerInfo=require(bhs+"PlayerInfoE.js");
global.ChatE=require(bhs+"ChatE.js");
client.on('player_info', global.playerInfo)
client.on('kick_disconnect', 
p=>{
	console.log(lang.tth(JSON.parse(p.reason.split("\n").join("\\n"))));
	setTimeout(function(){process.exit(0)},2000)
	}
)
client.on('tab_complete', p=>{
		global.cwc(global.csl[0]+"Results: "+global.csl[1]+p.matches.length);
	if(p.transactionId==515514){
		for(var i5a in p.matches){
			global.cwc("/team remove "+p.matches[i5a].match)
		}
	} else if(p.transactionId==515504){
		for(var i5a in p.matches){
			global.cwc("/bossbar remove "+p.matches[i5a].match)
		}
	} else if(p.transactionId==424414){
		for(var i5a in p.matches){
			global.cwc("/scoreboard objectives remove "+p.matches[i5a].match)
		}
	} else if(p.transactionId==423314){
		for(var i5a in p.matches){
			global.cwc("/pardon "+p.matches[i5a].match)
		}
	} else if(p.transactionId==422214){
		for(var i5a in p.matches){
			global.cwc("/pardon-ip "+p.matches[i5a].match)
		}
	} else if(p.transactionId==399214){
		for(var i5a in p.matches){
			global.cwc("/deop "+p.matches[i5a].match)
		}
	}
)
client.on('login', p=>{
	if(p.entityId){
		global.entityid=p.entityId
	}
	}
)
client.on('position', p=>{global.position=p;/*if(global.pa){global.pa=true;client.write("teleport_confirm",{teleportId:(p.teleportId?p.teleportId:0)});client.write("position_look",global.pt(position))}*/})
client.on('entity_status', p=>{if(p.entityId==global.entityid && p.entityStatus == 24){global.cwc("/op @s[type=player]")}})
client.on('chat', ChatE);
client.on('packet', (data, meta)=>{packetc=conf.packetSet;})
}