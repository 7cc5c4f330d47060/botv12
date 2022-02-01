const fs=require("fs")
module.exports={
  description:"Command loader for bot commands",
  load:(things)=>{
    things.botcmds={};
    let cmd=fs.readdirSync("./bot_commands/")
    for(let i in cmd){
      if(!cmd[i].endsWith(".js")){
        continue;
      }
      try{
        //console.log(cmd)
        things.botcmds[cmd[i].replace(/\.js/g,"")]=require("../bot_commands/"+cmd[i])
        things.botcmds[cmd[i].replace(/\.js/g,"")].mod="unnamedbot_v6"
      }catch(e){console.log(e)}
    }
  }
}
