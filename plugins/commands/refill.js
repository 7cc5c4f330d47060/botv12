module.exports={
    execute: (c)=>{
        c.bot.chat(`/fill ~ 20 ~ ~3 25 ~3 command_block{CustomName:'{"translate":"%s %s","with":[{"translate":"entity.minecraft.ender_dragon"},{"translate":"language.region"}],"color":"#FFAAEE"}'}`)
    },
    consoleIndex: true,
    aliases: ["refillcore", "rc"]
}
