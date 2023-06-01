const {processColorCode}=require("./netmsg.js")
module.exports={
	command:function(b,msg){
		const args=msg.split(" ");
		const message=args.slice(1).join(" ");
		//b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")

		let message_colorcoded=[];
		let msg3=message.split("\xa7");
		message_colorcoded.push({
			text:msg3.splice(0,1)[0],
			color:"white",
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		});
		let message_colorcoded_2={
			text:"",
			color:"white",
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
		for(const i in msg3){
			if(msg3[i].length==1){
				let precode;
				if(msg3[i][0]=="#"){
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
				if(msg3[i][0]=="#"){
					precode=msg3[i].substring(0,7);
				} else {
					precode=msg3[i].substring(0,1);
				}
				const code=processColorCode(precode);
				for(const j in code){
					message_colorcoded_2[j]=code[j];
				}
				if(precode.startsWith("#")){
					message_colorcoded_2.hoverEvent={
						action:"show_text",
						contents:{
							text:`This text may be hard to read if the color code is that of a dark color.\n\nOriginal text: ${msg3[i].slice(precode.length)}`
						}
					};
				}
				message_colorcoded_2.text=msg3[i].slice(precode.length);
				message_colorcoded.push(message_colorcoded_2);
				message_colorcoded_2={
					text:"",
					color:message_colorcoded_2.color,
					bold:message_colorcoded_2.bold,
					italic:message_colorcoded_2.italic,
					underlined:message_colorcoded_2.underlined,
					strikethrough:message_colorcoded_2.strikethrough,
					obfuscated:false
				};
			}
		}
		console.log(message_colorcoded);

		b.tellraw("@a",JSON.stringify({
			translate:"%s %s: %s",
			color:"white",
			with:[
				{
					translate:"[%s]",
					bold:true,
					color:"dark_red",
					with:[
						{
							text:"OP",
							bold:true,
							color:"red"
						}
					]
				},
				{
					text:b.username,
					color:"red"
				},
				message_colorcoded
			]
		}).replace(/distance=/g,"distance\\u003d"));
	},
	desc: "Testing command",
	usage: "",
	format: true
};
