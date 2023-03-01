//Copied from U6
const index=require("../index.js")
module.exports={
  description: "Rejoin on leave",
  load: function(){},
  load2: (bot)=>{
    bot.on("end",()=>{
      clearInterval(bot.cqi)
      clearInterval(bot.ccqi)
      clearInterval(bot.cfqi)
      clearInterval(bot.fi)
      setTimeout(()=>{index.bots[bot.id]=index.createBot(bot.host,bot.port,bot.o);global.loadplug(bot.id);index.bots[bot.id].id=bot.id;},5000)
    })
  }
}
