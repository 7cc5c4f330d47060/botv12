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
      //Lists unvanished players. Vanished support will come later.
      for(const uuid in c.bot.playerInfo.players){
        const playerItem = c.bot.playerInfo.players[uuid]
        c.reply({
          text: 'command.list.item',
          parseLang: true,
          with: [
            playerItem.realName,
            uuid 
          ]
        })
      }
    }
  }
}
