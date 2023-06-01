const index=require("../../index.js");
const stu=function(text){
	const text2=text.split(" ");
		for(const i in text2){
			if(Math.random()<=0.25 && text2[i][0].match(/[a-z]/g)){
				text2[i]=text2[i][0]+"-"+text2[i]
			}
		}
	return text2.join(" ")
}
module.exports={
	command:function(msg){
		const args=msg.split(" ");
		let flags="";
		if(args[1].startsWith("-")){
			flags=args[1].slice(1);
		}
		let finalmsg=flags?args.slice(3).join(" "):args.slice(2).join(" ")
		//beginning of sussy say command stuff
		//some stuff for uwuifier: https://github.com/Daniel-Liu-c0deb0t/uwu
		if(flags.includes("u")){
			finalmsg=finalmsg.toLowerCase()
			.replace(/cute(?!r|st)/g,"kawaii")
			.replace(/meow/g,"nya~")
			.replace(/[rl]/g,"w")
			//.replace(/r/g,"w")
			finalmsg=stu(finalmsg);
		}
		if(flags.includes("3")){
			finalmsg=finalmsg+" :3"
		}
		//end of sussy say command stuff
		const serverno=flags?args[2]:args[1];
		if(serverno==="*"){
			for(let i=0;i<index.bots.length;i++){
				index.bots[i].send(finalmsg);
			}
		} else {	
			index.bots[+serverno].send(finalmsg);
		}
	},
	desc: "Send a message or command to chat",
	usage: " <botid | *> <message>"
};
