const settings=require("../../settings.json");
module.exports={
	command:function(b,msg,sender,username){
		const args=msg.split(" ");
		//b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
		b.tellraw(sender,JSON.stringify({
			translate:"Command: %s from UUID %s (%s)",
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
	desc: "Testing command",
	usage: ""
};
