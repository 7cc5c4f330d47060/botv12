const readln=require("readline")
module.exports={
  description: "Template plugin",
  load: (things)=>{
    things.rl=readln.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    things.rl.on("line",(l)=>{
      try{
        things.consolecmds[l.toString().toLowerCase().split(" ")[0]].command(l,things)
      }catch(e){
        console.log(e)
      }
      things.rl.prompt(false)
    })
    things.rl.prompt()
  }
}
