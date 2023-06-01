//Meowbah block testing
//Copied from U7. Modified to work with U8
const badPhrases=require("../../badPhrases.json");
//In this file, shorter phrases which are in longer phrases
//should go later in the file.
module.exports={
	command:function(b,msg,sender){
		let msg2=msg.slice(10).toLowerCase();
		let length=msg2.length;
		//b.send(msg2+" "+length)
		//Explorer just crashed
		let badLetterCount=0;
		for(let i in badPhrases){
			badLetterCount+=badPhrases[i].length*(msg2.split(badPhrases[i]).length-1);
			msg2=msg2.replace(new RegExp(badPhrases[i],"g"),new Array(badPhrases[i].length).fill("#").join());
		}
		let percent=badLetterCount/length;
		let percent100=Math.floor(percent*10000)/100;
		if(percent100>=70){
			b.tellraw(sender,JSON.stringify({
				"text":percent100+"%",
				"color":"dark_red"
			}));//b.send("&4"+percent100+"%")
		} else if(percent100>=40){
			b.tellraw(sender,JSON.stringify({
				"text":percent100+"%",
				"color":"red"
			}));//b.send("&c"+percent100+"%")
		} else if(percent100>=25){
			b.tellraw(sender,JSON.stringify({
				"text":percent100+"%",
				"color":"gold"
			}));//b.send("&6"+percent100+"%")
		} else if(percent100>=15){
			b.tellraw(sender,JSON.stringify({
				"text":percent100+"%",
				"color":"yellow"
			}));//b.send("&e"+percent100+"%")
		} else if(percent100>=5){
			b.tellraw(sender,JSON.stringify({
				"text":percent100+"%",
				"color":"green"
			}));//b.send("&a"+percent100+"%")
		} else {
			b.tellraw(sender,JSON.stringify({
				"text":percent100+"%",
				"color":"dark_green"
			}));//b.send("&2"+percent100+"%")
		}
	},
	desc: "Copied from UnnamedBot version 7 alpha",
	usage: ""
};

