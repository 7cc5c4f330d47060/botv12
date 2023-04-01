const index=require("../index.js")
const crypto=require("crypto")
module.exports={
	load: function(){
		index.p.testing=1.8
	},
	load2: function(b){
		b.cryptoLoaded=true;
		b.regenCode=function(){
			b.hash=crypto.randomBytes(32).toString("hex");
			console.log("The new code is "+b.hash)
		}
		b.regenCode();
	}
}
