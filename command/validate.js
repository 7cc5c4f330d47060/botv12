module.exports={
	command_b:function(b,msg,sender,username,verify){
		if(verify){
			b.message(`Valid hash! Username: ${username}`);
		}
	},
	command_c:function(){
		// nothing
	},
	desc: 'Testing command',
	usage: '',
	verify:true
};
