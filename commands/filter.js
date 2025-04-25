import { getMessage } from '../util/lang.js'
const execute = c => {
  let subcmd
  if (c.args.length >= 1) subcmd = c.args.splice(0, 1)[0].toLowerCase()
  switch (subcmd) {
    case 'add': {
      const command = c.args.join(' ')
      let playerName
      let uuid
      if (!/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/.test(command)) {
        playerName = command
        uuid = c.bot.findUUID(playerName)
        if (uuid === '00000000-0000-0000-0000-000000000000') {
          c.reply({
            text: 'command.filter.error.notFound',
            parseLang: true,
            color: '$error'
          })
          return
        }
      } else {
        playerName = c.bot.findRealNameFromUUID(command)
        uuid = command
      }

      if (!c.bot.isFiltered(command)) {
        playerName = c.bot.findRealNameFromUUID(command)
        c.bot.addFilter(uuid, playerName)
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
        parseLang: true,
        with: [
          command,
          playerName
        ]
      })
      break
    }
    case 'remove': {
      c.bot.removeFilter(c.args[0])
      c.reply({
        text: 'command.filter.success.remove',
        parseLang: true,
        with: [
          c.args[0]
        ]
      })
      break
    }
    case 'list':
      c.bot.filteredPlayers.forEach(item => {
        c.reply({
          text: 'command.filter.list',
          parseLang: true,
          with: [
            item.username,
            item.uuid
          ]
        })
      })
      break
    case 'clear':
      // c.bot.clearCloops()
      c.reply({
        text: getMessage(c.lang, 'Not implemented')
      })
      break
    default:
      c.reply({
        text: 'command.error.subcommand',
        parseLang: true,
        with: [
          `${c.prefix}help filter`
        ]
      })
  }
}

const level = 1
const aliases = ['blacklist']
const consoleIndex = true
export { execute, level, consoleIndex, aliases }
