import Command from "../util/Command.js"
import CommandContext from "../util/CommandContext.js"

export default class ValidateCommand extends Command {
  constructor () {
    super()
    this.name = 'validate'
    this.execute = async (c: CommandContext) => {
      c.reply({
        text: 'command.verify.success',
        parseLang: true,
        with: [
          {
            text: `command.perms${c.verify}`,
            parseLang: true
          }
        ]
      })
    }
    this.aliases = ['verify']
    this.level = 1
  }
}
