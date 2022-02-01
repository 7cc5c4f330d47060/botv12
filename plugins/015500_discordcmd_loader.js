const fs=require("fs")
module.exports={
  description:"Command loader for Discord commands",
  load:(things)=>{
    if(!things.gconf.discord) return
    things.discordcmds={};
    let cmd=fs.readdirSync("./disc_commands/")
    for(let i in cmd){
      if(!cmd[i].endsWith(".js")){
        return;
      }
      try{
        things.discordcmds[cmd[i].replace(/\.js/g,"")]=require("../disc_commands/"+cmd[i])
      }catch(e){console.log(e)}
    }
  }
}
