const djs=require("discord.js")
module.exports={
  description: "Discord bot",
  load:(things)=>{
    things.dbot=new djs.Client();
    things.dbot.login("")
  }
}
