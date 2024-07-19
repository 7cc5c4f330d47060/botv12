module.exports={
    execute: (c)=>{
        c.bot.chat(`/fill ~ 20 ~ ~3 25 ~3 command_block{CustomName:'{"translate":"pack.dropConfirm","color":"#FFAAFF"}'}`)
    },
    desc: "Refill core", // Command description
    usage: '', // Command usage
    consoleIndex: true, // When run from console, the second argument will be a bot ID
    aliases: ["refillcore", "rc"]
}
