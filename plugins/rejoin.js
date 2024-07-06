const index = require('../index.js')
module.exports={
    load:()=>{
        //console.log("Loaded on global")
    },
    loadBot:(b)=>{
        b._client.on("end",()=>{
            b.info("bot "+b.id+" disconnected");
            for(const i in b.interval){
                clearInterval(b.interval[i])
            }
            setTimeout(()=>{
                b.info("Re-connecting bot "+b.id)
                const b_id = b.id;
                index.createBot(b.host,b.id);
            },5000)
        })
    }
}
