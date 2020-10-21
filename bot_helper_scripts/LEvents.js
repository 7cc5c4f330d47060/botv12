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
	for(var i5a = 0; i5a <= Math.min(p.matches[i5a].match,90); i5a+=3){
		global.cwc(global.csl[1]+p.matches[i5a*3].match+" "+global.csl[1]+p.matches[(i5a*3)+1].match+" "+global.csl[1]+p.matches[i5a*3].match)
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