const index=require("../../index.js"); 
const readln=require("readline");
module.exports={
	command:function(msg){
		readln.cursorTo(process.stdout,0);
		readln.clearLine(process.stdout,0);
		console.log(eval(msg.slice(5)));
	},
	desc: "Run JavaScript code",
	usage: " <code>"
};
