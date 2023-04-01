const index=require("../index.js")
const settings=require("../settings.json")
const uuidToInt=function(uuid){
	
	const split_uuid=uuid.replace(/[^0-9a-f]/g,"").replace(/.{1,8}/g,a=>{return "0x"+a}).match(/.{1,10}/g);
	const num_uuid=[+split_uuid[0]<<0,+split_uuid[1]<<0,+split_uuid[2]<<0,+split_uuid[3]<<0]
	return num_uuid
}
module.exports={
	cs: 6,
	uuidToInt,
	load: function(){
	
	},
	load2: function(b){
		if(!b.o.cc_enabled){
			b.send("Joining to servers without command block permissions is still in beta. The bot may not work correctly.");
			return;
		}
		/*if(b.o.ccore_teleport){
			b.original_pos={x:Math.floor(Math.random()*2000000)-1000000,y:10,z:Math.floor(Math.random()*2000000)-1000000};
			b.send("/tp "+Math.floor(b.original_pos.x)+".0 "+b.original_pos.y+" "+Math.floor(b.original_pos.z)+".0");
		}*/
		setTimeout(()=>{b.send(`/fill ~2 0 ~2 ~-3 5 ~-3 command_block{CustomName:"{\\"text\\":\\"${settings.coreName}\\"}"}`)},10000)
		b.cfqi=setInterval(()=>{b.send(`/fill ~2 0 ~2 ~-3 5 ~-3 command_block{CustomName:"{\\"text\\":\\"${settings.coreName}\\"}"}`)},60000)
		b.ccq=[];
		b.blocknoX=0;
		b.blocknoZ=0;
		b.ccStarted=0;
		b.blocknoY=0;
		b.pos={x:0,y:0,z:0,correct:0};
		/*for(let i=0;i<=module.exports.cs-1;i++){
			for(let j=0;j<=module.exports.cs-1;j++){
				b.ccq.push("/tellraw d6399e5b0378d404 \"The command block thing is working! i:"+i+" j:"+j+"\"")

			}
		}*/
		b.advanceccq=function(){
			if(b.ccq[0] && b.ccq[0].length!=0){
				b.write("update_command_block",{
					command: b.ccq[0],
					location: {
						x: b.commandPos.x1+b.blocknoX,
						y: b.commandPos.y1+b.blocknoY,
						z: b.commandPos.z1+b.blocknoZ
					},
					mode: 1,
					flags: 5
				});
				b.blocknoX++;
				if(b.blocknoX==module.exports.cs){
					b.blocknoY++;
					b.blocknoX=0;
					if(b.blocknoY==module.exports.cs){
						b.blocknoZ++;
						b.blocknoY=0;
						if(b.blocknoZ==module.exports.cs){
							b.blocknoZ=0;
						}
					}
				}
				//console.log(b.blocknoX,b.blocknoY,b.blocknoZ)
				//console.log(b.blocknoX,b.blocknoZ)
			}
			b.ccq.splice(0,1)
		}
		b.on("position",function(a){
			if(!b.ccStarted){
				if(!b.o.ccore_teleport){
					b.original_pos={x:a.x,y:a.y,z:a.z};
				}
				//console.log("started")
				setTimeout(()=>{b.ccqi=setInterval(b.advanceccq,1)},3000); //3.6 Seconds
				b.ccStarted=true;
			} else {
				if(a.x!==b.original_pos.x || a.z!==b.original_pos.z){
					b.pos.correct=0;
				}
			}
			b.pos={x:a.x,y:a.y,z:a.z,correct:1}

			//console.log(b.pos);
			b.commandPos={
				x1:Math.floor(a.x)-3,
				x2:Math.ceil(a.x)+3,
				z1:Math.floor(a.z)-3,
				z2:Math.ceil(a.z)+3,
				y1:0,
				y2:0
			};
			//b.send("/fill ~5 0 ~5 ~-5 0 ~-5 command_block")
		})
		b.tellraw=(uuid,message)=>{
			b.ccq.push(`/tellraw @a[nbt={UUID:[I;${uuidToInt(uuid)}]}] ${message}`)
		}
		b.message=(message)=>{
			b.ccq.push(`/tellraw @a {"translate":"chat.type.announcement","color":"aqua","with":[{"text":"${settings.name}","color":"#FF96FC"},{"text":"${message}","color":"#FF96FC"}]}`)
		}
	}
}
