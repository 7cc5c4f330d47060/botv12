const settings = require('../settings.json')

module.exports = {
  command: function (c) {
    if (c.verify) {
      c.reply(JSON.stringify({'text':`Valid hash! Username: ${c.username}`,'color':settings.colors.primary}))
    }
  },
  desc: 'Check if the command verification system is working',
  usage: '[text] <hash>',
  verify: true
}
