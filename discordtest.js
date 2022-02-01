const djs=require("discord.js")
dbot=new djs.Client({intents:["GUILD_MESSAGES","GUILDS"]});
dbot.on("messageCreate",(msg)=>{console.log("a")})
dbot.login("")
