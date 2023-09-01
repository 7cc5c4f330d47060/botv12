const index = require('../index.js')
module.exports = {
  command_b: function () {
    for (const i in index.bots) {
      if (index.bots[i].o.disabled) continue
      index.bots[i].message('Bot restarting...')
    }
    setTimeout(() => { process.exit(0) }, 1000)
  },
  command_c: function () {
    for (const i in index.bots) {
      if (index.bots[i].o.disabled) continue
      index.bots[i].message('Bot restarting...')
    }
    setTimeout(() => { process.exit(0) }, 1000)
  },
  desc: 'Restart the bot',
  usage: '',
  verify: true,
  hidden: true
}
