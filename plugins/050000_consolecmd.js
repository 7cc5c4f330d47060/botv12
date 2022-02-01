const fs=require("fs")
module.exports={
  description:"Command loader for console commands",
  load:(things)=>{
    things.consolecmds={};
    let cmd=fs.readdirSync("./console_commands/")
    for(let i in cmd){
      if(!cmd[i].endsWith(".js")){
        return;
      }
      try{
        things.consolecmds[cmd[i].replace(/\.js/g,"")]=require("../console_commands/"+cmd[i])
      }catch(e){}
    }
  }
}
