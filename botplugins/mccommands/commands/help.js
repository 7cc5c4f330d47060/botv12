module.exports.command=(bot,things,uuid)=>{
	if(uuid==bot.uuid) return
	let a=""
	for(let i in things.sc){
		a+=(bot.prefix+i+" ")
	}
	bot.chatqueue.push(a)
}