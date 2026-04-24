import { getMessage } from '../util/lang.js'
import Command from '../util/game/botcmd/Command.js'
import CommandContext from '../util/game/botcmd/CommandContext.js'

export default class CommandLoopCommand extends Command {
  constructor () {
    super()
    this.name = 'cloop'
    this.execute = (c: CommandContext) => {
      if (!('isBot' in c.bot)) return
      let subcmd
      if (c.args.length >= 1) subcmd = c.args.splice(0, 1)[0].toLowerCase()
      switch (subcmd) {
        case 'add': {
          if (!c.bot.cloopManager.addCloop) return
          const rate = +(c.args.splice(0, 1)[0])
          const command = c.args.join(' ')
          if (rate < 20) {
            c.reply({
              text: getMessage(c.lang, 'command.cloop.error.tooShort'),
              color: '$error',
            })
            return
          }
          c.bot.cloopManager.addCloop(command, rate)
          c.reply({
            text: 'command.cloop.success.add',
            parseLang: true,
            color: '$secondary',
            with: [
              { text: command, color: '$primary' },
              { text: rate + '', color: '$primary' }
            ]
          })
          break
        }
        case 'remove': {
          if (!c.bot.cloopManager.removeCloop) return
          c.bot.cloopManager.removeCloop(+c.args[0])
          c.reply({
            text: 'command.cloop.success.remove',
            parseLang: true,
            color: '$secondary',
            with: [
              { text: c.args[0], color: '$primary' }
            ]
          })
          break
        }
        case 'list':
          c.bot.cloopManager.cloops.forEach((item, i) => {
            c.reply({
              text: 'command.cloop.list',
              parseLang: true,
              color: '$secondary',
              with: [
                { text: i.toString(), color: '$primary' },
                { text: item.command, color: '$primary' },
                { text: item.rate + '', color: '$primary' }
              ]
            })
          })
          break
        case 'clear':
          if (!c.bot.cloopManager.clearCloops) return
          c.bot.cloopManager.clearCloops()
          c.reply({
            text: getMessage(c.lang, 'command.cloop.success.clear'),
            color: '$secondary'
          })
          break
        default:
          c.reply({
            text: 'command.error.subcommand',
            parseLang: true,
            color: '$error',
            with: [
              `${c.prefix}help cloop`
            ]
          })
      }
    }
    this.level = 1
    this.consoleIndex = true
  }
}
