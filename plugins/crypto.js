const crypto=require("crypto");
module.exports={
	load: function(){
	},
	load2: function(b){
		b.cryptoLoaded=true;
	},
	genCode: function(username){
		return crypto.createHash("sha256").update((Math.floor(Date.now()/10000)+"")+username+"hcghwajdnhkcfafmc89dj2lsoco8fyuifjkaeha23hfx3o9ao").digest("hex");
	}
};
