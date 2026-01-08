import { bots, createBot } from '../index.js'
import Command from '../util/Command.js'
import CommandContext from '../util/CommandContext.js'

export default class JoinCommand extends Command {
  constructor () {
    super()
    this.name = "join"
    this.execute = async (c: CommandContext) => {
      const options = {
        host: c.args[0],
        port: c.args[1],
        options: {
          name: `temp_${Date.now()}`
        }
      }
      createBot(options)
    }
    this.level = 2
    this.debugOnly = true
  }
}
