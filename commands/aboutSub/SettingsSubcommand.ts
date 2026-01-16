import CommandContext from '../../util/CommandContext.js'
import Command from '../../util/Command.js'

export default class SettingsSubcommand extends Command {
  constructor () {
    super()
    this.name = "settings"
    this.execute = async (c: CommandContext) => {
      c.reply({
        text: 'command.error.2.2'
      })
    }
  }
}
