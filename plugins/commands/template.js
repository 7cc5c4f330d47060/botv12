module.exports={
    execute: (c)=>{
        //Blank template
        /*
        c.send(text, user?): Send text to all ("/tellraw @a")
        c.reply(text): Send text to command sender
        c.uuid: Unique identifier (UUID for Minecraft, Discord ID for Discord)
        c.username: Username of sender
        c.nickname: Nickname of sender when applicable
        c.command: Command string
        c.args: Arguments of command (above without the first section, and split at every space)
        c.prefix: Prefix being used to send the command (when applicable)
        c.bot: Bot that received the command. Will be different type based on where it was received
        c.type: Type of bot receiving the command ("minecraft", "console", "discord")
        */
    },
    desc: "Does nothing", // Command description
    usage: ' <required> [optional]', // Command usage
    hidden: true, // To show the command on the help command list, remove this line
    consoleIndex: true // When run from console, the second argument will be a bot ID
}
