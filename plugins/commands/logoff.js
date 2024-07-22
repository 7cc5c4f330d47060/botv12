module.exports={
    execute: (c)=>{
        if(c.verify<2) return;
        c.bot._client.end();
    },
    desc: "Does nothing",
    usage: ' <required> [optional]',
    hidden: true,
    consoleIndex: true
}
