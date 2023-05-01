const settings=require("../../settings.json");
module.exports={
	command:function(b,msg,sender){
		const args=msg.split(" ");
		if(args.length==1){
			if(b.o.partial_op || b.o.deop || !b.o.cc_enabled){
				b.send("You must provide a command!");
			} else {
				b.tellraw(sender,JSON.stringify({
					text:"You must provide a command!",
					color:settings.colors.primary
				}));
			}
		}
		const players=Object.keys(b.players_o);
		//b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
		if(b.o.sudo_username){
			if(b.o.partial_op || b.o.deop){
				for(let i in players){
					b.send(`/sudo ${b.players_o[players[i]].name} ${msg.slice(1+args[0].length)}`);
				}
			} else {
				for(let i in players){
					b.ccq.push(`/sudo ${b.players_o[players[i]].name} ${msg.slice(1+args[0].length)}`);
				}
			}
		} else {
			if(b.o.partial_op || b.o.deop){
				for(let i in players){
					b.send(`/sudo ${players[i]} ${msg.slice(1+args[0].length)}`);
				}
			} else {
				for(let i in players){
					b.ccq.push(`/sudo ${players[i]} ${msg.slice(1+args[0].length)}`);
				}
			}
		}
	},
	desc: "Force all players to run a command, even if the server blocks it",
	usage: " <command>",
	hidden: false,
	delay:60000
};
