module.exports={
  description: "Command core",
  load: (bot,things)=>{
    bot.on("success",()=>{
      bot.write("settings",{locale:"en_US",viewDistance:6,chatFlags:0,chatColors:true,skinParts:127,mainHand:0})
    })
    bot.cmdcorepos=[Math.floor((Math.floor(Math.random()*900000)+100000)*(Math.floor(Math.random()*2)*2-1)/16)*16,Math.floor((Math.floor(Math.random()*900000)+100000)*(Math.floor(Math.random()*2)*2-1)/16)*16]
    //bot.chatmsg("/tp "+bot.cmdcorepos[0]+".0 100 "+bot.cmdcorepos[1]+".0")
    bot.on("position",(p)=>{
      if(Math.floor(p.x)!=bot.cmdcorepos[0] || Math.floor(p.z)!=bot.cmdcorepos[1]){
        bot.wrongpos=1
      }
    })
//    setTimeout(()=>{bot.chatmsg("/forceload add "+bot.cmdcorepos[0]+" "+bot.cmdcorepos[1]+"")},1000)
//   setTimeout(()=>{bot.chatmsg("/fill "+bot.cmdcorepos[0]+" 0 "+bot.cmdcorepos[1]+" "+(bot.cmdcorepos[0]+15)+" 0 "+(bot.cmdcorepos[0]+15)+" command_block")},5000)
  }
}

