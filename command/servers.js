const index=require('../index.js');
const settings=require('../settings.json');
module.exports={
	command_b:function(b,msg,sender,username,verify){
		const servers=[];
		for(const i in index.bots){
			if(index.bots[i].o.disabled) continue;
			servers.push({
				id: index.bots[i].id,
				host: index.bots[i].host,
				port: index.bots[i].port,
				hidden: index.bots[i].o.hidden
			});
		}
		
		b.tellraw(sender,JSON.stringify([
			{
				text:'Currently connected servers: ',
				color:settings.colors.secondary
			},
			{
				text:servers.length.toString(),
				color:settings.colors.primary
			}
		]));
		for(const i in servers){
			if(servers[i].hidden && !verify){
				b.tellraw(sender,JSON.stringify({
					translate:'%s (ID %s) %s',
					color:settings.colors.secondary,
					with:[
						{
							translate:'%s',
							hoverEvent:{
								action:'show_text',
								contents:[
									{
										text:'Click to copy!'
									}
								]
							},
							clickEvent:{
								action:'copy_to_clipboard',
								value:'[IP Hidden]'
							},
							with:[
								[
									{
										text:'[IP Hidden]',
										color:settings.colors.primary
									}
								]
							]
						},
						{
							text:servers[i].id,
							color:settings.colors.primary
						},
						{
							text:servers[i].id==b.id?'(this server)':'',
							color:settings.colors.primary
						}
					]
				}));
				continue;
			}
			b.tellraw(sender,JSON.stringify({
				translate:'%s (ID %s) %s',
				color:settings.colors.secondary,
				with:[
					{
						translate:'%s',
						hoverEvent:{
							action:'show_text',
							contents:[
								{
									text:'Click to copy!'
								}
							]
						},
						clickEvent:{
							action:'copy_to_clipboard',
							value:servers[i].host+':'+servers[i].port
						},
						with:[
							[
								{
									text:servers[i].host,
									color:settings.colors.primary
								},
								{
									text:':',
									color:settings.colors.secondary
								},
								{
									text:servers[i].port,
									color:settings.colors.primary
								}
							]
						]
					},
					{
						text:servers[i].id,
						color:settings.colors.primary
					},
					{
						text:servers[i].id==b.id?'(this server)':'',
						color:settings.colors.primary
					}
				]
			}));
		}
	},	
	command_c:function(b,msg,sender,username,verify){
		const servers=[];
		for(const i in index.bots){
			if(index.bots[i].o.disabled) continue;
			servers.push({
				id: index.bots[i].id,
				host: index.bots[i].host,
				port: index.bots[i].port
			});
		}
		console.log(`Currently connected servers: ${servers.length}`)
		for(const i in servers){
			console.log(`${servers[i].host}:${servers[i].port} (ID ${servers[i].id})`)
		}
	},
	desc: 'Displays list of connected servers',
	usage: '',
	hidden: false
};
