const console2 = require("./console.js")
const parse = require("../util/chatparse.js")
const parse1204 = require("../util/chatparse_1204.js")
module.exports={
    load:()=>{
        //console.log("Loaded on global")
    },
    loadBot:(b)=>{
        //profileless_chat player_chat system_chat
                /*pxc {
  message: '{"text":"gex"}',
  type: 5,
  name: '{"bold":true,"italic":false,"color":"yellow","text":"NothingCore"}',
  target: undefined
}
*/
        b._client.on("profileless_chat",(data)=>{
            //console.log("pxc", data)
            if(data.type==4){
                //const parsedmessage = parse(JSON.parse(data.message));
                //console.log(parsedmessage)
                b.emit("chat",{json:parse1204(data.message),type:"profileless",uuid:"N/A", message: ""})
            }
        })

        b._client.on("player_chat",(data)=>{
            //console.log("pc", data)
            if(data.type==4){
                b.emit("chat",{json:parse1204(data.unsignedChatContent),type:"player",uuid:data.senderUuid, message: data.plainMessage})
            }
        })
        b._client.on("system_chat",(data)=>{
            //console.log("sc", data)
            //console.log(data)
            b.emit("chat",{json:parse1204(data.content),type:"system",uuid:"N/A", message: ""})
        })
        b.on("chat",(data)=>{
            const msg=parse(data.json);
            console.log(data.json);
            console2.write(`[${b.id}] [${data.type}] `+msg[0])
            let fullCommand = "";
            if(data.type=="player") fullCommand=data.message;
            //console.log(name, fullCommand)
            for(const i in b.prefix){
                if(fullCommand.startsWith(b.prefix[i])){
                    const command=fullCommand.slice(b.prefix[i].length);
                    b.runCommand("N/A",data.uuid,command,b.prefix[i]);
                }
            }
        })
    },
    parse
}
