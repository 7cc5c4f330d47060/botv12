const settings=require('../settings.json');
const index = require('../index.js');
module.exports={
	command_b:function(b,msg,sender,username){
		if(b.o.cc_enabled){
			b.send(`/fill ~ 10 ~ ~ 15 ~ command_block${b.o.legacy_cc?'':`{CustomName:"{\\"text\\":\\"${settings.coreName}\\"}"}`}`);
			b.send('Core refilled!');
		}
	},	
	command_c:function(msg){
		const args=msg.split(' ');
		const serverno=args[1];
		if(serverno==='*'){
			for(let i=0;i<index.bots.length;i++){
				if(index.bots[i].o.cc_enabled){
					index.bots[i].send(`/fill ~ 10 ~ ~ 15 ~ command_block${index.bots[i].o.legacy_cc?'':`{CustomName:"{\\"text\\":\\"${settings.coreName}\\"}"}`}`);
					index.bots[i].send('Core refilled!');
				}
			}
		} else {
			if(index.bots[+serverno].o.cc_enabled){
				index.bots[+serverno].send(`/fill ~ 10 ~ ~ 15 ~ command_block${index.bots[+serverno].o.legacy_cc?'':`{CustomName:"{\\"text\\":\\"${settings.coreName}\\"}"}`}`);
				index.bots[+serverno].send('Core refilled!');
			}
		}

	},
	desc: 'Testing command',
	usage: '',
	aliases:['refill','refillcore']
};

