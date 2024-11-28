const execute = (c) => {
  // Blank template
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
        c.lang: The language the player has selected, or the default if none
        c.colors: The color palette the player has selected, or the default if none
        */
}
/*
        Command description and usage have been moved to the message files. The format for a basic command is:
            "command.(name).usage": " <required> [optional]",
            "command.(name).desc": "Insert description here...",
        replacing (name) with the name of the new command.
        Some more complex commands may have messages of their own, which should be placed there too.
        First, insert the following line near the top of the command's file (not in the execute function):
            const { getMessage } = require('../../util/lang.js')
        Then, to get a specific message:
            getMessage(c.lang,"(message key)",[(arguments, in an array (optional))])
        For example, this will show the "about" command's redirection to "serverinfo":
            getMessage(c.lang,"command.about.serverinfo")
        The with array can be used to add information to a message. For example:
            getMessage(lang,"command.help.commandInfo",["cmd","usage","desc"])
        shows the "help" command's formatting for command information, with some strings as items.
        That message would render as (in en-US):
            cmdusage - desc
        Extra information is inserted wherever there is a "%s" or a "%n$s", with n being the index of the item in the array.
    */
const hidden = true // To show the command on the help command list, remove this line (optional)
const consoleIndex = true // When run from console, the second argument will be a bot ID (optional)
const aliases = ['example'] // Other command names that will work the same (optional)
const level = 0 // Permission level required to run this command (optional)
export { execute, hidden, consoleIndex, aliases, level } // Only export the items that were included in your command
