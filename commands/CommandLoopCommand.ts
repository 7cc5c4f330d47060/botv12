import { getMessage } from '../util/lang.js'
import Command from "../util/Command.js"
import CommandContext from "../util/CommandContext.js"

export default class CommandLoopCommand extends Command {
  constructor () {
    super()
    this.name = 'cloop'
    this.execute = (c: CommandContext) => {
      if(!('isBot' in c.bot)) return
      let subcmd
      if (c.args.length >= 1) subcmd = c.args.splice(0, 1)[0].toLowerCase()
      switch (subcmd) {
        case 'add': {
          if(!c.bot.cloopManager.addCloop) return
          const rate = +(c.args.splice(0, 1)[0])
          const command = c.args.join(' ')
          if (rate < 20) {
            c.reply({
              text: getMessage(c.lang, 'command.cloop.error.tooShort')
            })
            return
          }
          c.bot.cloopManager.addCloop(command, rate)
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
          if(!c.bot.cloopManager.removeCloop) return
          c.bot.cloopManager.removeCloop(+c.args[0])
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
          c.bot.cloopManager.cloops.forEach((item, i) => {
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
          if(!c.bot.cloopManager.clearCloops) return
          c.bot.cloopManager.clearCloops()
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
    this.level = 1
    this.consoleIndex = true
  }
}
