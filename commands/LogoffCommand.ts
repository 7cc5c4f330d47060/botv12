import Command from "../util/Command.js"
import CommandContext from "../util/CommandContext.js"

export default class LogoffCommand extends Command {
  constructor () {
    super()
    this.name = "logoff"
    this.execute = async (c: CommandContext) => {
      if (c.args[0] == '-n') c.bot.disconnect = true
      c.bot._client.end()
    }
    this.consoleIndex = true
    this.level = 2
  }
}
