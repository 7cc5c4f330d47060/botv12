import { getConnection } from '../util/database.js'
import { inspect } from 'node:util'
import Command from "../util/Command.js"
import CommandContext from "../util/CommandContext.js"

export default class SqlEvalCommand extends Command {
  constructor () {
    super()
    this.name = 'sql'
    this.execute = async (c: CommandContext) => {
      if(!dbEnabled) return
      const connection = await getConnection()
      const payload = c.args.join(' ')
      let result
      try {
        result = await connection.query(payload)
      } catch (e) {
        result = e
      }
      console.log(inspect(result))
    }
    this.level = 3
    this.debugOnly = true
  }
}
