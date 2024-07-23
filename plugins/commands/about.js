const version = require("../../version.json")
const settings = require('../../settings.json')
const getMessage = require('../../util/lang.js')
module.exports = {
  execute: function (c) {
    c.reply({text:getMessage(c.lang,"command.about.author",[settings.name])});
    c.reply({text:""});
    c.reply({text:getMessage(c.lang,"command.about.version",[version.bot])});
    c.reply({text:""});
    c.reply({text:getMessage(c.lang,"command.about.serverinfo")})
  },
  desc: 'About the bot',
  usage: '',
  aliases: ["info"]
}
