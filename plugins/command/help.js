const settings=require("../../settings.json");
const helpColors=[settings.colors.primary,settings.colors.primaryDark];
module.exports={
	command:function(b,msg,sender,username,verify,v5){
		const args=msg.split(" ");
		if(args[1]=="-s"){
			if(b.o.partial_op || b.o.deop){
				for(let i in v5){
					if(v5[i].hidden && !verify) continue;
					b.send(i+v5[i].usage+" - "+v5[i].desc);
				}
				return;
			}
			for(let i in v5){
				if(v5[i].hidden && !verify) continue;
				b.tellraw(sender,JSON.stringify(
					{
						translate:"%s - %s",
						color:settings.colors.secondary,
						with:[
							{
								"text":i+v5[i].usage,
								"color":settings.colors.primary
							},
							{
								"text":v5[i].desc,
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
		} else if(args[1] && v5[args[1]]){
			if(!b.o.cc_enabled){
				b.send(`Command name: ${b.prefix+args[1]}`);
				b.send(`Description: ${v5[args[1]].desc}`);
				b.send(`Usage: ${b.prefix+args[1]+v5[args[1]].usage}`);
			}
			b.tellraw(sender,JSON.stringify([
				{
					translate: "Command name: %s\n",
					color: settings.colors.secondary,
					with:[
						{
							text: b.prefix+args[1],
							color: settings.colors.primary
						}
					]
				},
				{
					translate: "Description: %s\n",
					color: settings.colors.secondary,
					with:[
						{
							text: v5[args[1]].desc,
							color: settings.colors.primary
						}
					]
				},
				{
					translate: "Usage: %s",
					color: settings.colors.secondary,
					with:[
						{
							text: b.prefix+args[1]+v5[args[1]].usage,
							color: settings.colors.primary
						}
					]
				}
			]));		
		} else {
			let commands_2;
			if(b.o.partial_op || b.o.deop){
				commands_2=["Commands:"];
			} else {
				commands_2=[
					{
						text:"Commands",
						color:settings.colors.secondary
					},
					{
						text:": ",
						color: settings.colors.tertiary
					}
				];
			}
			let helpcolor=0;
			for(let i in v5){
				if(!v5[i].hidden || verify){
					if(b.o.partial_op || b.o.deop){
						commands_2.push(i);
					} else {
						commands_2.push(
							[
								{
									text:b.prefix+i,
									color:helpColors[helpcolor],
									hoverEvent:{
										action:"show_text",
										contents:[
											{
												translate: "Command name: %s\n",
												color: settings.colors.secondary,
												with:[
													{
														text: b.prefix+i,
														color: settings.colors.primary
													}
												]
											},
											{
												translate: "Description: %s\n",
												color: settings.colors.secondary,
												with:[
													{
														text: v5[i].desc,
														color: settings.colors.primary
													}
												]
											},
											{
												translate: "Usage: %s\n",
												color: settings.colors.secondary,
												with:[
													{
														text: b.prefix+i+v5[i].usage,
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
										value:`${b.prefix}${i}${v5[i].usage}`
									}
								},
								{
									text:" ",
									color: "white"
								}
							]
						);
					}
					helpcolor++;
					helpcolor=helpcolor%2;
				}
			}
			let cmds_text=commands_2.join(" "+b.prefix);
			if(b.o.partial_op || b.o.deop){
				b.send(cmds_text);
			} else {
				for(let i=0;i<Math.ceil(commands_2.length)/9;i++){
					b.tellraw(sender,JSON.stringify(commands_2.slice(i*9,i*9+9)));
				}
			}
		}
	},
	desc: "Display list of commands",
	usage: ""
};
