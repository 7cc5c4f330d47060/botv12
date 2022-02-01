module.exports={
  command:(cmd,things)=>{
    let botno=cmd.split(" ")[1]
    things.bots[+botno].command(things.bots[+botno],cmd.slice(8+botno.length),"CONSOLE",things)
  }
}
