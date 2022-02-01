module.exports={
  description: "Rejoin on leave",
  load: (bot,things)=>{
    bot.on("end",()=>{
      clearInterval(bot.chatQueueInterval)
      clearInterval(bot.ccqi)
      setTimeout(()=>{things.bots[things.bots.indexOf(bot)]=things.createBot(bot.host,bot.port,bot.botopt)},5000)
    })
  }
}
