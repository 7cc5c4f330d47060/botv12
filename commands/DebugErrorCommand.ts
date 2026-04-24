import Command from '../util/game/botcmd/Command.js'
import CommandContext from '../util/game/botcmd/CommandContext.js'

export default class DebugErrorCommand extends Command {
  constructor () {
    super()
    this.name = 'error'
    this.execute = async (c: CommandContext) => {
      throw new Error(c.args.join(' '))
    }
    this.debugOnly = true
    this.hidden = true
  }
}
