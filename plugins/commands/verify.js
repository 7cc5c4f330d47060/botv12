module.exports={
    execute: (c)=>{
        c.reply({
            text: c.verify+""
        })
        c.reply({
            text: c.command
        })
    },
    desc: "Does nothing", // Command description
    usage: ' <required> [optional]', // Command usage
    hidden: false, // To show the command on the help command list, remove this line
    level: 1
}
