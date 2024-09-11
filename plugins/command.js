const Command = require('../util/Command.js')
const settings = require('../settings.json')
const { getMessage } = require('../util/lang.js')
const cmds = require('../util/commands.js')
const fs = require('fs')

if (!fs.readdirSync('.').includes('userPref') && !settings.userSettingsDisabled) fs.mkdirSync('userPref')

const loadSettings = function (uuid) {
  try {
    if (settings.userSettingsDisabled) {
      return {}
    } else {
      return require(`../userPref/${uuid}.json`)
    }
  } catch (e) {
    return {}
  }
}
module.exports = {
  load: (b) => {
    b.prefix = settings.prefix
    b.lastCmd = 0
    b.on('chat', (data) => {
      const fullCommand = data.message
      for (const prefix of b.prefix) {
        if (fullCommand.startsWith(prefix)) {
          const command = fullCommand.slice(prefix.length)
          b.runCommand(data.username, data.nickname, data.uuid, command, data.type, prefix)
        }
      }
    })
    b.runCommand = (name, nickname, uuid, text, msgType, prefix) => {
      if (uuid === '00000000-0000-0000-0000-000000000000') return
      if (Date.now() - b.lastCmd <= 1000) return
      const userSettings = loadSettings(uuid)
      b.lastCmd = Date.now()
      const lang = settings.defaultLang

      const commandClass = new Command(uuid, name, nickname, text, msgType, prefix, b, userSettings);
      b.emit("command",commandClass)
      if(commandClass.cancel === true) return

      if (cmds[commandClass.cmdName.toLowerCase()]) {
        try {
          cmds[commandClass.cmdName.toLowerCase()].execute(commandClass)
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
