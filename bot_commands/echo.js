module.exports={
  command:(bot,cmd,uuid,things)=>{
    if(bot.runned(cmd.split(" ")[0].toLowerCase,15000)==1) return
    bot.chatmsg(cmd.slice(5))
  }
}
