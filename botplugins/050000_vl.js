//detect op, gamemode etc
module.exports={
  description: "Detect changes to OP, gamemode, etc",
  load: (bot,things)=>{
    bot.packet_detect={};
    bot.on("login",(p)=>{
      bot.ent_id=p.entityId
      console.log("Entity ID for bot "+things.bots.indexOf(bot)+" is "+bot.ent_id)
    })
    bot.on("entity_status",(p)=>{
      if(p.entityId=bot.ent_id && p.entityStatus==24){
        bot.chatmsg("")
        bot.chatmsg("/op @s[type=player]")
      }
    })
    setInterval(()=>{
      if(bot.wrongpos==1){
        bot.chatmsg("/fill ~ 0 ~ ~15 0 ~15 command_block")
        bot.wrongpos=0;
      }
    },500)
    setInterval(()=>{
      if(bot.unvanished==1){
        bot.chatmsg("/v on")
        bot.unvanished=0
      }
    },500)
    setInterval(()=>{
      if((bot.muted1 && bot.muted2) || bot.muted3){
        bot.chatmsg("/mute "+bot.uuid)
        bot.muted1=0;
        bot.muted2=0;
        bot.muted3=0;
      }
    })
    bot.on("world_border",(p)=>{
      console.log(p)
      if(p.radius!=undefined){
        bot.packet_detect.wb_rad=[p.radius,60000000]
      }
      if(p.x!=undefined){
        bot.packet_detect.wb_x=[p.x,0]
      }
      if(p.z!=undefined){
        bot.packet_detect.wb_z=[p.z,0]
      }
    })
  }
}
