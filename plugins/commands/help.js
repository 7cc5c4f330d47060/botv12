module.exports={
    execute: (c)=>{
        if(c.args.length>0){
            c.bot.printCmdHelp(c.uuid,c.args[0],c.lang);
        } else {
            c.bot.printHelp(c.uuid,c.prefix,c.lang);
        }
    },
    aliases: [
        "heko" //Parker2991 request
    ]
}
