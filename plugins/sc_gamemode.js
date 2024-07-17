
module.exports={
    load:()=>{

    },
    loadBot:(b)=>{
        b.add_sc_task("gamemode","/minecraft:gamemode creative", true)
        b._client.on('game_state_change', (p) => {
            if (p.reason == 3 && p.gameMode != 1) {
                b.sc_tasks["gamemode"].failed = 1
            } else if (p.reason == 3 && p.gameMode == 1) {
                b.sc_tasks["gamemode"].failed = 0
            }
        })
    }
}
