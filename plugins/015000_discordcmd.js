module.exports={
  description: "Discord bot Commands",
  load:(things)=>{
    if(!things.gconf.discord) return
    things.dbot.on("messageCreate",(msg)=>{
      try{
        if(msg.author.id=="813669542508363826") return
        if(!msg.content.startsWith("!")) return
        let truecmd = msg.content.slice(1).split(" ")[0].toLowerCase();
//        console.log(truecmd)
        if(!things.discordcmds[truecmd.split(" ")[0]]){msg.channel.send("Command does not exist, try !help for help");return;}
        if(!things.canRun_discord(msg.author.id,truecmd)){
          msg.channel.send("You may not run !"+truecmd+" because you do not have sufficient permissions.")
          return;
        }
        things.discordcmds[truecmd].command(msg,truecmd,things)
      }catch(e){console.log(e)}
    })    
  }
}
