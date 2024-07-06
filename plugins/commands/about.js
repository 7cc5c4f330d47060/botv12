// This is not C source code
//const settings = require('../settings.json')
module.exports = {
  execute: function (c) {
    c.reply('{"text":"UBot - a minecraft bot made by a \\"baby\\""}');
    c.reply('{"text":""}');
    c.reply('{"text":"To view system information, run the command \\"serverinfo\\"."}')
    c.reply('{"text":""}');
    c.reply('{"text":"This is a new version so most features from version 9 and older have not been re-implemented."}')
    c.reply('{"text":""}');
    c.reply('{"text":"The first version of UBot was made in August 2020."}')
  },
  desc: 'About the bot',
  usage: ''
}
