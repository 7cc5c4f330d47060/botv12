const rl=require("readline")
const fs=require("fs")
module.exports.info={
	name:"",
	version:"0.2.0",
	briefdesc:"Server command thing",
	description:"This plugin loads the commands for the servers. The commands are a .js file with the name of the command as the file name."
}
module.exports.load=(things)=>{
	things.sc={}
	let cmdDir=fs.readdirSync("./botplugins/mccommands/commands")
	for(let i in cmdDir){
		things.sc[(cmdDir[i].slice(0,cmdDir[i].length-3))]=require("./commands/"+cmdDir[i])
		console.log("Loaded command "+(cmdDir[i].slice(0,cmdDir[i].length-3)))
	}
}
module.exports.loadBot=(c,things)=>{
	c.prefix="U7\""
	c.on("chat",(a)=>{
		let message=things.jsonparse(JSON.parse(a.message))[2]
		//console.log(a.sender)
		let pc=message.split(":")[0]
		let ac=message.slice(pc.length+2)
		let cmdName=ac.split(" ")[0].slice(c.prefix.length).toLowerCase()
		if(ac.startsWith(c.prefix)){
			if(things.sc[cmdName]){
				things.sc[cmdName].command(c,things,a.sender,ac.slice(c.prefix.length))
			}
		}
	})
}
