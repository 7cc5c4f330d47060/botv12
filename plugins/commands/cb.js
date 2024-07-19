module.exports={
    execute: (c)=>{
        c.bot.ccq.push(c.args.join(" "))
    },
    desc: "Run a command in a command block", // Command description
    usage: ' <command>', // Command usage
    hidden: true, // To show the command on the help command list, remove this line
    consoleIndex: true, // When run from console, the second argument will be a bot ID
    aliases: ["commandblock", "cmdblock"] // Other command names that will work the same
}
