module.exports={
    execute: (c)=>{
        if(c.verify<2) return;
        process.exit(0);
    },
    desc: "Restart bot",
    usage: ' <required> [optional]',
    hidden: true,
    aliases: ["restart", "exit"]
}
