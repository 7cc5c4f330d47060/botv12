import { getMessage } from '../util/lang.js'
const execute = (c) => {
  let subcmd
  if (c.args.length >= 1) subcmd = c.args.splice(0, 1)[0].toLowerCase()
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
      c.bot.cloops.forEach((item, i) => {
        c.reply({
          translate: getMessage(c.lang, 'command.cloop.list'),
          color: c.colors.secondary,
          with: [
            {
              text: i.toString(),
              color: c.colors.primary
            },
            {
              text: item.command,
              color: c.colors.primary
            },
            {
              text: item.rate + '',
              color: c.colors.primary
            }
          ]
        })
      })
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
}
const consoleIndex = true
const level = 1

export { execute, consoleIndex, level }
