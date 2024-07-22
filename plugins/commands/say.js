module.exports={
    execute: (c)=>{
        if(c.args[0].startsWith("/") && !c.verify<1) return;
        c.bot.chat(c.args.join(" "))
    },
    desc: "Sends a message to chat",
    usage: ' <message>',
    hidden: true,
    consoleIndex: true
}
