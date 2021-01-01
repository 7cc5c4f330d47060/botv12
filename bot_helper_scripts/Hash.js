var crypto=require("crypto")
module.exports=function(){
	var hash=crypto.createHash("sha256")
	hash.update(Date.now()+""+Date()+""+Math.random());
	var h=hash.digest("hex");
	setTimeout(function(){global.c2.write("\u0005"+h)},1000)
	return h
}