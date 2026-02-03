import CommandContext from "../util/CommandContext"
import Command from "../util/Command.js";

export default class ListCommand extends Command {
  constructor () {
    super()
    this.name = 'list'
    this.execute = async (c: CommandContext) => {
      if(!('isBot' in c.bot)){
        // Console list function here... (bypass consoleIndex)
        const server = +c.args[0];
        const b = bots[server]
        if(!b.playerInfo.players) return
        const keys = Object.keys(b.playerInfo.players)
        c.reply({
          text: 'command.list.intro',
          parseLang: true,
          with: [
            {
              text: `command.list.intro.${keys.length == 1 ? 'one' : 'many'}`,
              parseLang: true,
              with: [
                keys.length + ''
              ]
            },
            {
              text: '%s:%s',
              with: [
                b.host.fakeHost ?? b.host.host,
                b.host.port ? b.host.port + '' : '25565'
              ]
            }
          ]
        })
        for(const uuid in b.playerInfo.players){
          const playerItem = b.playerInfo.players[uuid]
          c.reply({
            text: 'command.list.item',
            parseLang: true,
            with: [
              playerItem.realName,
              uuid 
            ]
          })
        }
        return
      }
      if(!c.bot.playerInfo.players) return
      const keys = Object.keys(c.bot.playerInfo.players)
      c.reply({
        text: 'command.list.intro',
        parseLang: true,
        with: [
          {
            text: `command.list.intro.${keys.length == 1 ? 'one' : 'many'}`,
            parseLang: true,
            with: [
              keys.length + ''
            ]
          },
          {
            text: '%s:%s',
            with: [
              c.bot.host.fakeHost ?? c.bot.host.host,
              c.bot.host.port ? c.bot.host.port + '' : '25565'
            ]
          }
        ]
      })
      for(const uuid in c.bot.playerInfo.players){
        const playerItem = c.bot.playerInfo.players[uuid]
        c.reply({
          text: 'command.list.item',
          parseLang: true,
          with: [
            {text: playerItem.realName, copyable: true},
            {text: uuid, copyable: true} 
          ]
        })
      }
    }
  }
}
