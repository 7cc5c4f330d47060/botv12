import Command from '../util/Command.js'
import CommandContext from '../util/CommandContext.js'

export default class CommandBlockCommand extends Command {
  constructor () {
    super()
    this.name = 'cb'
    this.execute = async (c: CommandContext) => {
      if(!('isBot' in c.bot)) return

      const command = c.argsv2.command.value + ''
      c.bot.commandCore.ccq.push(command)
    }
    this.consoleIndex = true
    this.aliases = ['commandblock', 'cmdblock']
    this.argsFormat = [
      { name: 'command', type: 'string', required: true, finish: true }
    ]
  }
}
