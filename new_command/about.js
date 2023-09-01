// const index=require("../../index.js");
const settings = require('../settings.json')
module.exports = {
  command: function (c) {
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
    c.reply('{"text":"UBot - a minecraft bot made by a \\"baby\\""}');
    c.reply('{"text":""}');
    c.reply('{"text":"Text from the Wikimedia wikis, which can be accessed through the command \\"wiki\\", is released under the CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0/"}');
    c.reply('{"text":""}');
    c.reply('{"text":"To view system information, run the command \\"serverinfo\\"."}');
    // 2026 EDIT: It is now MIT License. The below notice can be ignored.
    //all rights are reserved by default, even without a copyright notice
    //copyright notice (if needed): c.reply('{"text":"© 2020-2023 baby. All rights reserved."}');

  },
  desc: 'Testing command',
  usage: ' [text]'
}
