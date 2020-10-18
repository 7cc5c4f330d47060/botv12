console.log("Loading...");
'use strict';
global.bhs="./"
global.bs="./bot_helper_scripts/"
global.fs = require('fs');global.conf = require('./a.json');
exit=(v)=>{if(v){console.log("Done");process.exit(0)}}
global.mc = require('minecraft-protocol');const admin = require('is-elevated');
(async()=>{exit(await admin() && conf.allowAdmin && !conf.allowAdminConfirm)})();
global.commandQueue=[];global.chatQueue=[];global.chatLogQueue=[];global.confirmQueue=[];
global.chatQueueSpeed = conf.botChatQueueSpeed;
global.init = require(bhs+"LInit.js");
global.setup=require(bhs+"LSetup.js");
global.connect=require(bhs+"LConnect.js");
global.setup2=require(bhs+"LSetup2.js");
global.pt=a=>{var b=a;delete b.flags;delete b.teleportId;b.onGround=true;return b}
global.events=function(){
global.playerInfo=require(bhs+"PlayerInfoE.js"); global.ChatE=require(bhs+"ChatE.js");
client.on('player_info', global.playerInfo)
client.on('kick_disconnect', p=>{console.log(lang.tth(JSON.parse(p.reason.split("\n").join("\\n"))));setTimeout(function(){process.exit(0)},2000)})
client.on('tab_complete', p=>{global.cwc(global.csl[0]+"Results: "+global.csl[1]+p.matches.length);for(var i5a in p.matches){global.cwc(global.csl[1]+p.matches[i5a].match)}})
client.on('login', p=>{if(p.entityId){global.entityid=p.entityId}})
client.on('position', p=>{global.position=p;/*if(global.pa){global.pa=true;client.write("teleport_confirm",{teleportId:(p.teleportId?p.teleportId:0)});client.write("position_look",global.pt(position))}*/})
client.on('entity_status', p=>{if(p.entityId==global.entityid && p.entityStatus == 24){global.cwc("/op @s[type=player]")}})
client.on('chat', ChatE);
client.on('packet', (data, meta)=>{packetc=conf.packetSet;})
}

require("./run.js")()