import { getMessage } from '../util/lang.js'

const execute = c => {
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
        return
      }
      c.bot.addCloop(command, rate)
      c.reply({
        text: 'command.cloop.success.add',
        parseLang: true,
        with: [
          command,
          rate + ''
        ]
      })
      break
    }
    case 'remove': {
      c.bot.removeCloop(c.args[0])
      c.reply({
        text: 'command.cloop.success.remove',
        parseLang: true,
        with: [
          c.args[0]
        ]
      })
      break
    }
    case 'list':
      c.bot.cloops.forEach((item, i) => {
        c.reply({
          text: 'command.cloop.list',
          parseLang: true,
          with: [
            i.toString(),
            item.command,
            item.rate + ''
          ]
        })
      })
      break
    case 'clear':
      c.bot.clearCloops()
      c.reply({
        text: getMessage(c.lang, 'command.cloop.success.clear')
      })
      break
    default:
      c.reply({
        text: 'command.error.subcommand',
        parseLang: true,
        with: [
          `${c.prefix}help cloop`
        ]
      })
  }
}
const consoleIndex = true
const level = 1
export { execute, consoleIndex, level }
