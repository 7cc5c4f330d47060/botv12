import { getConnection } from '../util/database/database.js'
import { inspect } from 'node:util'
import Command from '../util/game/botcmd/Command.js'
import CommandContext from '../util/game/botcmd/CommandContext.js'

export default class SqlEvalCommand extends Command {
  constructor () {
    super()
    this.name = 'sql'
    this.execute = async (c: CommandContext) => {
      if (!dbEnabled) return
      const connection = await getConnection()
      if (!connection) return
      const payload = c.args.join(' ')
      let result
      try {
        result = await connection.query(payload)
        if ('end' in connection) connection.end()
      } catch (e) {
        result = e
      }
      console.log(inspect(result))
    }
    this.level = 3
    this.debugOnly = true
  }
}
