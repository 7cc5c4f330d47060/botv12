const index=require("../index.js")
const rl2=require("readline")
const trans4=require("./translations.json")

//let cmd;
const fs=require("fs");
const dir=fs.readdirSync("plugins");
//if(dir.includes("cmd.js")){
//	console.log("Commands detected!")
//	cmd=require("./cmd.js")
//}
//console.log(cmd)
const j=function(msg){
	let textClear="";
	let textConsole="";
	let textMC="";
	if(msg.text){
		textClear+=msg.text;
		textConsole+=msg.text;
		textMC+=msg.text;
	}
	if(msg.translate){
		let trans=msg.translate;
		let trans2=msg.translate.replace(/%%/g,"\ue123");
		let trans3=msg.translate.replace(/%%/g,"\ue123");
		if(trans4[trans]!==undefined){
			trans=trans4[trans].replace(/%%/g,"\ue123")
			trans2=trans4[trans2].replace(/%%/g,"\ue123")
			trans3=trans4[trans3].replace(/%%/g,"\ue123")
		}
		for(let i in msg.with){
			const j2=j(msg.with[i]);
			trans=trans.replace(/%s/,j2[0].replace(/%s/g,"\ue124"));
			trans2=trans2.replace(/%s/,j2[1].replace(/%s/g,"\ue124"));
			trans3=trans3.replace(/%s/,j2[2].replace(/%s/g,"\ue124"));
		}
		textClear+=trans.replace(/\ue123/g,"%%").replace(/\ue124/g,"%s");
		textConsole+=trans2.replace(/\ue123/g,"%%").replace(/\ue124/g,"%s");
		textMC+=trans3.replace(/\ue123/g,"%%").replace(/\ue124/g,"%s");
	}
	if(msg.extra){
		for(let i in msg.extra){
			const j2=j(msg.extra[i]);
			textClear+=j2[0];
			textConsole+=j2[1];
			textMC+=j2[2];
		}
	} 
	if(msg===msg+""){
		textClear=msg;
		textConsole=msg;
		textMC=msg;
	}
	return [textClear,textConsole,textMC]
}
/*
{
  extra: [
    { bold: true, color: 'dark_red', text: '[' },
    { bold: true, color: 'red', text: 'OP' },
    { bold: true, color: 'dark_red', text: '] ' },
    { color: 'red', text: 'a6b0844b1501f578' },
    { text: ': ' },
    { text: 'testing' }
  ],
  text: ''
}
*/

module.exports={
	load: function(){
		//index.p.testing=1.9
	},
	load2: function(b){
		b.on("player_chat", function(MSG){
			console.log(	)
		})
	/*	b.on("system_chat", function(MSG){
			console.log(1)
		})*/
		b.on("system_chat", function(MSG){
//			console.log(JSON.parse(MSG.message))
			const msgs=j(JSON.parse(MSG.content));
			if(msgs[0].includes("baby41")) return;
			if(msgs[0].toLowerCase().includes("nigg") ||
				msgs[0].toLowerCase().includes("fag") ||
				msgs[0].toLowerCase().includes("trann") ||
				msgs[0].toLowerCase().includes("卐") ||
				msgs[0].toLowerCase().includes("卍")){
				b.nwordsaid=1;
				return;
			}
			if(msgs[0].startsWith("Command set: ")){
				return;
			}
			const console_msg=msgs[1].split("\n");
			for(let i in console_msg){
				if(console_msg[i]=="" || console_msg[i]==" "){
					continue;
				}
				rl2.cursorTo(process.stdout,0);
				rl2.clearLine(process.stdout,0);
				console.log("[Chat/"+b.id+"] "+console_msg[i]);
				if(index.p.readlineLoaded){
					index.p.rl.prompt(true)
				}
			}
			
			if(index.p.commandsLoaded){
				let uuid="Invalid UUID";
				const slashsay=JSON.parse(MSG.content).translate=="chat.type.emote";
				if(slashsay){
					const split=JSON.parse(MSG.content);
					const username=j(split.with[0])[0];
					const command_full=j(split.with[1])[0];
					//console.log(command_full)
					if(command_full.startsWith(b.prefix)){
						for(let i in b.players){
							if (username==b.players[i][1]){
								uuid=i;
							}
						}
						const command_s=command_full.slice(b.prefix.length);
						//b.send("Command: "+command_s+" from UUID "+uuid)
						b.emit("command_u",command_s,uuid,username)//MSG.sender)
					}
				} else {
					const split=msgs[0].split(": ")
					const command=split[1]
					const prefix=split[0]
					const username=prefix.split(" ")[prefix.split(" ").length-1];
					const command_full=msgs[0].slice(prefix.length+2)
					//console.log(command_full)
					if(command_full.startsWith(b.prefix)){
						for(let i in b.players){
							if(prefix==b.players[i][0] && !b.o.legacy_name){
								uuid=i;
							} else if (username==b.players[i][1]){
								uuid=i;
							}
						}
						const command_s=command_full.slice(b.prefix.length);
						//b.send("Command: "+command_s+" from UUID "+MSG.sender)
						b.emit("command_u",command_s,uuid,username)//MSG.sender)
					}
				}
			}
		})
	},
	parse: j
}
