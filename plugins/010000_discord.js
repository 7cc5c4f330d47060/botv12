const djs=require("discord.js")
module.exports={
  description: "Discord bot",
  load:(things)=>{
    if(!things.gconf.discord) return
    things.dbot=new djs.Client({intents:["GUILD_MESSAGES","GUILDS"]});
    setInterval(()=>{
      if(things.bots[0].dq.length==0) return
      things.dbot.channels.cache.get("914611330265264129").send(things.bots[0].dq.join("\n").replace(/\\/g,"\\\\").replace(/\@/g,"@\u200b").replace(/\`/g,"\\`").replace(/\//g,"\\/").replace(/\:/g,"\\:").replace(/\|/g,"\\|").substr(0,1990))
      things.bots[0].dq=[]
    },3000)
    things.dbot.on("messageCreate",(msg)=>{
      if(msg.author.id=="813669542508363826") return
      if(msg.channelId=="914611330265264129"){
        //things.dbot.channels.cache.get("914611330265264129").send("The discord bridge is disabled for now. Try again later.")
        things.bots[0].ccrun("/bcraw [UnnamedBot Discord] "+msg.author.username+": "+msg.content)
      }
    })
    things.dbot.login("")
    things.discordLoaded=1
  }
}
