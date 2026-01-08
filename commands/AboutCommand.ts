import ServerInfoSubcommand from './aboutSub/ServerInfoSubcommand.js'
import ServerListSubcommand from './aboutSub/ServerListSubcommand.js'
import SettingsSubcommand from './aboutSub/SettingsSubcommand.js'
import VersionSubcommand from './aboutSub/VersionSubcommand.js'
import LicenseSubcommand from './aboutSub/LicenseSubcommand.js'
import AboutBotSubcommand from './aboutSub/AboutBotSubcommand.js'

import CommandRegistry from '../util/CommandRegistry.js'
import CommandContext from '../util/CommandContext.js'
import Command from '../util/Command.js'
const registry = new CommandRegistry(new AboutBotSubcommand())

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
    const aliases = ['info']
    for(const item of Object.keys(registry._commands)){
      if(item !== 'base') aliases.push(item)
    }
    for(const item of Object.keys(registry._aliases)){
      aliases.push(item)
    }
    this.aliases = aliases
    this.execute = async (c: CommandContext) => {
      let command = registry.getCommand(c.cmdName)
      if(c.args.length >= 1){
        command = registry.getCommand(c.args[0])
        console.log(registry._aliases)
      }
      command.execute(c)
    }
  }
}
