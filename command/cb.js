const index=require('../index.js');
module.exports={
	command_b:function(b,msg,sender,username){
		const args=msg.split(' ');
		if(b.o.cc_enabled){
			b.ccq.push(args.slice(1,args.length).join(' '));
		} else {
			b.send('Command core is disabled, command will not run.');
			return;
		}
	},
	command_c:function(msg){
		if(msg.split(' ')[1]==='*'){
			for(let i=0;i<index.bots.length;i++){
				if(index.bots[i].real && index.bots[i].o.cc_enabled) index.bots[i].ccq.push(msg.slice(4+msg.split(' ')[1].length));
			}
		} else {	
			index.bots[+(msg.split(' ')[1])].ccq.push(msg.slice(4+msg.split(' ')[1].length));
		}
	},
	desc: 'Run a command in a command block',
	usage: ' <command>',
	usage_c: ' <botid | *> <message>',
	hidden: false,
	coreRequired: true,
	aliases: ['cc','commandblock','cblock']
};

