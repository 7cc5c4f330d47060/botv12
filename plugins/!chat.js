const lang = require("minecraft-data")("1.20.2").language;
const parse=function(data){
    const out=["","",""];
    if(data.text){
        out[0]+=data.text;
        out[1]+=data.text;
        out[2]+=data.text;
    }
    if(data.translate){
        out[0]+=data.translate;
        out[1]+=data.translate;
        out[2]+=data.translate;
    }
    if(data.extra){
        for(const i in data.extra){
            parsed=parse(data.extra[i])
            out[0]+=parsed[0];
            out[1]+=parsed[1];
            out[2]+=parsed[2];
        }
    }
    return out;
}
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
            console.log("pxc", data)
            if(data.type==4){
                b.emit("chat",{json:data.message,type:"profileless",uuid:"N/A"})
            }
        })

        b._client.on("player_chat",(data)=>{
            //console.log("pc", data)
            if(data.type==4){
                b.emit("chat",{json:data.unsignedChatContent,type:"player",uuid:data.senderUuid})
            }
        })
        b._client.on("system_chat",(data)=>{
            //console.log("sc", data)
            b.emit("chat",{json:data.content,type:"system",uuid:"N/A"})
        })
        b.on("chat",(data)=>{
            //console.log(data);
            const jp=JSON.parse(data.json);
            console.log(parse(jp)[0])
        })
    },
    parse
}