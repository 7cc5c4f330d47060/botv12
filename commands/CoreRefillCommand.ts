import Command from '../util/game/botcmd/Command.js'
import CommandContext from '../util/game/botcmd/CommandContext.js'

export default class CoreRefillCommand extends Command {
  constructor () {
    super()
    this.name = 'refill'
    this.execute = async (c: CommandContext) => {
      if (!('isBot' in c.bot)) return
      c.bot.selfCare.tasks.cc.failed = true
    }
    this.debugOnly = true
    this.hidden = true
  }
}
