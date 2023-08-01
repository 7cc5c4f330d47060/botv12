const console2=require('../plugins/console.js'); 
const index=require('../index.js');
const settings=require('../settings.json');
const processColorCode = require('../util/colorcode.js');
module.exports={
	command_b:function(b,msg,sender,username){
		const args=msg.split(' ');
		let username2='@a';
		let msg2=msg.slice(1+args[0].length);
		let ndc=0;
		if(args[1]=='-u' || args[1]=='--user'){
			msg2=msg.slice(3+args[0].length+args[1].length+args[2].length);
			username2=`@a[name=${args[2].substring(0,16)}]`;
		}

		let message_colorcoded=[];
		let msg3=msg2.split('\xa7');
		let botCount=0;
		for(const i in index.bots){
			if(index.bots[i].o.disabled) continue;
			botCount++;
		}
		if(botCount==1){
			b.message('Only one server is connected, this server will be the only one receiving the message.');
		}
		message_colorcoded.push({
			text:msg3.splice(0,1)[0],
			color:'white',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		});
		let message_colorcoded_2={
			text:'',
			color:'white',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
		for(const i in msg3){
			if(msg3[i].length==1){
				let precode;
				if(msg3[i][0]=='#'){
					precode=msg3[i].substring(0,7);
				} else {
					precode=msg3[i].substring(0,1);
				}
				const code=processColorCode(precode);
				for(const j in code){
					message_colorcoded_2[j]=code[j];
				}
			} else {
				let precode;
				if(msg3[i][0]=='#'){
					precode=msg3[i].substring(0,7);
				} else {
					precode=msg3[i].substring(0,1);
				}
				const code=processColorCode(precode);
				for(const j in code){
					message_colorcoded_2[j]=code[j];
				}
				if(precode.startsWith('#')){
					message_colorcoded_2.hoverEvent={
						action:'show_text',
						contents:{
							text:`This text may be hard to read if the color code is that of a dark color.\n\nOriginal text: ${msg3[i].slice(precode.length)}`
						}
					};
				}
				message_colorcoded_2.text=msg3[i].slice(precode.length);
				message_colorcoded.push(message_colorcoded_2);
				message_colorcoded_2={
					text:'',
					color:message_colorcoded_2.color,
					bold:message_colorcoded_2.bold,
					italic:message_colorcoded_2.italic,
					underlined:message_colorcoded_2.underlined,
					strikethrough:message_colorcoded_2.strikethrough,
					obfuscated:false
				};
			}
		}
		//console.log(message_colorcoded);

		if(msg2==''){
			b.tellraw(sender,JSON.stringify({
				text:'You must provide a message!',
				color:settings.colors.primary
			}));
			return;
		}
		
		for(let i in index.bots){
			if(index.bots[i].o.netmsg_disabled){
				ndc++;
				continue;
			}
			if(index.bots[i].real){
				index.bots[i].tellraw(username2,JSON.stringify(
					{
						translate:'[%s:%s] %s%s%s',
						color:settings.colors.secondary,
						clickEvent:{
							action:'suggest_command',
							value:(index.bots[i].prefix+'netmsg -u '+username+' ')
						},
						hoverEvent:{
							action:'show_text',
							contents:{
								'text':sender=='Invalid UUID'?'This message may not be real. The player sending it has no UUID.':`Click to reply to ${username}`
							}
						},
						'with':[
							{
								text:b.o.hidden ? 'localhost' : b.host,
								color:settings.colors.primary
							},
							{
								text:b.o.hidden ? '25565' : b.port,
								color:settings.colors.primary
							},
							{
								text:username,
								color:settings.colors.primary
							},
							{
								text:' › ',
								color:settings.colors.tertiaryDark
							},
							message_colorcoded
						]
					}
				).replace(/distance=/g,'distance\\u003d')
				);
			}
		}
		if(ndc!=0){
			//b.message(`Netmsg has been disabled in ${ndc} server${ndc==1?"":"s"}.`)
		}
	},
	command_c:function(msg){
		const args=msg.split(' ');
		let username2='@a';
		let msg2=msg.slice(1+args[0].length);
		let ndc=0;
		if(args[1]=='-u' || args[1]=='--user'){
			msg2=msg.slice(3+args[0].length+args[1].length+args[2].length);
			username2=`@a[name=${args[2].substring(0,16)}]`;
		}

		let message_colorcoded=[];
		let msg3=msg2.split('&');
		let botCount=0;
		for(const i in index.bots){
			if(index.bots[i].o.disabled) continue;
			botCount++;
		}
		if(botCount==1){
			console2.write('Only one server is connected, this server will be the only one receiving the message.');
		}
		message_colorcoded.push({
			text:msg3.splice(0,1)[0],
			color:'white',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		});
		let message_colorcoded_2={
			text:'',
			color:'white',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
		for(const i in msg3){
			if(msg3[i].length==1){
				let precode;
				if(msg3[i][0]=='#'){
					precode=msg3[i].substring(0,7);
				} else {
					precode=msg3[i].substring(0,1);
				}
				const code=processColorCode(precode);
				for(const j in code){
					message_colorcoded_2[j]=code[j];
				}
			} else {
				let precode;
				if(msg3[i][0]=='#'){
					precode=msg3[i].substring(0,7);
				} else {
					precode=msg3[i].substring(0,1);
				}
				const code=processColorCode(precode);
				for(const j in code){
					message_colorcoded_2[j]=code[j];
				}
				if(precode.startsWith('#')){
					message_colorcoded_2.hoverEvent={
						action:'show_text',
						contents:{
							text:`This text may be hard to read if the color code is that of a dark color.\n\nOriginal text: ${msg3[i].slice(precode.length)}`
						}
					};
				}
				message_colorcoded_2.text=msg3[i].slice(precode.length);
				message_colorcoded.push(message_colorcoded_2);
				message_colorcoded_2={
					text:'',
					color:message_colorcoded_2.color,
					bold:message_colorcoded_2.bold,
					italic:message_colorcoded_2.italic,
					underlined:message_colorcoded_2.underlined,
					strikethrough:message_colorcoded_2.strikethrough,
					obfuscated:false
				};
			}
		}
		//console.log(message_colorcoded);

		if(msg2==''){
			console2.write('You must provide a message!');
			return;
		}
		
		for(let i in index.bots){
			if(index.bots[i].o.netmsg_disabled){
				ndc++;
				continue;
			}
			if(index.bots[i].real){
				index.bots[i].tellraw(username2,JSON.stringify(
					{
						translate:'[%s] %s%s%s',
						color:settings.colors.secondary,
						'with':[
							{
								text:"Console",
								color:settings.colors.primary
							},
							{
								text:"_",
								color:settings.colors.primary
							},
							{
								text:' › ',
								color:settings.colors.tertiaryDark
							},
							message_colorcoded
						]
					}
				).replace(/distance=/g,'distance\\u003d')
				);
			}
		}
		if(ndc!=0){
			//b.message(`Netmsg has been disabled in ${ndc} server${ndc==1?"":"s"}.`)
		}
	},
	desc: 'Send a message to all connected servers',
	usage: ' [-u USER] <message>',
	hidden: false,
	format: true,
	processColorCode
};

/*
{
	"translate":"[%s:%s] %s%s%s",
	"color":"aqua",
	"with":[
		{"text":"Server","color":"#FF96FC"},
		{"text":"Port","color":"#FF96FC"},
		{"text":"Username","color":"#FF96FC"},
		{"text":": ","color":"white"},
		{"text":"Message","color":"white"}
	]
}
*/
