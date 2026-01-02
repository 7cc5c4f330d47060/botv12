import Command from '../util/Command.js'
import CommandContext from '../util/CommandContext.js'

export default class CommandBlockCommand extends Command {
  constructor () {
    super()
    this.name = 'cb'
    this.execute = async (c: CommandContext) => {
      c.bot.commandCore.ccq.push(c.args.join(' '))
    }
    this.consoleIndex = true
    this.aliases = ['commandblock', 'cmdblock']
  }
}
