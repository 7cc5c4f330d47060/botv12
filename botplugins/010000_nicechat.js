module.exports={
  description: "Nice chat event",
  load: (bot,things)=>{
    bot.on("chat",(p)=>{
//      console.log(p.message)
      if(p.message.length!=0){
        bot.emit("nicechat",things.jparse(JSON.parse(p.message)),p)
      }
    })
  }
}
