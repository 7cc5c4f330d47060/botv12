module.exports={
    execute: (c)=>{
        if(c.type!="console") return;
        process.exit(0);
    },
    desc: "Restart bot", // Command description
    usage: ' <required> [optional]', // Command usage
    hidden: true,
    aliases: ["restart"]
}
