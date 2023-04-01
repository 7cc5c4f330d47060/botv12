//copied from u6
const readln=require("readline")
const index=require("../index.js")
module.exports={
  description: "Template plugin",
  load: ()=>{
    index.p.rl=readln.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "\x1b[0m\x1b[38;5;15m> "
    })
    index.p.rl.on("line",(l)=>{
    //00000000-0000-0000-0000-Console00000
      try{
	if(l.toLowerCase().startsWith("say")){
		if(l.split(" ")[1]==="*"){
			for(let i=0;i<index.bots.length;i++){
				index.bots[i].send(l.slice(5+l.split(" ")[1].length))
			}
		} else {	
			index.bots[+(l.split(" ")[1])].send(l.slice(5+l.split(" ")[1].length))
		}
	
	} else if(l.toLowerCase().startsWith("eval") && !index.secure){
		readln.cursorTo(process.stdout,0);
		readln.clearLine(process.stdout,0);
		console.log(eval(l.slice(5)))
	} else if(l.toLowerCase().startsWith("cc")){
		if(l.split(" ")[1]==="*"){
			for(let i=0;i<index.bots.length;i++){
				index.bots[i].send(l.slice(4+l.split(" ")[1].length))
			}
		} else {	
			index.bots[+(l.split(" ")[1])].ccq.push(l.slice(4+l.split(" ")[1].length))
		}
	
	} else if(l.toLowerCase().startsWith("exit")){
		process.exit(2)
	} else if(l.toLowerCase().startsWith("restart")){
		process.exit(0)
	} else if(l.toLowerCase().startsWith("hashes")){
		for(let i=0;i<index.bots.length;i++){
			console.log("Bot "+i+": "+index.bots[i].hash)
		}
	} else if(l.toLowerCase().startsWith("botcmd")){
		index.bots[+(l.split(" ")[1])].rc(l.slice(8+l.split(" ")[1].length),"ffffffff-ffff-ffff-ffff-ffffffffffff","Owner")
	}
        //things.consolecmds[l.toString().toLowerCase().split(" ")[0]].command(l,things)
      }catch(e){
        console.log(e)
      }
      index.p.rl.prompt(false)
    })
    index.p.rl.prompt()
    index.p.readlineLoaded=1;
  }
}
