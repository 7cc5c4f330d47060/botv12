//Old name: check.js
const settings=require('../settings.json');
const { parse } = require('./!message.js');
const prefix = parse({
	translate: '[%s]',
	color: settings.colors.secondary,
	with: [
		{
			text: 'Prefix: ' + settings.prefix,
			color: settings.colors.primary
		}
	]
})[2];
console.log(prefix);
//b.uuid
module.exports={
	load: function(){
		
	},
	load2: function(b){
		if(typeof b.o.selfcare == 'undefined') b.o.selfcare = {enabled: true};
		if(typeof b.o.selfcare.enabled == 'undefined') b.o.selfcare.enabled = true;
		b.opped=false;
		b.nwordsaid=false;
		b.creativemode=false;
		b.commandspy=false;
		b.prefix2=false;
		b.cmdcoretoobig=false;
		b.on('game_state_change',(a)=>{
			if(a.reason==3&&a.gameMode!=1){
				b.creativemode=0;
			} else if(a.reason==3&&a.gameMode==1){
				b.creativemode=1;
			}
		});
		b.on('success',()=>{
			b.fi=setInterval(()=>{
				if(!b.o.selfcare.enabled) return;
				if(b.nwordsaid>=1){
					b.nwordsaid=0;
				}
				if(b.cmdcoretoobig==true){
					b.send('/gamerule commandModificationBlockLimit 32768');
					b.send(`/fill ~ 10 ~ ~ 15 ~ command_block${b.o.legacy_cc?'':`{CustomName:"{\\"text\\":\\"${settings.coreName}\\"}"}`}`);
					b.cmdcoretoobig=false;
				}
				if(!b.o.partial_op && !b.o.deop){
					if(b.o.cc_enabled && b.pos.correct==0){
						b.send(`/fill ~ 10 ~ ~ 15 ~ command_block${b.o.legacy_cc?'':`{CustomName:"{\\"text\\":\\"${settings.coreName}\\"}"}`}`);
						b.pos.correct=1;
					}
					if(b.opped==0){
						b.send(/*b.o.selfcare.op.command*/'/op @s[type=player]');
					}
					if(b.creativemode==0){
						b.send('/gamemode creative');
						b.creativemode=1;
					}
					if(b.commandspy==false){
						b.send('/commandspy on');
						b.commandspy=true;
					}
				}
				if(!b.o.deop){
					if(b.muted==1){
						b.send(`/mute ${b.uuid} 0s`);
						b.muted=0;
					}
				}
				if (!b.prefix2) {
					b.send('/prefix ' + prefix.replace(/§r/g, '').replace(/§/g, '&'));
					b.prefix2 = true;
				}
			},600);
		});
		b.on('login',(p)=>{
			b.entityId=p.entityId;
		});
		b.on('entity_status',(p)=>{
			//console.log(p)
			if(p.entityId==b.entityId && p.entityStatus==24){
				b.opped=0;
			} else if(p.entityId==b.entityId && p.entityStatus==28){
				b.opped=1;
			}
		});
		b.on('chatRaw',(text)=>{
			if(text.translate=='commands.fill.toobig' || (text.extra && text.extra[0] && text.extra[0].translate=='commands.fill.toobig')){
				b.cmdcoretoobig=true;
			}
			if(text.translate=='argument.pos.unloaded' || (text.extra && text.extra[0] && text.extra[0].translate=='argument.pos.unloaded')){
				b.pos.correct=0;
			}
		});
		b.on('chatClear',(text)=>{
			if(text.startsWith('You have been muted') && !text.startsWith('You have been muted for now.')){
				b.muted=true;
			}
			if(text=='Successfully disabled CommandSpy'){
				b.commandspy=false;
			}
			if(text.startsWith('Command set: ')){
				return;
			}
		});
		b.on('displayNameChange', (uuid, name) => {
			name = name.replace(/§r/g, '');
			if (!name.startsWith(prefix) && uuid == b.uuid) {
				b.prefix2 = false;
			}/* else if (uuid == b.uuid) {
				b.prefix2 = true;
			}*/
		});
	},
};
