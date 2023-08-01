const settings=require('../settings.json');
const index=require('../index.js');
module.exports={
	command_b:function(b,msg,sender,username){
		const args=msg.split(' ');
		args.shift();
		const type=args.shift();
		if(type=='add'){
			const int=+args.shift();
			const command=args.join(' ');
			const a=b.createcloop(command,int);
			b.ccq.push(command);
			b.tellraw(sender,JSON.stringify({
				translate:'Created cloop with command %s (ID %3$s)',
				color:settings.colors.secondary,
				with:[
					{
						text:command,
						color:settings.colors.primary
					},
					{
						text:int,
						color:settings.colors.primary
					},
					{
						text:a,
						color:settings.colors.primary
					}
				]
			}));
		} else if(type=='remove'){
			const id=+args.shift();
			b.deletecloop(id);
			b.tellraw(sender,JSON.stringify({
				translate:'Removed cloop %s',
				color:settings.colors.secondary,
				with:[
					{
						text:id,
						color:settings.colors.primary
					}
				]
			}));
			if (id == 0) {
				b.createcloop('Fake Command UwU', 1000);
			}
		} else if(type=='clear'){
			for(const i in b.cloops){
				b.deletecloop(0);
			}
			b.message('cloops cleared!');
			b.createcloop('Fake Command UwU', 1000);
		}
		//b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
	},
	command_c:function(msg){
		const args=msg.split(' ');
		args.shift();
		const bot=+args.shift();
		const type=args.shift();
		console.log(type);
		if(type=='add'){
			const int=+args.shift();
			const command=args.join(' ');
			const a=index.bots[bot].createcloop(command,int);
			console.log(`Created cloop with command ${command} (ID ${a})`);
		} else if(type=='remove'){
			const id=+args.shift();
			index.bots[bot].deletecloop(id);
			console.log(`Removed cloop ${id}`);
		} else if(type=='clear'){
			for(const i in index.bots[bot].cloops){
				index.bots[bot].deletecloop(0);
			}
			console.log(index.bots[bot].cloops);
			console.log('cloops cleared!');
		}
		//b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
	},
	desc: 'Manage command loops',
	usage: [' add <command> <interval>', ' remove <id>', ' clear'],
	verify: false,
	coreRequired: true
};
