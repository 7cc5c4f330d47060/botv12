module.exports={
    execute: (c)=>{
        c.bot.chat(`/fill ~ 20 ~ ~3 25 ~3 command_block{CustomName:'{"translate":"pack.dropConfirm","color":"#FFAAFF"}'}`)
    },
    desc: "Refill core",
    usage: '',
    consoleIndex: true,
    aliases: ["refillcore", "rc"]
}
