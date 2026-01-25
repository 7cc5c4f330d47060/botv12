import Command from "../util/Command.js"
import CommandContext from "../util/CommandContext.js"

export default class AntiSpamResetCommand extends Command {
  constructor () {
    super()
    this.name = 'asr'
    this.execute = async (c: CommandContext) => {
      if(!('isBot' in c.bot)) return
      c.bot.serverChat.disabledUntil = 0
    }
    this.consoleOnly = true
    this.consoleIndex = true
  }
}
