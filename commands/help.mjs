import { getMessage } from '../util/lang.mjs'

const sortHelp = function sortHelp (c1, c2) {
  const level1 = cmds[c1.with[0]].level ? cmds[c1.with[0]].level : 0
  const level2 = cmds[c2.with[0]].level ? cmds[c2.with[0]].level : 0
  return level1 - level2
}

import { default as cmds } from '../util/commands.mjs'

const printHelp = (c) => {
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
        cmdColor = 'dark_red'
        break
      default:
        cmdColor = 'green'
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
  c.reply({
    translate: '%s %s',
    with: [
      getMessage(c.lang, 'command.help.cmdList'),
      commandList.sort(sortHelp)
    ]
  })
}

const printCmdHelp = (c) => {
  const cmd = c.args[0]
  if (!cmds[cmd]) {
    c.reply({ text: getMessage(c.lang, 'command.help.noCommand') })
    return
  }
  let usage = getMessage(c.lang, `command.${cmd}.usage`).split('||')
  let desc = getMessage(c.lang, `command.${cmd}.desc`)
  if (cmds[cmd].usage) {
    usage = cmds[cmd].usage.split('||')
  }
  if (cmds[cmd].desc) {
    desc = cmds[cmd].desc
  }
  if (cmds[cmd].alias) {
    console.log(cmds[cmds[cmd].alias])
    usage = getMessage(c.lang, `command.${cmds[cmd].alias}.usage`).split('||')
    desc = getMessage(c.lang, 'command.help.alias', [cmds[cmd].alias])
    if (cmds[cmds[cmd].alias].usage) {
      usage = cmds[cmds[cmd].alias].usage.split('||')
    }
    if (cmds[cmds[cmd].alias].desc) {
      desc = cmds[cmds[cmd].alias].desc
    }
  }
  for (const i in usage) {
    c.reply({
      translate: getMessage(c.lang, 'command.help.commandUsage'),
      color: c.colors.secondary,
      with: [
        {
          text: cmd,
          color: c.colors.primary
        },
        {
          text: usage[i],
          color: c.colors.primary
        }
      ]
    })
  }
  c.reply({
    translate: getMessage(c.lang, 'command.help.commandDesc'),
    color: c.colors.secondary,
    with: [
      {
        text: desc,
        color: c.colors.primary
      }
    ]
  })
  const permsN = getMessage(c.lang, 'command.help.permsNormal')
  const permsT = getMessage(c.lang, 'command.help.permsTrusted')
  const permsO = getMessage(c.lang, 'command.help.permsOwner')
  const permsC = getMessage(c.lang, 'command.help.permsConsole')
  const rPerms = cmds[cmd].level ? cmds[cmd].level : 0
  c.reply({
    translate: getMessage(c.lang, 'command.help.commandPerms'),
    color: c.colors.secondary,
    with: [
      {
        text: [permsN, permsT, permsO, permsC][rPerms],
        color: c.colors.primary
      }
    ]
  })
}

export default {
  execute: (c) => {
    if (c.args.length > 0) {
      printCmdHelp(c)
    } else {
      printHelp(c)
    }
  },
  aliases: [
    'heko' // Parker2991 request
  ]
}
