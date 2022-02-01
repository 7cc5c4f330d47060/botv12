module.exports={
  command:(bot,cmd,uuid,things)=>{
    //bot.write("chat",{message:"a"})
    let cmds=[];
    for(var i in things.botcmds){
      cmds.push(bot.prefix+i);
    }
    bot.write("chat",{message:cmds.join(" ")})
  }
}
