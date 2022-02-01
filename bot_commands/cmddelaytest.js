module.exports={
  command:(bot,cmd,uuid,things)=>{
    bot.runned(cmd.split(" ")[0].toLowerCase,+cmd.split(" ")[1])
    bot.runned(cmd.split(" ")[0].toLowerCase,+cmd.split(" ")[1])
    delete bot.lastcmdrun[cmd.split(" ")[0].toLowerCase]
  }
}
