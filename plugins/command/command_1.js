const os=require("os");
module.exports={
	command:function(b,msg,sender,username,verify){
		if(!verify) return;
		b.tellraw(sender,JSON.stringify({
			translate:"%s: %s",
			with:[
				{
					text: "a"
				},
				{
					text: process.platform
				},
			]
		}));
		b.tellraw(sender,JSON.stringify({
			translate:"%s: %s",
			with:[
				{
					text: "a"
				},
				{
					text: os.machine()
				},
			]
		}));
		b.tellraw(sender,JSON.stringify({
			translate:"%s: %s",
			with:[
				{
					text: "Username"
				},
				{
					text: os.userInfo().username
				},
			]
		}));
		/**b.tellraw(sender,`[{"text":"This bot is called U8 or UBot (formerly UnnamedBot). It was originally designed for free OP servers, but it also supports non-free OP / "},{"text":"partial OP","hoverEvent":{"action":"show_text","contents":{"text":"A server where vanilla commands are blocked but Essentials(X) commands are allowed"}}},{"text":" servers."}]`);
		b.ccq.push//(`/tellraw ${username} {"text":"It is written in JavaScript using minecraft-protocol."}`);
		b.tellraw(sender,`{"text":"Development for this version was started on 11 February 2023."}`);
		b.tellraw(sender,`{"text":"The first version was made in August 2020."}`);
		b.tellraw(sender,`{"text":"-------------------------","color":"black"}`);
		b.tellraw(sender,`{"text":"No version of this bot has anything to do with the \\\"nocom exploit\\\"."}`);*/
	},
	desc: "Testing command",
	usage: "",
	hidden: true
};
