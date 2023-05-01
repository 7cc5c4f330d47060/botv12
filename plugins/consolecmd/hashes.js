//const index=require("../../index.js");
const crypto=require("../crypto.js");
module.exports={
	command:function(msg){
		console.log(crypto.genCode(msg.split(" ")[1]));
		console.log("Use this code fast! It isn't valid for long.");
	},
	desc: "Get hash for username",
	usage: " <username>"
};
