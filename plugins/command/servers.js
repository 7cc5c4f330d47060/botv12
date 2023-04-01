const index=require("../../index.js")
module.exports={
	command:function(b,msg,sender,username){
		if(b.o.cc_enabled){
			b.tellraw(sender,`[{"text":"Currently connected servers: ","color":"aqua"},{"text":"${index.bots.length}","color":"#FF96FC"}]`)
			for(let i in index.bots){
				if(index.bots[i].o.hidden){
					b.tellraw(sender,`{"translate":"%s (ID %s) %s","color":"aqua","with":[{"translate":"%s","hoverEvent":{"action":"show_text","contents":[{"text":"Click to copy!"}]},"clickEvent":{"action":"copy_to_clipboard","value":"[IP Hidden]"},"with":[[{"text":"[IP Hidden]","color":"#FF96FC"}]]},{"text":"${index.bots[i].id}","color":"#FF96FC"},{"text":"${index.bots[i].id==b.id?"(this server)":""}","color":"#FF96FC"}]}`)
					continue;
				}
				b.tellraw(sender,`{"translate":"%s (ID %s) %s","color":"aqua","with":[{"translate":"%s","hoverEvent":{"action":"show_text","contents":[{"text":"Click to copy!"}]},"clickEvent":{"action":"copy_to_clipboard","value":"${index.bots[i].host}:${index.bots[i].port}"},"with":[[{"text":"${index.bots[i].host}","color":"#FF96FC"},{"text":":","color":"aqua"},{"text":"${index.bots[i].port}","color":"#FF96FC"}]]},{"text":"${index.bots[i].id}","color":"#FF96FC"},{"text":"${index.bots[i].id==b.id?"(this server)":""}","color":"#FF96FC"}]}`)
			}
		} else {
			b.send(`Currently connected servers: ${index.bots.length}`)
			for(let i in index.bots){
				if(index.bots[i].o.hidden){
					b.send(`[IP Hidden] (ID ${index.bots[i].id}) ${index.bots[i].id==b.id?"(this server)":""}`)
					continue;
				}
				b.send(`${index.bots[i].host}:${index.bots[i].port} (ID ${index.bots[i].id}) ${index.bots[i].id==b.id?"(this server)":""}`)
			}
		}
	},
	desc: "Displays list of connected servers",
	usage: "",
	hidden: false
}
