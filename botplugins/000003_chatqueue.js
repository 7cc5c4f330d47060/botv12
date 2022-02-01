module.exports={
  description: "Template plugin",
  load: (bot,things)=>{
    bot.chatQueue=["Version "+things.gconf.version,"/cspy on"]
    bot.chatmsg=((msg)=>{
      bot.chatQueue.push(msg.substr(0,256))
      if(msg.slice(256).length!=0){
        bot.chatmsg(msg.slice(256))
      }
    })
    bot.on("login",()=>{
      bot.chatQueueInterval=setInterval(()=>{if(bot.chatQueue.length>=1){bot.write("chat",{message:bot.chatQueue[0]});bot.chatQueue.shift();}},260)
    })
  }
}
