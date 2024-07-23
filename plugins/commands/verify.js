module.exports={
    execute: (c)=>{
        c.reply({
            text: c.verify+""
        })
        c.reply({
            text: c.command
        })
    },
    hidden: false,
    level: 1
}
