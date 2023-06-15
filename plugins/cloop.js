const settings=require("../settings.json");
module.exports={
	load: function(){
	},
	load2: function(b){
		b.cloops=[];
		b.createcloop=(command,interval)=>{
			let cloop={};
			if(interval<20){
				throw new Error("sussy cloop too short");
			}
			cloop.interval=setInterval(()=>{
				b.ccq.push(command);
			},interval);
			cloop.command=command;
			b.cloops.push(cloop);
			return b.cloops.indexOf(cloop);
		}
		b.deletecloop=(id)=>{
			clearInterval(b.cloops[id].interval);
			b.cloops.splice(id,1);
		}
	}
};
