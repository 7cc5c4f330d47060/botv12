import CommandContext from '../../util/game/botcmd/CommandContext.js'
import Command from '../../util/game/botcmd/Command.js'

export default class SettingsSubcommand extends Command {
  constructor () {
    super()
    this.name = 'settings'
    this.execute = async (c: CommandContext) => {
      c.reply({
        text: 'command.error.2.2'
      })
    }
  }
}
