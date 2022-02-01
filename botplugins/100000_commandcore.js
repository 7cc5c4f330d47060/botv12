module.exports={
  description: "more command core",
  load: (bot,things)=>{
    bot.chatmsg("/fill ~ 0 ~ ~15 0 ~15 command_block")
    bot.cci=0;
    bot.on("position",p=>{
      bot.x=p.x
      bot.y=p.y
      bot.z=p.z
      bot.pitch=p.pitch
      bot.yaw=p.yaw
    })
    bot.ccrun=(cmd)=>{
      bot.ccq.push(cmd)
    }
    bot.ccq=[];
    bot.ccqf=()=>{bot.ccrun_real(bot.ccq[0]);bot.ccq.shift();setTimeout(bot.ccqf,bot.ccqi)}
    bot.ccqi=1
    bot.ccrun_real=(cmd)=>{
      if(cmd===undefined) return
      if(cmd.startsWith("!")){ bot.ccqi=+(cmd.split("!").join("")); return;}
      cmd2=cmd.replace(/\\\\/g,"\u{100123}").split("\\") 
      for(var i in cmd2){
        bot.write("update_command_block",{location:{x:Math.floor(bot.x)+bot.cci%16,y:0,z:Math.floor(bot.z)+Math.floor(bot.cci/16)},command:cmd2[i].split("\u{100123}").join("\\"),mode:1,flags:4})
        bot.cci++;
        bot.cci=bot.cci%256
      }
    }
    bot.ccqf()
  }
}
