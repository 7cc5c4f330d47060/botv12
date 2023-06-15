module.exports={
	load: function(){
	},
	load2: function(b){
		b.on("success",()=>{
			b.write("tab_complete",{
				transactionId:100,
				text:"/"
			});
		});
		b.on("tab_complete",(sex)=>{//sussy compatibility
			if(sex.matches[0] && sex.matches[0].constructor==String){
				let newArray=[];
				for(const i in sex.matches){
					newArray.push({match: sex.matches[i]});
				}
				b.emit("_tab_complete",{
					matches: newArray,
					transactionId: 1
				});
			} else {
				b.emit("_tab_complete",sex);
			}
		});
		b.on("_tab_complete",(packet)=>{
			for(const i in packet.matches){
				if(packet.matches[i].match=="totalfreedommod" ||
				packet.matches[i].match=="/totalfreedommod" ||
				packet.matches[i].match=="/totalfreedommod:tfm" ||
				packet.matches[i].match=="totalfreedommod" ||
				packet.matches[i].match=="totalfreedommod:tfm" ||
				packet.matches[i].match.includes("totalfreedommod") ||
				packet.matches[i].match.includes("freedom-01")){
					b.chat("TotalFreedomMod detected, disconnecting.");
					setTimeout(()=>{
						b.reconnect=false;
						b.end();
					},1500);
				}
			}
		});
	}
};
