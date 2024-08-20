import { default as Command } from '../util/Command.mjs'
import { default as hashcheck } from '../util/hashcheck.mjs'
import { default as settings } from '../settings.json' with {type: "json"}
import { getMessage } from '../util/lang.mjs'
import { default as cmds } from '../util/commands.mjs'
import * as fs from 'fs'

if (!fs.readdirSync('.').includes('userPref')) fs.mkdirSync('userPref')

const loadSettings = function (uuid) {
  try {
    return JSON.parse(fs.readFileSync(`../userPref/${uuid}.json`).toString("UTF-8")) // One line JSON loader
  } catch (e) {
    return {}
  }
}
export default {
  load: (b) => {
    b.prefix = settings.prefix
    b.lastCmd = 0
    b.runCommand = (name, nickname, uuid, text, msgType, prefix) => {
      if (uuid === '00000000-0000-0000-0000-000000000000') return
      if (Date.now() - b.lastCmd <= 1000) return
      const userSettings = loadSettings(uuid)
      b.lastCmd = Date.now()
      const cmd = text.split(' ')
      const lang = settings.defaultLang
      const verify = hashcheck(cmd)
      if (verify > 0) {
        text = cmd.slice(0, cmd.length - 1).join(' ')
      }
      b.emit('command', name, uuid, text, prefix)
      if (cmds[cmd[0].toLowerCase()]) {
        const command = cmds[cmd[0].toLowerCase()]
        if (command.level !== undefined && command.level > verify) {
          b.tellraw(uuid, {
            text: getMessage(lang, 'command.disallowed.perms')
          })
          b.tellraw(uuid, {
            text: getMessage(lang, 'command.disallowed.perms.yourLevel', [verify + ''])
          })
          b.tellraw(uuid, {
            text: getMessage(lang, 'command.disallowed.perms.cmdLevel', [command.level + ''])
          })
          return
        }
        try {
          cmds[cmd[0].toLowerCase()].execute(new Command(uuid, name, nickname, text, msgType, prefix, b, verify, userSettings))
        } catch (e) {
          console.log(e)
          b.tellraw(uuid, {
            text: getMessage(lang, 'command.error'),
            color: 'red',
            hoverEvent: {
              action: 'show_text',
              value: {
                text: e.stack
              }
            }
          })
        }
      }
    }
  }
}
