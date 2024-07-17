
module.exports={
    load:()=>{

    },
    loadBot:(b)=>{
        b.add_sc_task("cspy","/cspy on", true)
        b.on('plainchat', (msg) => {
            if (msg == "Successfully disabled CommandSpy") {
                b.sc_tasks["cspy"].failed = 1
            } else if (msg == "Successfully enabled CommandSpy") {
                b.sc_tasks["cspy"].failed = 0
            } 
        })
    }
}
