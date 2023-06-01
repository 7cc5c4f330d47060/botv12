const settings=require("../settings.json");
module.exports={
	load: function(){
	},
	load2: function(b){
		if(b.o.ad_rate==-1) return;
		b.adno=0;
		b.adlength=b.o.ad_rate?b.o.ad_rate:120000;
		b.adi=setInterval(()=>{
			b.message(settings.ads[b.adno].replace(/(?<!%)%prefix%(?!%)/g,b.prefix).replace(/(?<!%)%discord%(?!%)/g,settings.discordLink));
			b.adno=(b.adno+1)%settings.ads.length;
		},b.adlength);
	},
};
