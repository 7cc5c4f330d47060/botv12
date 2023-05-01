const index=require("../../index.js");
const settings=require("../../settings.json");
module.exports={
	command:function(b,msg,sender,username,verify){
		if(b.o.cc_enabled){
			b.tellraw(sender,JSON.stringify([
				{
					text:"Currently connected servers: ",
					color:settings.colors.secondary
				},
				{
					text:index.bots.length,
					color:settings.colors.primary
				}
			]));
			for(let i in index.bots){
				if(index.bots[i].o.hidden && !verify){
					b.tellraw(sender,JSON.stringify({
						translate:"%s (ID %s) %s",
						color:settings.colors.secondary,
						with:[
							{
								translate:"%s",
								hoverEvent:{
									action:"show_text",
									contents:[
										{
											text:"Click to copy!"
										}
									]
								},
								clickEvent:{
									action:"copy_to_clipboard",
									value:"[IP Hidden]"
								},
								with:[
									[
										{
											text:"[IP Hidden]",
											color:settings.colors.primary
										}
									]
								]
							},
							{
								text:index.bots[i].id,
								color:settings.colors.primary
							},
							{
								text:index.bots[i].id==b.id?"(this server)":"",
								color:settings.colors.primary
							}
						]
					}));
					continue;
				}
				b.tellraw(sender,JSON.stringify({
					translate:"%s (ID %s) %s",
					color:settings.colors.secondary,
					with:[
						{
							translate:"%s",
							hoverEvent:{
								action:"show_text",
								contents:[
									{
										text:"Click to copy!"
									}
								]
							},
							clickEvent:{
								action:"copy_to_clipboard",
								value:index.bots[i].host+":"+index.bots[i].port
							},
							with:[
								[
									{
										text:index.bots[i].host,
										color:settings.colors.primary
									},
									{
										text:":",
										color:settings.colors.secondary
									},
									{
										text:index.bots[i].port,
										color:settings.colors.primary
									}
								]
							]
						},
						{
							text:index.bots[i].id,
							color:settings.colors.primary
						},
						{
							text:index.bots[i].id==b.id?"(this server)":"",
							color:settings.colors.primary
						}
					]
				}));
			}
		} else {
			b.send(`Currently connected servers: ${index.bots.length}`);
			for(let i in index.bots){
				if(index.bots[i].o.hidden){ //Will not show on a server without command block support, because CommandSpy may be used to see messages.
					b.send(`[IP Hidden] (ID ${index.bots[i].id}) ${index.bots[i].id==b.id?"(this server)":""}`);
					continue;
				}
				b.send(`${index.bots[i].host}:${index.bots[i].port} (ID ${index.bots[i].id}) ${index.bots[i].id==b.id?"(this server)":""}`);
			}
		}
	},
	desc: "Displays list of connected servers",
	usage: "",
	hidden: false
};
