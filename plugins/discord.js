//Discord Token:
//MTA4NjQ1OTIzMDE4MzI0MzgyOA.G0XDzk.nOP9QTJw_PQkynEsZxd3rmUR34UzR38AYUwCyo
//testing resumed for v9
const dj=require("discord.js");
const index=require("../index.js");
const settings=require("../settings.json");
const { request } = require('node:https');
const db=new dj.Client({intents:dj.GatewayIntentBits.Guilds+dj.GatewayIntentBits.GuildMessages+dj.GatewayIntentBits.MessageContent+dj.GatewayIntentBits.GuildMembers});


module.exports={
	load: function(){
		db.on("ready",()=>{
			for(const i in index.bots){
				if(index.bots[i].o.disabled) continue;
				if(!index.bots[i].o.discord_enabled) continue;
				index.bots[i].discordReady=true;
				index.bots[i].emit("dr");
			}
		});
		db.on("messageCreate",(msg)=>{
			if(msg.webhookId) return;
			if(msg.author.id==db.user.id) return;
			for(const i in index.bots){
				if(!index.bots[i].o.discord_enabled) continue;
				//console.log(msg.member.displayName)
				if(msg.channelId==index.bots[i].o.discord_channel){
					if(!index.bots[i].o.cc_enabled){
						index.bots[i].send((`[${msg.guild.name}] ${msg.member.displayName}: ${msg.content}`).substring(0,index.bots[i].o.chatqueue_split));
					} else {
						index.bots[i].ccq.push(`/tellraw @a ${
							JSON.stringify({
								translate:"[%s] %s%s%s",
								color:settings.colors.secondary,
								with:[
									{
										text:msg.guild.name,
										color:settings.colors.primary,
										hoverEvent:{
											action:"show_text",
											contents:{
												text:`Click to join!\n${settings.discordLink}`
											}
										},
										clickEvent:{
											action:"open_url",
											value:settings.discordLink
										}
									},
									{
										text:msg.member.displayName,
										color:settings.colors.primary
									},
									{
										text:" › ",
										color:settings.colors.tertiaryDark
									},
									{
										text:msg.content.replace(/\n/g,"\\n"),
										color:settings.colors.tertiary
									}
								]
							})
						}`);
					}
				}
			}
		});
		db.login(settings.discordtoken);
	},
	load2: function(b){
		b.disqueue=[];
		b.on("dr",()=>{
			b.di=setInterval(()=>{
				if(b.disqueue.length==0) return;
				if(!b.o.discord_webhook) return;
				/*db.channels.cache.get(b.o.discord_channel).send(`\`\`\`${b.disqueue.join("\n").substring(0,1994).replace(/@/g,"＠")}\`\`\``)
					.catch(console.log);*/
				const r = request(b.o.discord_webhook, {
					method:'POST',
					headers:{'Content-Type':'application/json'}
				}, ()=>{})
				r.on('error', console.log)
				r.write(JSON.stringify({'content':`\`\`\`${b.disqueue.join("\n").substring(0,1994).replace(/@/g,"＠")}\`\`\``}))
				r.end();
				b.disqueue=[];
			},2500);
		});
	}
};
