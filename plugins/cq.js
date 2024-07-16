module.exports={//profileless_chat player_chat system_chat
    load:()=>{
        //console.log("Loaded on global")
    },
    loadBot:(b)=>{
        //console.log(`Loaded on bot ${b.id}`)
        b._client.on("login",()=>{
            b.interval.chatQueue=setInterval(()=>{
                if(b.chatqueue.length!=0){
                    b._client.chat(b.chatqueue[0]);
                    b.chatqueue.splice(0,1)
                }
            },150)
            //b.chat("Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. Text longer than 256 characters. ")
        })
        b.chatqueue=[];
        b.chat=function chat(msg){
            if(msg.length==0) return;
            msg.match(/.{1,250}/g).forEach(element => {
                b.chatqueue.push(element)
            });
        }

    }
}
