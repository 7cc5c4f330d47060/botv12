//Copied from U6
const index=require("../index.js")
module.exports={
	description: "Rejoin on leave",
	load: function(){},
	load2: (b)=>{
		b.on("end",()=>{
			clearInterval(b.cqi)
			clearInterval(b.fi)
			if(!b.o.partial_op && !b.o.deop){
				clearInterval(b.ccqi)
				clearInterval(b.cfqi)
			}
			setTimeout(()=>{index.bots[b.id]=index.createBot(b.host,b.port,b.o);global.loadplug(b.id);index.bots[b.id].id=b.id;},5000)
		})
	}
}
