const index=require("../../index.js");
const settings=require("../../settings.json");
module.exports={
	command:function(b,msg,sender,username){
		const args=msg.split(" ");
		let username2="@a";
		let msg2=msg.slice(1+args[0].length);
		if(args[1]=="-u" || args[1]=="--user"){
			msg2=msg.slice(3+args[0].length+args[1].length+args[2].length);
			username2=`@a[name=${args[2].substring(0,16)}]`;
		}
		if(msg2==""){
			if(b.o.partial_op || b.o.deop || !b.o.cc_enabled){
				b.send("You must provide a message!");
			} else {
				b.tellraw(sender,JSON.stringify({
					text:"You must provide a message!",
					color:settings.colors.primary
				}));
			}
			return;
		}
		for(let i in index.bots){
			if(index.bots[i].o.cc_enabled && index.bots[i].real){
				index.bots[i].ccq.push(`/tellraw ${username2} ${
					JSON.stringify(
						{
							translate:"[%s:%s] %s%s%s",
							color:settings.colors.secondary,
							clickEvent:{
								action:"suggest_command",
								value:(b.prefix+"netmsg -u "+username+" <message>")
							},
							hoverEvent:{
								action:"show_text",
								contents:{
									"text":`Click to reply to ${username}`
								}
							},
							"with":[
								{
									text:b.host,
									color:settings.colors.primary
								},
								{
									text:b.port,
									color:settings.colors.primary
								},
								{
									text:username,
									color:settings.colors.primary
								},
								{
									text:" › ",
									color:settings.colors.tertiaryDark
								},
								{
									text:msg2.replace(/netmsg/gi,"nеtmsg"),
									color:settings.colors.tertiary
								}
							]
						}
					).replace(/distance=/g,"distance\\u003d")
				}`);
			} else if(index.bots[i].real){
				index.bots[i].send((`[${b.host}:${b.port}] ${username}: ${msg2}`).slice(0,b.o.chatqueue_split)); //prevent commands being run on these servers
			}
		}
	},
	desc: "Send a message to all connected servers",
	usage: " [-u USER] <message>",
	hidden: false
};

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
