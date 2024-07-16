module.exports={
    execute: (c)=>{
        if(c.args.length>0){
            c.bot.printCmdHelp(c.uuid,c.args[0]);
        } else {
            c.bot.printHelp(c.args[0]);
        }
    },
    desc: "Shows command help",
    usage: ' [cmd]'
}
