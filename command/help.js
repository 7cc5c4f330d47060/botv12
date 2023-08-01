const settings=require('../settings.json');
const helpColors=[settings.colors.primary,settings.colors.primaryDark];
const fs = require('fs');
module.exports={
	command_b:function(b,msg,sender,username,verify){
		const args=msg.split(' ');
		const v5_2=Object.keys(commands).sort();
		if(args[1]=='-s'){
			/*if(b.o.partial_op || b.o.deop || !b.o.cc_enabled){
				for(let i in v5_2){
					if(commands[v5_2[i]].hidden && !verify) continue;
					b.send(v5_2[i]+commands[v5_2[i]].usage+" - "+commands[v5_2[i]].desc);
				}
				return;
			}*/
			for(const i in v5_2){
				if(commands[v5_2[i]].hidden && !verify) continue;
				b.tellraw(sender,JSON.stringify(
					{
						translate:'%s - %s',
						color:settings.colors.secondary,
						with:[
							{
								'text':v5_2[i]+commands[v5_2[i]].usage,
								'color':settings.colors.primary
							},
							{
								'text':commands[v5_2[i]].desc,
								'color':settings.colors.primary
							}
						]
					}
				));
			}
			return;
		}
		if(args[1] && commands[args[1].toLowerCase()]){
			/*if(!b.o.cc_enabled){
				b.send(`Command name: ${b.prefix+args[1]}`);
				b.send(`Description: ${commands[args[1]].desc}`);
				b.send(`Usage: ${b.prefix+args[1]+commands[args[1]].usage}`);
			}*/
			let usage='';
			if(commands[args[1].toLowerCase()].usage.constructor==Array){
				for(const i in commands[args[1].toLowerCase()].usage){
					usage+=b.prefix+args[1].toLowerCase()+commands[args[1].toLowerCase()].usage[i]+'\n';
				}
			} else {
				usage=b.prefix+args[1].toLowerCase()+commands[args[1].toLowerCase()].usage;
			}
			b.tellraw(sender,JSON.stringify([
				{
					translate: 'Command name: %s\n',
					color: settings.colors.secondary,
					with:[
						{
							text: b.prefix+args[1].toLowerCase(),
							color: settings.colors.primary
						}
					]
				},
				{
					translate: 'Description: %s\n',
					color: settings.colors.secondary,
					with:[
						{
							text: commands[args[1].toLowerCase()].desc,
							color: settings.colors.primary
						}
					]
				},
				{
					translate: 'Usage: %s',
					color: settings.colors.secondary,
					with:[
						{
							text: usage.replace(/(?<=.*)\n(?!.+)/g,''),
							color: settings.colors.primary
						}
					]
				}
			]));		
		} else {
			let commands_2;
			commands_2=[
				{
					text:'Commands',
					color: settings.colors.tertiary
				},
				{
					text:': ',
					color: settings.colors.tertiary
				}
			];
			let helpcolor=0;
			for(let i in v5_2){
				if(!commands[v5_2[i]].hidden || verify){
					commands_2.push(
						[
							{
								text:b.prefix+v5_2[i],
								color:helpColors[helpcolor],
								hoverEvent:{
									action:'show_text',
									contents:[
										{
											translate: 'Command name: %s\n',
											color: settings.colors.secondary,
											with:[
												{
													text: b.prefix+v5_2[i],
													color: settings.colors.primary
												}
											]
										},
										{
											translate: 'Description: %s\n',
											color: settings.colors.secondary,
											with:[
												{
													text: commands[v5_2[i]].desc,
													color: settings.colors.primary
												}
											]
										},
										{
											translate: 'Usage: %s\n',
											color: settings.colors.secondary,
											with:[
												{
													text: b.prefix+v5_2[i]+commands[v5_2[i]].usage,
													color: settings.colors.primary
												}
											]
										},
										{
											text: '\nClick to run command',
											color: settings.colors.tertiary
										},
									]
								},
								clickEvent:{
									action:'suggest_command',
									value:`${b.prefix}${v5_2[i]}${commands[v5_2[i]].usage}`
								}
							},
							{
								text:' ',
								color: 'white'
							}
						]
					);
					helpcolor++;
					helpcolor=helpcolor%2;
				}
			}
			b.tellraw(sender,JSON.stringify(commands_2)); //if it ever becomes a problem i can remove some things
			/*for(let i=0;i<Math.ceil(commands_2.length)/9;i++){
				b.tellraw(sender,JSON.stringify(commands_2.slice(i*9,i*9+9)));
			}*/
		}
	},
	command_c:function(msg){
		for(const i in commands){
			if (commands[i].usage_c) {
				console.log(i+commands[i].usage_c+' - '+commands[i].desc);
			} else {
				console.log(i+commands[i].usage+' - '+commands[i].desc);
			}
		}
	},
	desc: 'Display list of commands',
	usage: ''
};
const loadplug=()=>{
	let botplug=Object.create(null); //block __proto__ and constructor
	const bpl=fs.readdirSync('command');
	let id=0;
	for(const i in bpl){
		if(!bpl[i].endsWith('.js') || bpl[i].endsWith('help.js')) {
			continue;
		}
		try{
			botplug[bpl[i].slice(0,bpl[i].length-3)]=require(`./${bpl[i]}`);
			botplug[bpl[i].slice(0,bpl[i].length-3)].id=id++;
			//botplug.push());
		}catch(e){console.log(e);}
	}
	botplug.help = module.exports;
	return botplug;
};
const commands = loadplug();
