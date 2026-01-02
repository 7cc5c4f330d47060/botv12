import Command from "../util/Command.js"
import CommandContext from "../util/CommandContext.js"

export default class StopCommand extends Command {
  constructor () {
    super()
    this.name = 'stop'
    this.execute = async (c: CommandContext) => {
      process.exit(1)
    }
    this.aliases = ['exit']
    this.level = 2
  }
}
