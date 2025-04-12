import { getMessage } from '../util/lang.js'
const execute = c => {
  let subcmd
  if (c.args.length >= 1) subcmd = c.args.splice(0, 1)[0].toLowerCase()
  console.log(subcmd)
  console.log(c.args)
  switch (subcmd) {
    case 'add': {
      const command = c.args.join(' ')
      let playerName
      let uuid
      console.log(command)
      if (!/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/.test(command)) {
        playerName = command
        uuid = c.bot.findUUID(playerName)
        if (uuid === '00000000-0000-0000-0000-000000000000') {
          c.reply({
            text: getMessage(c.lang, 'command.filter.error.notFound')
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
          text: getMessage(c.lang, 'command.filter.error.filtered')
        })
        return
      }
      c.reply({
        translate: getMessage(c.lang, 'command.filter.success.add'),
        color: c.colors.secondary,
        with: [
          {
            text: command,
            color: c.colors.primary
          },
          {
            text: playerName,
            color: c.colors.primary
          }
        ]
      })
      break
    }
    case 'remove': {
      c.bot.removeFilter(c.args[0])
      c.reply({
        translate: getMessage(c.lang, 'command.filter.success.remove'),
        color: c.colors.secondary,
        with: [
          {
            text: c.args[0],
            color: c.colors.primary
          }
        ]
      })
      break
    }
    case 'list':
      c.bot.filteredPlayers.forEach(item => {
        c.reply({
          translate: getMessage(c.lang, 'command.filter.list'),
          color: c.colors.secondary,
          with: [
            {
              text: item.username,
              color: c.colors.primary
            },
            {
              text: item.uuid,
              color: c.colors.primary
            }
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
        translate: getMessage(c.lang, 'command.error.subcommand'),
        color: c.colors.secondary,
        with: [
          {
            text: `${c.prefix}help filter`,
            color: c.colors.primary
          }
        ]
      })
  }
}

const level = 1
const aliases = ['blacklist']
const consoleIndex = true
export { execute, level, consoleIndex, aliases }
