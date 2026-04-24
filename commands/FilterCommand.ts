import Command from '../util/game/botcmd/Command.js'
import CommandContext from '../util/game/botcmd/CommandContext.js'

export default class FilterCommand extends Command {
  constructor () {
    super()
    this.name = 'filter'
    this.execute = async (c: CommandContext) => {
      if (!('isBot' in c.bot)) return
      if (!c.bot.playerInfo || !c.bot.filter) return
      let subcmd
      if (c.args.length >= 1) subcmd = c.args.splice(0, 1)[0].toLowerCase()
      switch (subcmd) {
        case 'add': {
          const command = c.args.join(' ')
          let playerName
          let uuid
          if (!/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/.test(command)) {
            playerName = command
            uuid = c.bot.playerInfo.findUUID(playerName)
            if (uuid === '00000000-0000-0000-0000-000000000000') {
              c.reply({
                text: 'command.filter.error.notFound',
                parseLang: true,
                color: '$error'
              })
              return
            }
          } else {
            playerName = c.bot.playerInfo.findRealNameFromUUID(command)
            uuid = command
          }

          if (!c.bot.filter.isFiltered(command)) {
            playerName = c.bot.playerInfo.findRealNameFromUUID(command)
            c.bot.filter.addFilter(uuid, playerName)
          } else {
            c.reply({
              text: 'command.filter.error.filtered',
              parseLang: true,
              color: '$error'
            })
            return
          }

          c.reply({
            text: 'command.filter.success.add',
            color: '$secondary',
            parseLang: true,
            with: [
              { text: command, color: '$primary' },
              { text: playerName, color: '$primary' }
            ]
          })
          break
        }
        case 'remove': {
          c.bot.filter.removeFilter(c.args[0])
          c.reply({
            text: 'command.filter.success.remove',
            color: '$secondary',
            parseLang: true,
            with: [
              { text: c.args[0], color: '$primary' }
            ]
          })
          break
        }
        case 'list':
          c.bot.filter.filteredPlayers.forEach((item) => {
            c.reply({
              text: 'command.filter.list',
              color: '$secondary',
              parseLang: true,
              with: [
                { text: item.username, color: '$primary' },
                { text: item.uuid, color: '$primary' }
              ]
            })
          })
          break
        case 'clear':
          c.bot.filter.filteredPlayers = [] // Unlike cloop, filters don't use setInterval several times
          c.reply({
            text: 'command.filter.success.clear',
            color: '$secondary',
            parseLang: true
          })
          break
        default:
          c.reply({
            text: 'command.error.subcommand',
            color: '$secondary',
            parseLang: true,
            with: [
              { text: `${c.prefix}help filter`, color: '$primary' }
            ]
          })
      }
    }
    this.level = 1
    this.aliases = ['blacklist']
    this.consoleIndex = true
  }
}
