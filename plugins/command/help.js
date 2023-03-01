const index=require("../../index.js")
module.exports={
	command:function(b,msg,sender,username,v5){
		const args=msg.split(" ")
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
				b.ccq.push("/tellraw "+username+" {\"text\":\""+i+" - Testing\"}")
			}
			if(page==0){
				b.ccq.push("/tellraw "+username+" [{\"text\":\"Next Page\",\"underlined\":true,\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/me \\\"help _test "+(page+1)+"\"}}]")
			} else if(page==Math.floor(max/10)){
				b.ccq.push("/tellraw "+username+" [{\"text\":\"Previous Page\",\"underlined\":true,\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/me \\\"help _test "+(page-1)+"\"}}]")
			} else {
				b.ccq.push("/tellraw "+username+" [{\"text\":\"Previous Page\",\"underlined\":true,\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/me \\\"help _test "+(page-1)+"\"}},{\"text\":\" \",\"underlined\":false},{\"text\":\"Next Page\",\"underlined\":true,\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/me \\\"help _test "+(page+1)+"\"}}]")
			}
		} else {
			for(let i in v5){
				b.ccq.push("/tellraw "+username+" {\"text\":\""+i+v5[i].usage+" - "+v5[i].desc+"\"}")
			}
		}
	},
	desc: "Display list of commands",
	usage: " "
}
