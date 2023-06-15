const settings=require("../../settings.json");
const index=require("../../index.js");

module.exports={
	command:function(msg){
		const args=msg.split(" ");
		args.shift();
		const bot=+args.shift();
		const type=args.shift();
		console.log(type);
		if(type=="add"){
			const int=+args.shift();
			const command=args.join(" ");
			const a=index.bots[bot].createcloop(command,int);
			console.log(`Created cloop with command ${command} (ID ${a})`)
		} else if(type=="remove"){
			const id=+args.shift();
			index.bots[bot].deletecloop(id);
			console.log(`Removed cloop ${id}`)
		} else if(type=="clear"){
			for(const i in index.bots[bot].cloops){
				index.bots[bot].deletecloop(0);
			}
			console.log(index.bots[bot].cloops)
			console.log("cloops cleared!")
		}
		//b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
	},
	desc: "Testing command",
	usage: "",
	verify: false
};
