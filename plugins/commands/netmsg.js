const {bot}=require("../../index.js");
module.exports={
    execute: (c)=>{
        const json={
            translate: "[%s] %s: %s",
            with:[
                {
                    translate: "%s:%s",
                    with:[
                        {
                            text: c.host,
                            color: "light_purple"
                        },
                        {
                            text: c.port+"",
                            color: "light_purple"
                        }
                    ],
                    color: "gray"
                },
                {
                    text: c.username,
                    color: "light_purple"
                },
                {
                    text: c.args.join(" ")
                },
            ],
            color: "white"
        }
        for(const i in bot){
            bot[i].tellraw("@a",JSON.stringify(json))
        }
    },
    desc: "Send a message to all servers the bot is connected to", // Command description
    usage: ' <message>', // Command usage
    consoleIndex: false // When run from console, the second argument will be a bot ID
}
