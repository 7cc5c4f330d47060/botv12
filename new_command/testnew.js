// const index=require("../../index.js");
const settings = require('../settings.json')
module.exports = {
  command: function (c) {
    /*
      c.send(text, user?): Send text to all ("/tellraw @a") or to user ("/tellraw ${user}")
      c.reply(text): Send text to command sender
      c.uuid: Unique identifier (UUID for Minecraft, Discord ID for Discord)
      c.username: Username of sender
      c.nickname: Nickname of sender when applicable
      c.command: Command string
      c.args: Arguments of command (above without the first section, and split at every space)
      c.prefix: Prefix being used to send the command (when applicable)
      c.bot: Bot that received the command. Will be different type based on where it was received,
      c.type: Type of bot receiving the command ("minecraft", "console", "discord")
      c.index: Bot number to run the command as.
    */
    console.log(c);
    c.reply('{"text":"Command working!"}');
  },
  desc: 'Testing command',
  usage: ' [text]'
}
