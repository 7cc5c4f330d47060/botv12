import Command from "../util/Command.js"
import CommandContext from "../util/CommandContext.js"
import { createHash } from 'node:crypto'
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

let userKeys: Record<string, {key: string, level: number}> = {}
try {
  const fileContent = readFileSync(resolve(baseDir, 'userkeys.json')).toString("utf8")
  userKeys = JSON.parse(fileContent)
} catch (e) {
  if(debugMode) console.log(e)
}

export default class LoginCommand extends Command {
  constructor () {
    super()
    this.name = 'login'
    this.execute = async (c: CommandContext) => {
      if(!('isBot' in c.bot)) return
      const _dateString: string = Date.now().toString()
      const dateString: string = _dateString.slice(0, _dateString.length - 4)

      const hashBase = `:${c.uuid}::${dateString}:`

      for(const i in userKeys){
        const hashFull = hashBase + userKeys[i].key
        const validhash = createHash('sha512').update(hashFull).digest('hex')
        if(c.args[0] === validhash){
          if(!c.bot.playerInfo.players || !c.bot.playerInfo.players[c.uuid]) return
          c.bot.playerInfo.players[c.uuid].verifyv2 = userKeys[i].level
          c.reply({
            text: 'command.loginv2.success',
            parseLang: true,
            with: [
              i,
              userKeys[i].level + ''
            ]
          })
        } else {
          c.reply({
            text: 'command.loginv2.invalidHash',
            parseLang: true,
            color: '$error'
          })
        }
      }
    }
    this.hidden = true
    this.blockChipmunkMod = true
  }
}
