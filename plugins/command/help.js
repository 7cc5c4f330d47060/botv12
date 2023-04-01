const index=require("../../index.js")
module.exports={
	command:function(b,msg,sender,username,verify,v5){
		const args=msg.split(" ")
		if(args[1]=="-s"){
			//let commands=Object.keys(v5);
			let commands_2=[];
			for(let i in v5){
				if(!v5[i].hidden){
					commands_2.push(i)
				}
			}
			let cmds_text=b.prefix+commands_2.join(" "+b.prefix);
			if(b.o.partial_op || b.o.deop){
				b.send(cmds_text);
			} else {
				b.tellraw(sender,`{"text":"${cmds_text.replace(/\"/g,"\\\"")}"}`);
			}
			return;
		}
		if(b.o.partial_op || b.o.deop){
			for(let i in v5){
				if(v5[i].hidden) continue;
				b.send(i+v5[i].usage+" - "+v5[i].desc)
			}
			return;
		}
		if(args[1]=="_test"){
			let page;
			const max=505
			if(args[2]!==undefined){
				page=+args[2]
			} else {
				page=0;
			}
			for(let i=page*10; i<=page*10+9; i++){
				if(i>max) break;
				b.ccq.push("/minecraft:tellraw "+username+" {\"text\":\""+i+" - Testing\"}")
			}
			if(page==0){
				b.ccq.push("/minecraft:tellraw "+username+" [{\"text\":\"Next Page\",\"underlined\":true,\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/me \\\"help _test "+(page+1)+"\"}}]")
			} else if(page==Math.floor(max/10)){
				b.ccq.push("/minecraft:tellraw "+username+" [{\"text\":\"Previous Page\",\"underlined\":true,\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/me \\\"help _test "+(page-1)+"\"}}]")
			} else {
				b.ccq.push("/minecraft:tellraw "+username+" [{\"text\":\"Previous Page\",\"underlined\":true,\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/me \\\"help _test "+(page-1)+"\"}},{\"text\":\" \",\"underlined\":false},{\"text\":\"Next Page\",\"underlined\":true,\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/me \\\"help _test "+(page+1)+"\"}}]")
			}
		} else {
			for(let i in v5){
				if(v5[i].hidden && !verify) continue;
				b.tellraw(sender,`{"translate":"%s - %s","color":"aqua","with":[{"text":"${i+v5[i].usage}","color":"#FF96FC"},{"text":"${v5[i].desc}","color":"#FF96FC"}]}`)
			}
		}
	},
	desc: "Display list of commands",
	usage: ""
}
