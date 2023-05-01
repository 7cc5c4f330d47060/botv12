module.exports={
	command:function(b,msg,sender,username,verify){
		if(verify){
			b.message(`Valid hash! Username: ${username}`);
		}
	},
	desc: "Testing command",
	usage: "",
	verify:true
};
