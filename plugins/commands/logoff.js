module.exports={
    execute: (c)=>{
        if(c.verify<2) return;
        c.bot._client.end();
    },
    desc: "Does nothing", // Command description
    usage: ' <required> [optional]', // Command usage
    hidden: true,
    consoleIndex: true
}
