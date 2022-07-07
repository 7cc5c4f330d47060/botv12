let rl=require("readline")
module.exports.info={
	name:"Console",
	version:"0.1.0",
	briefdesc:"Console command thing",
	description:"This plugin loads the console and allows commands to be run from it."
}
module.exports.load=(things)=>{
	things.rl=rl.createInterface({input:process.stdin,output:process.stdout})
	things.rl.on("line",(a)=>{
		let cmd=a.split(" ")
		if(cmd[0]=="say"){
			things.bots[+cmd[1]].chatqueue.push(a.slice(5+cmd[1].length))
		}
		things.rl.prompt(false)
	})		
}
module.exports.loadBot=(c,things)=>{

}