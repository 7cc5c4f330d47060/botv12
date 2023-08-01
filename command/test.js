//const index=require("../../index.js");
const settings=require('../settings.json');
module.exports={
	command_b:function(b,msg,sender,username){
		const args=msg.split(' ');
		//b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
		b.tellraw(sender,JSON.stringify({
			translate:'Command: %s from UUID %s (%s)',
			color:settings.colors.secondary,
			with:[
				{
					text:msg,
					color:settings.colors.primary
				},
				{
					text:sender,
					color:settings.colors.primary
				},
				{
					text:username,
					color:settings.colors.primary
				}
			]
		}));
	},
	command_c:function(msg){
		console.log(msg);
	},
	desc: 'Testing command',
	usage: ' [text]'
};
