module.exports={
  command:(bot,cmd,uuid)=>{
    //bot.write("chat",{message:"a"})
    for(var i in bot.packet_detect){
      if(bot.packet_detect[i][0]!=bot.packet_detect[i][1]){
        bot.chatmsg("&c"+i+": "+bot.packet_detect[i][0]+" ("+bot.packet_detect[i][1]+")")
      } else {
        bot.chatmsg("&a"+i+": "+bot.packet_detect[i][0]+" ("+bot.packet_detect[i][1]+")")
      }
    }
  }
}
