import Command from "../util/Command.js"
import CommandContext from "../util/CommandContext.js"

export default class RandomTpCommand extends Command {
  constructor () {
    super()
    this.name = 'rtp'
    this.execute = async (c: CommandContext) => {
      if(!('isBot' in c.bot)) return
      let uuid
      if (c.type === 'console') {
        uuid = c.bot._client.uuid
      } else {
        uuid = c.uuid
      }
      const originalPos = {
        x: Math.floor(Math.random() * 2000000) - 1000000,
        y: 100,
        z: Math.floor(Math.random() * 2000000) - 1000000
      }
      c.reply(
        {
          text: 'command.tpr.success',
          parseLang: true,
          with: [
            c.username,
            originalPos.x.toString(),
            originalPos.y.toString(),
            originalPos.z.toString()
          ]
        }
      )
      c.bot.commandCore.ccq.push(`/essentials:tp ${uuid} ${originalPos.x}.0 ${originalPos.y} ${originalPos.z}.0`)
    }
    this.consoleOnly = true
    this.consoleIndex = true
  }
}
