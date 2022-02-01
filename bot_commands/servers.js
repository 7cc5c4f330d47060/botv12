module.exports={
  command:(bot,cmd,uuid,things)=>{
    bot.chatmsg("You are currently on server "+bot.index+" ("+bot.host+(bot.port==25565?"":":"+bot.port)+").")
    bot.chatmsg("This bot is connected to these servers:")
    for(let i in things.bots){//(+
      bot.chatmsg("Server "+things.bots[i].index+" ("+(((things.bots[i].botopt.hidden==0 || things.bots[i].botopt.hidden==undefined) || bot.index==i)?(things.bots[i].host+(things.bots[i].port==25565?"":":"+things.bots[i].port)):"")+")")
    }
  }
}
