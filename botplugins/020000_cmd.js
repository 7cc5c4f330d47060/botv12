module.exports={
  description: "Run bot commands",
  load: (bot,things)=>{
    bot.prefix='?'
    bot.lastrun_global=0
    bot.chatmsg("current prefix: "+bot.prefix)
    bot.command=(b,c,u,things)=>{
      try{
        if(bot.lastrun_global>Date.now()-3000) return
        bot.lastrun_global=Date.now()
        if(u==b.uuid){ return }
        let truecmd = c.split(" ")[0].toLowerCase();
//console.log(truecmd,truecmd.length)
        if(!things.botcmds[truecmd]){return}
//console.log(2)
        if(!things.canRun(u,truecmd)){
          bot.write("chat",{message:"You may not run "+bot.prefix+truecmd+" because you do not have sufficient permissions."})
          return;
        }
//        if(bot.runned(c.split(" ")[0].toLowerCase,15000)==1) return
  //      if(bot.runned("A",3000)==1) return
        things.botcmds[truecmd].command(b,c,u,things)
      }catch(e){bot.write("chat",{message:e+"".substr(0,255)})}
    }
    bot.on("nicechat",(chat,p)=>{
//console.log(1)
      if(!chat[0].includes(": "+bot.prefix)){return}
      let cmd=chat[0].slice(chat[0].indexOf(": "+bot.prefix)+3)
      bot.command(bot,cmd,p.sender,things)
    })
  }
}
