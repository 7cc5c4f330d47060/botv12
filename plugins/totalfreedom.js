const fs = require('fs')
module.exports = {
  load: function () {
  },
  load2: function (b) {
    b.commands = []
    let _bl = 2147483647
    b.on('declare_commands', data => {
	    	b.commands = [] // avoid bullshit when spam deop
      // code here is BB4 style but without as much skidding
      // fs.writeFileSync("./ubotdebug/"+Math.floor(Date.now()/1000)+"_"+b.host+"_"+b.port+"_"+Math.floor(Math.random()*1000000)+"_declaretest.json",JSON.stringify(data.nodes));
      const filename = './ubotdebug/' + Math.floor(Date.now() / 1000) + '_' + b.host + '_' + b.port + '_' + Math.floor(Math.random() * 1000000) + '_declaretest.txt'
      // const filename2 = "./ubotdebug/"+Math.floor(Date.now()/1000)+"_"+b.host+"_"+b.port+"_"+Math.floor(Math.random()*1000000)+"_declaretest.txt"
      // fs.writeFileSync(filename2,JSON.stringify(data.nodes.filter(v => v?.flags?.command_node_type === 1).map(v => v.extraNodeData?.name)));
      for (const i in data.nodes) {
        if (data.nodes[i].children) {
          for (const j in data.nodes[i].children) {
            if (_bl > data.nodes[i].children[j]) _bl = data.nodes[i].children[j]
          }
        }
        if (data.nodes[i].extraNodeData) {
          if (data.nodes[i].extraNodeData.name) {
            if (!(data.nodes[i].flags.command_node_type == 1 && !_bl < i)) {
              b.emit('newcmds', b.commands)
              // fs.writeFileSync("./ubotdebug/"+Math.floor(Date.now()/1000)+"_"+b.host+"_"+b.port+"_"+Math.floor(Math.random()*1000000)+"_declaretest2.txt",b.commands.join("\n"));
              // console.log(b.commands.length);
              return
            }

            b.commands.push(data.nodes[i].extraNodeData.name)
            // fs.appendFileSync(filename,`Command found (${i}) (${data.nodes[i].children.length}): /${data.nodes[i].extraNodeData.name.toString()}\n`)
          }
        }
      }
    })
    b.on('newcmds', (packet) => {
      for (const i in packet) {
        if (packet[i] == 'totalfreedommod' ||
                packet[i] == 'totalfreedommod:tfm' ||
                packet[i].includes('totalfreedommod') ||
                packet[i].includes('freedom-01')) {
          /* b.chat('TotalFreedomMod detected, disconnecting.');
					setTimeout(()=>{
						b.reconnect=false;
						b.end();
					},1500); */
        }
      }
    })
    /* b.on('tab_complete',(sex)=>{//sussy compatibility
            if(sex.matches[0] && sex.matches[0].constructor==String){
                let newArray=[];
                for(const i in sex.matches){
                    newArray.push({match: sex.matches[i]});
                }
                b.emit('_tab_complete',{
                    matches: newArray,
                    transactionId: 1
                });
            } else {
                b.emit('_tab_complete',sex);
            }
        });
        b.on('_tab_complete',(packet)=>{
            for(const i in packet.matches){
                if(packet.matches[i].match=='totalfreedommod' ||
                packet.matches[i].match=='/totalfreedommod' ||
                packet.matches[i].match=='/totalfreedommod:tfm' ||
                packet.matches[i].match=='totalfreedommod' ||
                packet.matches[i].match=='totalfreedommod:tfm' ||
                packet.matches[i].match.includes('totalfreedommod') ||
                packet.matches[i].match.includes('freedom-01')){
                    b.chat('TotalFreedomMod detected, disconnecting.');
                    setTimeout(()=>{
                        b.reconnect=false;
                        b.end();
                    },1500);
                }
            }
        }); */
  }
}
