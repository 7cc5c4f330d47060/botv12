module.exports={
    execute: (c)=>{
        c.bot.ccq.push(c.args.join(" "))
    },
    desc: "Run a command in a command block",
    usage: ' <command>',
    consoleIndex: true,
    aliases: ["commandblock", "cmdblock"]
}
