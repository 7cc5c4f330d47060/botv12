import CommandContext from '../util/CommandContext'
import Command from '../util/Command.js'

export default class ListCommand extends Command {
  constructor () {
    super()
    this.name = 'list'
    this.execute = async (c: CommandContext) => {
      if (!('isBot' in c.bot)) return
      if (!c.bot.playerInfo.players) return
      const keys = Object.keys(c.bot.playerInfo.players)
      c.reply({
        text: 'command.list.intro',
        parseLang: true,
        with: [
          {
            text: `command.list.intro.${keys.length === 1 ? 'one' : 'many'}`,
            color: '$secondary',
            parseLang: true,
            with: [
              { text: keys.length + '', color: '$primary' }
            ]
          },
          {
            text: '%s:%s',
            with: [
              { text: c.bot.host.fakeHost ?? c.bot.host.host, color: '$primary' },
              { text: c.bot.host.port ? c.bot.host.port + '' : '25565', color: '$primary' }
            ]
          }
        ]
      })
      for (const uuid in c.bot.playerInfo.players) {
        const playerItem = c.bot.playerInfo.players[uuid]
        c.reply({
          text: 'command.list.item',
          color: '$secondary',
          parseLang: true,
          with: [
            { text: playerItem.realName, copyable: true, color: '$primary' },
            { text: uuid, copyable: true, color: '$primary' }
          ]
        })
      }
      if (c.type === 'console') c.reply('')
    }
    this.consoleIndex = true
  }
}
