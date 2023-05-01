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
		b.on("tab_complete",(packet)=>{
			for(const i in packet.matches){
				if(packet.matches[i].match=="totalfreedommod" ||
				packet.matches[i].match=="/totalfreedommod" ||
				packet.matches[i].match=="/totalfreedommod:tfm" ||
				packet.matches[i].match=="totalfreedommod:tfm" ||
				packet.matches[i].match=="totalfreedommod:tfm" ||
				packet.matches[i].match.includes("totalfreedommod")){
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
