//const index=require("../../index.js");
module.exports={
	command:function(msg,v5){
		for(const i in v5){
			console.log(i+v5[i].usage+" - "+v5[i].desc);
		}
	},
	desc: "Display list of commands",
	usage: ""
};
