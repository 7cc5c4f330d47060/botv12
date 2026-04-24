import Command from '../util/game/botcmd/Command.js'
import CommandContext from '../util/game/botcmd/CommandContext.js'

export default class ValidateV9Command extends Command {
  constructor () {
    super()
    this.name = 'validate_v9'
    this.execute = async (c: CommandContext) => {
      if (c.verify) {
        c.reply(
          {
            text: `Valid hash! Username: ${c.username}`,
            color: c.colors.primary
          }
        )
      }
    }
    this.level = 1
    this.hidden = true
  }
}
