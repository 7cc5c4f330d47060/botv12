import { bots, createBot } from '../index.js'
import { inspect } from 'node:util'
import CommandContext from '../util/CommandContext'
import Command from '../util/Command.js'

export default class EvalCommand extends Command {
  constructor () {
    super()
    this.name = "eval"
    this.execute = async (c: CommandContext) => {
      const index = { 
        bots,
        createBot
      }
      const payload = c.args.join(' ')
      let result
      try {
        result = inspect(eval(payload))
      } catch (e) {
        result = inspect(e)
      }
      console.log(result)
    }
    this.level = 3
    this.debugOnly = true
  }
}
