module.exports={
    execute: (c)=>{
        if(c.verify<2) return;
        process.exit(0);
    },
    desc: "Restart bot", // Command description
    usage: ' <required> [optional]', // Command usage
    hidden: true,
    aliases: ["restart", "exit"]
}
