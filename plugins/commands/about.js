const version = require("../../version.json")
const settings = require('../../settings.json')
module.exports = {
  execute: function (c) {
    c.reply({text:`${settings.name} - a minecraft bot made by 77c8f4699b732c11 / a5a06d596f15c7db`});
    c.reply({text:""});
    c.reply({text:`Version ${version.bot}`});
    c.reply({text:""});
    c.reply({text:"To view system information, run the command \"serverinfo\"."})
  },
  desc: 'About the bot',
  usage: '',
  aliases: ["info"]
}
