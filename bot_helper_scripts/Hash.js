var crypto=require("crypto")
module.exports=function(){
	var hash=crypto.createHash("sha256")
	hash.update(Date.now()+Date()+"");
	return hash.digest("hex")
}