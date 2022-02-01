module.exports={
  command:(cmd,things)=>{
    let botno=cmd.split(" ")[1]
    if(botno==="*"){
      for(let i in things.bots){
         things.bots[i].chatmsg(cmd.slice(5+1))
      }
      return
    }
    things.bots[+botno].chatmsg(cmd.slice(5+botno.length))
  }
}
