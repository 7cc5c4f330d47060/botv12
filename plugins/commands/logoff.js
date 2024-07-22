module.exports={
    execute: (c)=>{
        c.bot._client.end();
    },
    desc: "Does nothing",
    usage: ' <required> [optional]',
    hidden: true,
    consoleIndex: true,
    level: 2
}
