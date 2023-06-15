const index=require("../index.js");
const wl=require("../whitelist.json");
const settings=require("../settings.json");
const trans4=require("./translations.json");
//console.log("\x1b[38:5:0m\x1b[48:5:15mtesting\x1b[0m")
//let cmd;
const fs=require("fs");
//if(dir.includes("cmd.js")){
//	console.log("Commands detected!")
//	cmd=require("./cmd.js")
//}
//console.log(cmd)


const vct=[
	"chat.type.text",
	"chat.type.emote",
	"chat.type.announcement"
];
const cp=function(c){
	let textConsole="";
	let textMC="";
	if(c.startsWith("#")){
		const red=+("0x"+c.substring(1,3));
		const green=+("0x"+c.substring(3,5));
		const blue=+("0x"+c.substring(5,7));
		if(isNaN(red) || isNaN(green)|| isNaN(blue)){
			return ["",""];
		}
		if(red<=96 && green<=96 && blue<=96){
			textConsole+="\x1b[48;5;15m";
		}
		textConsole+=`\x1b[38;2;${red};${green};${blue}m`;
		textMC+=`\xa7${c.substring(0,7)}`;
	} else if(c=="black"){
		textConsole+="\x1b[0m\x1b[38;5;0m\x1b[48;5;15m";
		textMC+="\xa70";
	} else if(c=="dark_blue"){
		textConsole+="\x1b[0m\x1b[38;5;4m";
		textMC+="\xa71";
	} else if(c=="dark_green"){
		textConsole+="\x1b[0m\x1b[38;5;2m";
		textMC+="\xa72";
	} else if(c=="dark_aqua"){
		textConsole+="\x1b[0m\x1b[38;5;6m";
		textMC+="\xa73";
	} else if(c=="dark_red"){
		textConsole+="\x1b[0m\x1b[38;5;1m";
		textMC+="\xa74";
	} else if(c=="dark_purple"){
		textConsole+="\x1b[0m\x1b[38;5;5m";
		textMC+="\xa75";
	} else if(c=="gold"){
		textConsole+="\x1b[0m\x1b[38;5;3m";
		textMC+="\xa76";
	} else if(c=="gray"){
		textConsole+="\x1b[0m\x1b[38;5;7m";
		textMC+="\xa77";
	} else if(c=="dark_gray"){
		textConsole+="\x1b[0m\x1b[38;5;8m";
		textMC+="\xa78";
	} else if(c=="blue"){
		textConsole+="\x1b[0m\x1b[38;5;12m";
		textMC+="\xa79";
	} else if(c=="green"){
		textConsole+="\x1b[0m\x1b[38;5;10m";
		textMC+="\xa7a";
	} else if(c=="aqua"){
		textConsole+="\x1b[0m\x1b[38;5;14m";
		textMC+="\xa7b";
	} else if(c=="red"){
		textConsole+="\x1b[0m\x1b[38;5;9m";
		textMC+="\xa7c";
	} else if(c=="light_purple"){
		textConsole+="\x1b[0m\x1b[38;5;13m";
		textMC+="\xa7d";
	} else if(c=="yellow"){
		textConsole+="\x1b[0m\x1b[38;5;11m";
		textMC+="\xa7e";
	} else if(c=="white"){
		textConsole+="\x1b[0m\x1b[38;5;15m";
		textMC+="\xa7f";
	} else if(c=="reset"){
		textConsole+="\x1b[0m\x1b[38;5;15m";
		textMC+="\xa7r";
	} else {
		textConsole+="\x1b[0m\x1b[38;5;15m";
		textMC+="\xa7r";
	}
	return [textConsole,textMC];
};
const j=function(msg,l){
	if(l===undefined) l=0;
	if(l>=8){
		return ["","",""];
	}
	let textClear="";
	let textConsole="";
	let textMC="";
	if(msg.constructor==Array){
		for(const i in msg){
			const msg2=j(msg[i]);
			textClear+=msg2[0];
			textConsole+=msg2[1];
			textMC+=msg2[2];
		}
	}
	if(msg===undefined){
		return ["undefined","undefined","undefined"];
	}
/*	if(msg.color){
		const c2=cp(msg.color);
		textConsole+=c2[0];
		textConsole=textConsole.replace(/\n/g,"\n"+c2[0]);
		textMC+=c2[1];
	}*/
	if(msg.obfuscated){
		textMC+="\xa7k";
	}
	if(msg.bold){
		textMC+="\xa7l";
	}
	if(msg.strikethrough){
		textMC+="\xa7m";
	}
	if(msg.underlined){
		textMC+="\xa7n";
	}
	if(msg.italic){
		textMC+="\xa7o";
	}
	if(msg.text){
		textClear+=msg.text;
		textConsole+=msg.text.replace(/\u001b/g,"[ESC]");
		textMC+=msg.text;
	}
	if(msg.color){
		const c2=cp(msg.color);
		textConsole=c2[0]+textConsole;
		textConsole=textConsole.replace(/\n/g,"\n"+c2[0]);
		textMC=c2[1]+textMC;
	}
	if(msg.translate){
		let color1="";
		let color2="";
		if(msg.color){
			const c2=cp(msg.color);
			color1=c2[0];
			color2=c2[1];
			if(msg.obfuscated){
				color2+="\xa7k";
			}
			if(msg.bold){
				color2+="\xa7l";
			}
			if(msg.strikethrough){
				color2+="\xa7m";
			}
			if(msg.underlined){
				color2+="\xa7n";
			}
			if(msg.italic){
				color2+="\xa7o";
			}
		} else {
			const c2=cp("reset");
			color1=c2[0];
			color2=c2[1];
		}
		let trans=msg.translate;
		let trans2=msg.translate.replace(/%%/g,"\ue123");
		let trans3=msg.translate.replace(/%%/g,"\ue123");
		if(trans4[trans]!==undefined){
			trans=trans4[trans].replace(/%%/g,"\ue123");
			trans2=trans4[trans2].replace(/%%/g,"\ue123");
			trans3=trans4[trans3].replace(/%%/g,"\ue123");
		}
		for(let i in msg.with){
			const j2=j(msg.with[i],l+1);
			trans=trans.replace(/%s/,j2[0].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125"));
			trans2=trans2.replace(/%s/,j2[1].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125")+color1);
			trans3=trans3.replace(/%s/,j2[2].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125")+color2);
		}
		//%n$s only goes up to 4 normally
		if(msg.with){
			if(msg.with[0]){
				const j2_1=j(msg.with[0],l+1);
				trans=trans.replace(/%1\$s/g,j2_1[0].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125"));
				trans2=trans2.replace(/%1\$s/g,j2_1[1].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125"));
				trans3=trans3.replace(/%1\$s/g,j2_1[2].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125"));
			}
			if(msg.with[1]){
				const j2_2=j(msg.with[1],l+1);
				trans=trans.replace(/%2\$s/g,j2_2[0].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125"));
				trans2=trans2.replace(/%2\$s/g,j2_2[1].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125"));
				trans3=trans3.replace(/%2\$s/g,j2_2[2].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125"));
			}
			if(msg.with[2]){
				const j2_3=j(msg.with[2],l+1);
				trans=trans.replace(/%3\$s/g,j2_3[0].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125"));
				trans2=trans2.replace(/%3\$s/g,j2_3[1].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125"));
				trans3=trans3.replace(/%3\$s/g,j2_3[2].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125"));
			}
			if(msg.with[3]){
				const j2_4=j(msg.with[3],l+1);
				trans=trans.replace(/%4\$s/g,j2_4[0].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125"));
				trans2=trans2.replace(/%4\$s/g,j2_4[1].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125"));
				trans3=trans3.replace(/%4\$s/g,j2_4[2].replace(/%s/g,"\ue124").replace(/\$s/g,"\ue125"));
			}
		}
		textClear+=trans.replace(/%([0-9]*\$){0,1}s/g,"").replace(/\ue123/g,"%").replace(/\ue124/g,"%s").replace(/\ue125/g,"$s");
		textConsole+=trans2.replace(/%([0-9]*\$){0,1}s/g,"").replace(/\ue123/g,"%").replace(/\ue124/g,"%s").replace(/\ue125/g,"$s").replace(/\n/g,"\n"+color1);
		textMC+=trans3.replace(/%([0-9]*\$){0,1}s/g,"").replace(/\ue123/g,"%").replace(/\ue124/g,"%s").replace(/\ue125/g,"$s");
	}
	if(msg.extra){
		for(let i in msg.extra){
			if(msg.color){
				const c2=cp(msg.color);
				textConsole+=c2[0];
				textMC+=c2[1];
				if(msg.obfuscated){
					textMC+="\xa7k";
				}
				if(msg.bold){
					textMC+="\xa7l";
				}
				if(msg.strikethrough){
					textMC+="\xa7m";
				}
				if(msg.underlined){
					textMC+="\xa7n";
				}
				if(msg.italic){
					textMC+="\xa7o";
				}
			} else {
				const c2=cp("reset");
				textConsole+=c2[0];
				textMC+=c2[1];
			}
			const j2=j(msg.extra[i],l+1);
			textClear+=j2[0];
			textConsole+=j2[1];
			textMC+=j2[2];
		}
	} 
	if(msg===msg+""){
		textClear=msg;
		textConsole=msg.replace(/\u001b/g,"[ESC]");
		textMC=msg;
	}
	return [textClear,textConsole,textMC];
};

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
		b.lastmsg="";
		b.antispam=0;
		b.msgblacklist=[];
		if(!b.o.msg_split){
			b.o.msg_split="§r:§r §r";
		}
		if(!b.o.msg_split_clear){
			b.o.msg_split_clear=": ";
		}
		b.on("kick_disconnect", function(p){
			console.log(`Bot ${b.id} kicked: ${j(JSON.parse(p.reason))[0]}`);
		});
		b.on("player_chat", function(MSG){
			//console.log(MSG)
			const type=[
				"chat.type.text",
				"chat.type.emote",
				"chat.type.text",
				"chat.type.text",
				"chat.type.announcement",
				"chat.type.text",
				"chat.type.text",
				"%2$s",
				"chat.type.text",
				"chat.type.text",
				"chat.type.text",
				"chat.type.text",
				"chat.type.text",
				"chat.type.text",
				"chat.type.text",
				"chat.type.text"
			];
			if(MSG.unsignedChatContent && MSG.type==7){
				b.emit("system_chat",{_ubot_uuid:MSG.senderUuid,content:MSG.unsignedChatContent});
			} else {
				b.emit("system_chat",{_ubot_uuid:MSG.senderUuid,content:`{"translate":"${type[MSG.type]}","with":[${MSG.networkName},{"text":"${MSG.plainMessage.replace(/\\/g,"\\\\").replace(/"/g,"\\\"")}"}]}`});
			}
		});
		/*	b.on("system_chat", function(MSG){
			console.log(1)
		})*/
		b.on("profileless_chat",function(packet){
			//console.log(packet)
			const type=[
				"chat.type.text",
				"chat.type.emote",
				"chat.type.text",
				"chat.type.text",
				"chat.type.announcement",
				"chat.type.text",
				"chat.type.text",
				"%2$s",
				"chat.type.text",
				"chat.type.text",
				"chat.type.text",
				"chat.type.text",
				"chat.type.text",
				"chat.type.text",
				"chat.type.text",
				"chat.type.text"
			];
			b.emit("system_chat",{content:`{"translate":"${type[packet.type]}","with":[${packet.name},${packet.message}]}`});
		});
		b.on("chat", function(MSG){
			b.emit("system_chat",{content:MSG.message});
		});
		b.on("system_chat", function(MSG){
			//console.log(JSON.parse(MSG.message))
			//console.log(MSG.content)
			const j2=JSON.parse(MSG.content);
			b.emit("chatRaw",j2)
			const msgs=j(j2);
			if(b.msgblacklist.includes(msgs[0])) return;
			if(b.lastmsg==msgs[0]){
				b.antispam++;
			} else {
				b.antispam--;
			}
			if(b.antispam<=-1){
				b.antispam=0;
			}
			if(b.antispam==100){
				b.msgblacklist.push(msgs[0]);
				return;
			}
			b.lastmsg=msgs[0];
			const console_msg=msgs[1].split("\n");
			const cmsg=msgs[0].split("\n");
			const filemsg=msgs[2].split("\n");
			for(const i in cmsg){
				if(cmsg[i]=="" || cmsg[i]==" ") continue;
				if(cmsg[i].startsWith("Command set: ")) continue;
				b.emit("chatAnsi",console_msg[i])
				b.emit("chatClear",cmsg[i])
				b.emit("chatMotd",filemsg[i])//name for this from prismarine-chat
			}

			//text -> username+message
			let uuid=MSG._ubot_uuid?MSG._ubot_uuid:"Invalid UUID";
			const slashsay=vct.includes(JSON.parse(MSG.content).translate);
			if(slashsay){
				const split=JSON.parse(MSG.content);
				if(split.with===undefined || split.with.length<2) return;
				const username=j(split.with[0])[0];
				const command_full=j(split.with[1])[0];
				if(!MSG._ubot_uuid){
					for(const i in b.players){
						if (username==b.players[i][1]){
							uuid=i;
						}
					}
				}
				b.emit("playermsg",command_full.replace(/&/g,"\u00a7").replace(/\u00a7\u00a7/g,"&"),uuid,username,command_full);//MSG.sender)
			} else if(JSON.parse(MSG.content).translate=="[%s] %s › %s"){
				const split=JSON.parse(MSG.content);
				if(split.with===undefined || split.with.length<2) return;
				const username=j(split.with[1])[0];
				const command_full=j(split.with[2])[0];
				if(!MSG._ubot_uuid){
					for(let i in b.players){
						if (username==b.players[i][1]){
							uuid=i;
						}
					}
				}
				b.emit("playermsg",command_full.replace(/&/g,"\u00a7").replace(/\u00a7\u00a7/g,"&"),uuid,username,command_full);//MSG.sender)
			} else {
				const split=msgs[2].split(b.o.msg_split);
				const splitClear=msgs[0].split(b.o.msg_split_clear);
				const prefix=split[0];
				const prefixClear=splitClear[0];
				//const username=prefix.split(" ")[prefix.split(" ").length-1];
				const usernameClear=prefixClear.split(" ")[prefixClear.split(" ").length-1];
				let command_full=msgs[2].slice(prefix.length+b.o.msg_split.length);
				const command_full_c=msgs[0].slice(prefixClear.length+b.o.msg_split_clear.length);
				if(command_full==b.username){
					b.usent=1;
				}
				let username2;
				if(!MSG._ubot_uuid){
					for(let i in b.players){
						if(prefix==b.players[i][0] && !b.o.legacy_name){
							uuid=i;
							username2=b.players[i][1];
						} else if (usernameClear==b.players[i][1]){
							uuid=i;
						}
					}
				}
				if(command_full_c=="") return;
				if(command_full.endsWith("\xa7r")) command_full=command_full.slice(0,command_full.length-2);
				b.emit("playermsg",command_full_c,uuid,username2?username2:usernameClear,command_full);//MSG.sender)
			}
		});
		b.on("playermsg",(a,b,c,d)=>{
			
		})
	},
	parse: j
};
