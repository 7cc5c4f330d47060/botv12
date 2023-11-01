module.exports={//profileless_chat player_chat system_chat
    load:()=>{
        //console.log("Loaded on global")
    },
    loadBot:(b)=>{
        //console.log(`Loaded on bot ${b.id}`)
        b._client.on("success",()=>{
            setInterval(()=>{
                if(b.chatqueue.length!=0){
                    b._client.chat(b.chatqueue[0]);
                    b.chatqueue.splice(0,1)
                }
            },300)
            //b.chat("Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. ")
        })
        b.chatqueue=["Prefix: \" (not implemented)"];
        b.chat=function chat(msg){
            msg.match(/.{0,250}/g).forEach(element => {
                b.chatqueue.push(element)
            });
        }

    }
}