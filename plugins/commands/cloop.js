const {getMessage} = require('../../util/lang.js')
module.exports = {
  execute: (c) => {
    const subcmd = c.args.splice(0, 1)[0]
    switch (subcmd) {
      case 'add': {
        const rate = +(c.args.splice(0, 1)[0])
        const command = c.args.join(' ')
        if (rate < 20) {
          c.reply({
            text: getMessage(c.lang, 'command.cloop.error.tooShort')
          })
        }
        c.bot.addCloop(command, rate)
        c.reply({
          translate: getMessage(c.lang, 'command.cloop.success.add'),
          color: c.colors.secondary,
          with: [
            {
              text: command,
              color: c.colors.primary
            },
            {
              text: rate + '',
              color: c.colors.primary
            }
          ]
        })
        break
      }
      case 'remove': {
        const index = +c.args[0]
        c.bot.removeCloop(c.args[0])
        c.reply({
          translate: getMessage(c.lang, 'command.cloop.success.remove'),
          color: c.colors.secondary,
          with: [
            {
              text: index + '',
              color: c.colors.primary
            }
          ]
        })
        break
      }
      case 'list':
        for (const i in c.bot.cloops) {
          c.reply({
            translate: getMessage(c.lang, 'command.cloop.list'),
            color: c.colors.secondary,
            with: [
              {
                text: i,
                color: c.colors.primary
              },
              {
                text: c.bot.cloops[i].command,
                color: c.colors.primary
              },
              {
                text: c.bot.cloops[i].rate + '',
                color: c.colors.primary
              }
            ]
          })
        }
        break
      case 'clear':
        c.bot.clearCloops()
        c.reply({
          text: getMessage(c.lang, 'command.cloop.success.clear'),
          color: c.colors.secondary
        })
        break
      default:
        c.reply({
          translate: getMessage(c.lang, 'command.cloop.error.subcommand'),
          color: c.colors.secondary,
          with: [
            {
              text: `${c.prefix}help cloop`,
              color: c.colors.primary
            }
          ]
        })
    }
  },
  consoleIndex: true,
  level: 1
}
