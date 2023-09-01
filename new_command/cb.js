const index = require('../index.js')
module.exports = {
  command: function (c) {
    if (c.bot.o.cc_enabled) {
      c.bot.ccq.push(c.args.join(' '))
    } else {
      c.bot.send('Command core is disabled, command will not run.')
    }
  },
  desc: 'Run a command in a command block',
  usage: ' <command>',
  usage_c: ' <botid | *> <message>',
  hidden: false,
  coreRequired: true,
  consoleIndex: true,
  aliases: ['cc', 'commandblock', 'cblock']
}
