const rl=require("readline")
const trans=require("minecraft-data/minecraft-data/data/pc/1.18/language.json")
module.exports.info={
	name:"Quandale Dingle",
	version:"0.1.0",
	briefdesc:"Main bot plugin which other plugins may rely on",
	description:"DO NOT REMOVE THIS!!!\n\nThis is the main plugin and contains functions that other plugins may rely on.\nOnly remove this if you are rewriting everything."
}
module.exports.load=(things)=>{
	things.jsonparse=(b)=>{
		let finalConsole="";
		let finalMinecraft="";
		let finalClear="";
		if(b.text){
			finalConsole=b.text
			finalMinecraft=b.text
			finalClear=b.text
		}
		if(b.extra){
			for(let i in b.extra){
				let j=things.jsonparse(b.extra[i])
				finalConsole+=j[0]
				finalMinecraft+=j[1]
				finalClear+=j[2]
			}
		}
		if(b.translate){
			let tcon=""
			let tmin=""
			let tcle=""
			if(trans[b.translate]!==undefined){
				tcon=trans[b.translate]
				tmin=trans[b.translate]
				tcle=trans[b.translate]
			} else {
				tcon=b.translate
				tmin=b.translate
				tcle=b.translate
			}
			tcon=tcon.replace(/%%/g,"\u{100037}")
			tmin=tmin.replace(/%%/g,"\u{100037}")
			tcle=tcle.replace(/%%/g,"\u{100037}")
			if(b.with){
				for(var i in b.with){
					let withi=things.jsonparse(b.with[i])
					tcon=tcon.replace(/%s/,withi[0])
					tmin=tmin.replace(/%s/,withi[1])
					tcle=tcle.replace(/%s/,withi[2])
				}
			}
			finalConsole+=tcon
			finalMinecraft+=tmin
			finalClear+=tcle
		}
		return [finalConsole,finalMinecraft,finalClear]
	}
}
module.exports.loadBot=(c,things)=>{
	c.chatqueue=[];
	c.on("success",()=>{
		setTimeout(()=>{c.ci=setInterval(()=>{if(c.chatqueue[0]===undefined){return};c.write("chat",{message:(c.chatqueue.shift()+"").slice(0,250)})},260)},2500)
	})
	c.on("chat",(a)=>{
		rl.cursorTo(process.stdout,0)
		console.log("["+c.index+"] "+things.jsonparse(JSON.parse(a.message))[0]);
		things.rl.prompt(true)
	})
}