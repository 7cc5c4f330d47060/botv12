module.exports={
    execute: (c)=>{
        c.bot._client.end();
    },
    desc: "Does nothing", // Command description
    usage: ' <required> [optional]', // Command usage
    hidden: true,
    consoleIndex: true
}
