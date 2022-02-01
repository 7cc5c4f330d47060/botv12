const readline=require("readline")
const fs=require("fs")
module.exports={
  description: "Log chat to console",
  load: (bot,things)=>{
    bot.muted1=0;
    bot.muted2=0;
    bot.muted3=0;
    bot.on("nicechat",(chat)=>{
      if(chat[0]=="You have been muted!"){bot.muted1=1;}
      if(chat[0]=="The chat has been cleared") return
      if(chat[0].startsWith("You have been muted for")){bot.muted1=1;}
      if(chat[0].endsWith("has muted player "+bot.username+".")){bot.muted2=1;}
      if(chat[0].startsWith("Your voice has been silenced for") || chat[0]=="Your voice has been silenced!"){bot.muted3=1;}
      if(chat[0].startsWith("Vanish for") && chat[0].endsWith("v6: disabled")) bot.unvanished=1
    })
    bot.on("nicechat",(chat)=>{
      if(bot.nochat) return
      bot.dq.push(chat[0])
      if(chat[0].includes("qemu-mc")) return
      if(chat[0].length===0) return
      readline.cursorTo(process.stdout,0)
      console.log("[Chat/"+things.bots.indexOf(bot)+"] "+chat[1]);
      let fw=new Date(Date.now());
      fs.appendFileSync("UBotLogs/"+fw.getUTCDate()+"_"+(fw.getUTCMonth()+1)+"_"+fw.getUTCFullYear()+"/"+bot.host+bot.port,things.getDateAndTime4L()+" "+chat[0]+"\n")
      things.rl.prompt(true)
    })
  }
}
