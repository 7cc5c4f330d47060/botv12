const Command = require('../util/Command.js')
const hashcheck = require('../util/hashcheck.js')
const settings = require('../settings.json')
const {getMessage} = require('../util/lang.js')
const cmds = require("../util/commands.js")

module.exports = {
  load: (b) => {
    b.prefix = settings.prefix
    b.lastCmd = 0
    b.runCommand = (name, uuid, text, prefix) => {
      if (uuid === '00000000-0000-0000-0000-000000000000') return
      if (Date.now() - b.lastCmd <= 1000) return
      b.lastCmd = Date.now()
      const cmd = text.split(' ')
      const lang = settings.defaultLang
      const verify = hashcheck(cmd)
      if (verify > 0) {
        text = cmd.slice(0, cmd.length - 1).join(' ')
      }
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
          cmds[cmd[0].toLowerCase()].execute(new Command(uuid, name, 'nick N/A', text, prefix, b, verify))
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
