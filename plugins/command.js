const Command = require('../util/Command.js')
const hashcheck = require('../util/hashcheck.js')
const settings = require('../settings.json')
const {getMessage} = require('../util/lang.js')
const cmds = require("../util/commands.js")

const sortHelp = function sortHelp (c1, c2) {
  const level1 = cmds[c1.with[0]].level ? cmds[c1.with[0]].level : 0
  const level2 = cmds[c2.with[0]].level ? cmds[c2.with[0]].level : 0
  return level1 - level2
}
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
    b.printHelp = (uuid, prefix, lang) => {
      const commandList = []
      for (const i in cmds) {
        if (cmds[i].hidden) continue
        let cmdColor
        switch (cmds[i].level) {
          case 0:
            cmdColor = 'green'
            break
          case 1:
            cmdColor = 'red'
            break
          case 2:
            cmdColor = 'dark_red'
            break
          case 3:
            cmdColor = 'dark_gray'
            break
          default:
            cmdColor = 'gray'
        }
        commandList.push(
          {
            translate: '%s ',
            color: cmdColor,
            with: [
              i
            ]
          }
        )
      }
      b.tellraw(uuid, {
        translate: '%s %s',
        with: [
          getMessage(lang, 'command.help.cmdList'),
          commandList.sort(sortHelp)
        ]
      })
    }
    b.printCmdHelp = (uuid, cmd, lang, color) => {
      if (!cmds[cmd]) {
        b.tellraw(uuid, { text: getMessage(lang, 'command.help.noCommand') })
        return
      }
      let usage = getMessage(lang, `command.${cmd}.usage`).split('||')
      let desc = getMessage(lang, `command.${cmd}.desc`)
      if (cmds[cmd].usage) {
        usage = cmds[cmd].usage.split('||')
      }
      if (cmds[cmd].desc) {
        desc = cmds[cmd].desc
      }
      // b.tellraw(uuid,{"text":getMessage(lang,"command.help.commandInfo",[cmd,usage,desc])});
      for (const i in usage) {
        b.tellraw(uuid, {
          translate: getMessage(lang, 'command.help.commandUsage'),
          color: color.secondary,
          with: [
            {
              text: cmd,
              color: color.primary
            },
            {
              text: usage[i],
              color: color.primary
            }
          ]
        })
      }
      b.tellraw(uuid, {
        translate: getMessage(lang, 'command.help.commandDesc'),
        color: color.secondary,
        with: [
          {
            text: desc,
            color: color.primary
          }
        ]
      })
      const permsN = getMessage(lang, 'command.help.permsNormal')
      const permsT = getMessage(lang, 'command.help.permsTrusted')
      const permsO = getMessage(lang, 'command.help.permsOwner')
      const permsC = getMessage(lang, 'command.help.permsConsole')
      const rPerms = cmds[cmd].level ? cmds[cmd].level : 0
      b.tellraw(uuid, {
        translate: getMessage(lang, 'command.help.commandPerms'),
        color: color.secondary,
        with: [
          {
            text: [permsN, permsT, permsO, permsC][rPerms],
            color: color.primary
          }
        ]
      })
    }
  }
}
