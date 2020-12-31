console.log("Loading...");
'use strict';
global.bhs="./"
global.bs="./bot_helper_scripts/"
global.fs = require('fs');global.conf = require('./a.json');
exit=(v)=>{if(v){console.log("Done");process.exit(0)}}
const admin = require('is-elevated');
(async()=>{exit(await admin() && conf.allowAdmin && !conf.allowAdminConfirm)})();
global.commandQueue=[];global.chatQueue=[];global.chatLogQueue=[];global.confirmQueue=[];
global.chatQueueSpeed = conf.botChatQueueSpeed;
global.init = require(bs+"LInit.js");
global.setup=require(bs+"LSetup.js");
global.connect=require(bs+"LConnect.js");
global.setup2=require(bs+"LSetup2.js");
global.pt=a=>{var b=a;delete b.flags;delete b.teleportId;b.onGround=true;return b}
global.events=require(bs+"LEvents.js");

require("./run.js")()