const getMessage = require('../../util/lang.js')
module.exports={
    execute: (c)=>{
        const subcmd=c.args.splice(0,1)[0];
        switch(subcmd){
            case "add":
                const rate=+(c.args.splice(0,1)[0]);
                const command=c.args.join(" ");
                if(rate<20){
                    c.reply({text:getMessage(c.lang,"command.cloop.error.tooShort")})
                }
                c.bot.addCloop(command,rate)
                c.reply({text:getMessage(c.lang,"command.cloop.success.add",[command,rate+""])})
                break
            case "remove":
                const index=+c.args[0];
                c.bot.removeCloop(c.args[0]);
                c.reply({text:getMessage(c.lang,"command.cloop.success.remove",[index+""])})
                break
            case "list":
                for(const i in c.bot.cloops){
                    c.reply({text:getMessage(c.lang,"command.cloop.list",[i,c.bot.cloops[i].command,c.bot.cloops[i].rate+""])})
                }
                break
            case "clear":
                c.bot.clearCloops();
                c.reply({text:getMessage(c.lang,"command.cloop.success.clear")})
                break
            default:
                c.reply(`Unknown subcommand, please do ${c.prefix}help cloop`)
        }
    },
    consoleIndex: true,
    level: 1
}
