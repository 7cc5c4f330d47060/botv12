import ServerInfoSubcommand from './aboutSub/ServerInfoSubcommand.js'
import ServerListSubcommand from './aboutSub/ServerListSubcommand.js'
import SettingsSubcommand from './aboutSub/SettingsSubcommand.js'
import VersionSubcommand from './aboutSub/VersionSubcommand.js'
import LicenseSubcommand from './aboutSub/LicenseSubcommand.js'
import AboutBotSubcommand from './aboutSub/AboutBotSubcommand.js'

import CommandRegistry from '../util/CommandRegistry.js'
import CommandContext from '../util/CommandContext.js'
import Command from '../util/Command.js'
const registry = new CommandRegistry()

registry.register(new ServerInfoSubcommand())
registry.register(new ServerListSubcommand())
registry.register(new SettingsSubcommand())
registry.register(new VersionSubcommand())
registry.register(new LicenseSubcommand())
registry.register(new AboutBotSubcommand())

export default class AboutCommand extends Command {
  constructor () {
    super()
    this.name = "about"
    this.execute = async (c: CommandContext) => {
      let command = registry.getCommand('base')
      if(c.args.length >= 1){
        command = registry.getCommand(c.args[0])
      }
      command.execute(c)
    }
  }
}
