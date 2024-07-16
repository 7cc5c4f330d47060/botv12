// This is not C source code
//const settings = require('../settings.json')
const settings = require("../../settings.json")
module.exports = {
  execute: function (c) {
    c.reply('{"text":"UBot - a minecraft bot made by a \\"baby\\""}');
    c.reply('{"text":""}');
    c.reply('{"text":"Version '+settings.version+'"}');
    c.reply('{"text":""}');
    c.reply('{"text":"To view system information, run the command \\"serverinfo\\"."}')
  },
  desc: 'About the bot',
  usage: ''
}
