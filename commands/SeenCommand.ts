import { getConnection } from '../util/database.js'
import Command from "../util/Command.js"
import CommandContext from "../util/CommandContext.js"

export default class SeenCommand extends Command {
  constructor () {
    super()
    this.name = 'seen'
    this.execute = async (c: CommandContext) => {
      if (!dbEnabled) {
        c.reply({
          text: 'command.error.db.disabled',
          parseLang: true,
          color: '$error'
        })
        return
      }
      try {
        const connection = await getConnection()
        if(!connection) return
        const name = c.args.join(' ')
        let joinCount
        let lastSeen
        let userName
        let player
        if (/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/.test(name)) { // Uuid code
          player = await connection.query('SELECT * FROM seenPlayers WHERE uuid = ?', [name])
        } else { // Username code
          player = await connection.query('SELECT * FROM seenPlayers WHERE userName = ?', [name])
        }
        if (player.length >= 1) {
          joinCount = player[0].joinCount ?? 0
          lastSeen = player[0].lastSeen ?? 0n
          userName = player[0].userName ?? ''
          c.reply({
            text: 'command.seen.success',
            parseLang: true,
            with: [
              userName,
              new Date(Number(lastSeen)) + "",
              joinCount + "",
              {
                text: `command.seen.success.time${(joinCount === 1) ? '' : 'Plural'}`,
                parseLang: true
              }
            ]
          })
        } else {
          c.reply({
            text: 'command.seen.neverSeen',
            parseLang: true,
            with: [
              name
            ]
          })
        }
        if('end' in connection) connection.end()
      } catch (e) {
        if(debugMode) console.error(e)
      }
    }
  }
}
