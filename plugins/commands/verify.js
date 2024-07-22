module.exports={
    execute: (c)=>{
        c.reply({
            text: c.verify+""
        })
        c.reply({
            text: c.command
        })
    },
    desc: "Does nothing",
    usage: ' <required> [optional]',
    hidden: false,
    level: 1
}
