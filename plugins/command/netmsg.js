const index=require("../../index.js")

module.exports={
	command:function(b,msg,sender,username){
		const args=msg.split(" ");
		if(args[1]==b.prefix+"netmsg"){
			return;
		}
		const msg2=msg.slice(1+args[0].length)
		for(let i in index.bots){
			if(index.bots[i].o.cc_enabled && index.bots[i].real){
				index.bots[i].ccq.push(`/tellraw @a {"translate":"[%s:%s] %s%s%s","color":"aqua","with":[{"text":"${b.host}","color":"#FF96FC"},{"text":"${b.port}","color":"#FF96FC"},{"text":"${username}","color":"#FF96FC"},{"text":" › ","color":"white"},{"text":"${msg2}","color":"white"}]}`);//&b[&#FF96FC${b.host}:${b.port}&b] &#FF96FC${username}&r: ${msg2}"`)
			} else if(index.bots[i].real){
				index.bots[i].send((`[${b.host}:${b.port}] ${username}: ${msg2}`).slice(0,b.o.chatqueue_split)) //prevent commands being run on these servers
			}
		}
	},
	desc: "Send a message to all connected servers",
	usage: "",
	hidden: false
}

/*
{
	"translate":"[%s:%s] %s%s%s",
	"color":"aqua",
	"with":[
		{"text":"Server","color":"#FF96FC"},
		{"text":"Port","color":"#FF96FC"},
		{"text":"Username","color":"#FF96FC"},
		{"text":": ","color":"white"},
		{"text":"Message","color":"white"}
	]
}
*/
