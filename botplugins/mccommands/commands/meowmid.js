//Meowbah block testing
module.exports.command=(bot,things,uuid,a)=>{
	let b=a.slice(8)
	let length=b.length
	let badPhrases=["meowbahh","kawaii","catgirl","meowbah","meowballah","meowism","meowist","disabled fandom","retard","konnichiwa","senpai","daiski","tomadachis","chan","sama","meow","neko","nya","uwu","owo","arigato"]
	//Explorer just crashed
	let badLetterCount=0
	for(let i in badPhrases){
		badLetterCount+=badPhrases[i].length*(b.split(badPhrases[i]).length-1)
	}
	let percent=badLetterCount/length
	let percent100=Math.floor(percent*10000)/100
	if(percent100>=30){
		bot.chatqueue.push("&c"+percent100+"%")
	} else {
		bot.chatqueue.push("&a"+percent100+"%")
	}
}