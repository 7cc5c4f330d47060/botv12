const settings=require("../../settings.json");
const helpColors=[settings.colors.primary,settings.colors.primaryDark];
module.exports={
	command:function(b,msg,sender,username,verify,v5){
		const args=msg.split(" ");
		const v5_2=Object.keys(v5).sort();
		if(args[1]=="-s"){
			/*if(b.o.partial_op || b.o.deop || !b.o.cc_enabled){
				for(let i in v5_2){
					if(v5[v5_2[i]].hidden && !verify) continue;
					b.send(v5_2[i]+v5[v5_2[i]].usage+" - "+v5[v5_2[i]].desc);
				}
				return;
			}*/
			for(const i in v5_2){
				if(v5[v5_2[i]].hidden && !verify) continue;
				b.tellraw(sender,JSON.stringify(
					{
						translate:"%s - %s",
						color:settings.colors.secondary,
						with:[
							{
								"text":v5_2[i]+v5[v5_2[i]].usage,
								"color":settings.colors.primary
							},
							{
								"text":v5[v5_2[i]].desc,
								"color":settings.colors.primary
							}
						]
					}
				));
			}
			return;
		}
		if(args[1]=="_test"){
			let page;
			const max=505;
			if(args[2]!==undefined){
				page=+args[2];
			} else {
				page=0;
			}
			for(let i=page*10; i<=page*10+9; i++){
				if(i>max) break;
				b.ccq.push("/minecraft:tellraw "+username+" {\"text\":\""+i+" - Testing\"}");
			}
			if(page==0){
				b.ccq.push("/minecraft:tellraw "+username+" [{\"text\":\"Next Page\",\"underlined\":true,\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/me \\\"help _test "+(page+1)+"\"}}]");
			} else if(page==Math.floor(max/10)){
				b.ccq.push("/minecraft:tellraw "+username+" [{\"text\":\"Previous Page\",\"underlined\":true,\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/me \\\"help _test "+(page-1)+"\"}}]");
			} else {
				b.ccq.push("/minecraft:tellraw "+username+" [{\"text\":\"Previous Page\",\"underlined\":true,\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/me \\\"help _test "+(page-1)+"\"}},{\"text\":\" \",\"underlined\":false},{\"text\":\"Next Page\",\"underlined\":true,\"clickEvent\":{\"action\":\"run_command\",\"value\":\"/me \\\"help _test "+(page+1)+"\"}}]");
			}
		} else if(args[1] && v5[args[1].toLowerCase()]){
			/*if(!b.o.cc_enabled){
				b.send(`Command name: ${b.prefix+args[1]}`);
				b.send(`Description: ${v5[args[1]].desc}`);
				b.send(`Usage: ${b.prefix+args[1]+v5[args[1]].usage}`);
			}*/
			let usage="";
			if(v5[args[1].toLowerCase()].usage.constructor==Array){
				for(const i in v5[args[1].toLowerCase()].usage){
					usage+=b.prefix+args[1].toLowerCase()+v5[args[1].toLowerCase()].usage[i]+"\n";
				}
			} else {
				usage=b.prefix+args[1].toLowerCase()+v5[args[1].toLowerCase()].usage
			}
			b.tellraw(sender,JSON.stringify([
				{
					translate: "Command name: %s\n",
					color: settings.colors.secondary,
					with:[
						{
							text: b.prefix+args[1].toLowerCase(),
							color: settings.colors.primary
						}
					]
				},
				{
					translate: "Description: %s\n",
					color: settings.colors.secondary,
					with:[
						{
							text: v5[args[1].toLowerCase()].desc,
							color: settings.colors.primary
						}
					]
				},
				{
					translate: "Usage: %s",
					color: settings.colors.secondary,
					with:[
						{
							text: usage.replace(/(?<=.*)\n(?!.+)/g,""),
							color: settings.colors.primary
						}
					]
				}
			]));		
		} else {
			let commands_2;
			commands_2=[
				{
					text:"Commands",
					color: settings.colors.tertiary
				},
				{
					text:": ",
					color: settings.colors.tertiary
				}
			];
			let helpcolor=0;
			for(let i in v5_2){
				if(!v5[v5_2[i]].hidden || verify){
					commands_2.push(
						[
							{
								text:b.prefix+v5_2[i],
								color:helpColors[helpcolor],
								hoverEvent:{
									action:"show_text",
									contents:[
										{
											translate: "Command name: %s\n",
											color: settings.colors.secondary,
											with:[
												{
													text: b.prefix+v5_2[i],
													color: settings.colors.primary
												}
											]
										},
										{
											translate: "Description: %s\n",
											color: settings.colors.secondary,
											with:[
												{
													text: v5[v5_2[i]].desc,
													color: settings.colors.primary
												}
											]
										},
										{
											translate: "Usage: %s\n",
											color: settings.colors.secondary,
											with:[
												{
													text: b.prefix+v5_2[i]+v5[v5_2[i]].usage,
													color: settings.colors.primary
												}
											]
										},
										{
											text: "\nClick to run command",
											color: settings.colors.tertiary
										},
									]
								},
								clickEvent:{
									action:"suggest_command",
									value:`${b.prefix}${v5_2[i]}${v5[v5_2[i]].usage}`
								}
							},
							{
								text:" ",
								color: "white"
							}
						]
					);
					helpcolor++;
					helpcolor=helpcolor%2;
				}
			}
			for(let i=0;i<Math.ceil(commands_2.length)/9;i++){
				b.tellraw(sender,JSON.stringify(commands_2.slice(i*9,i*9+9)));
			}
		}
	},
	desc: "Display list of commands",
	usage: ""
};
