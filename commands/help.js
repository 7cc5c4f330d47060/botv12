import cmds from '../util/commands.js'
import { getMessage } from '../util/lang.js'

const sortHelp = function sortHelp (c1, c2) {
  const level1 = cmds[c1.with[0].text].level ? cmds[c1.with[0].text].level : 0
  const level2 = cmds[c2.with[0].text].level ? cmds[c2.with[0].text].level : 0
  return level1 - level2
}

const printHelp = c => {
  const commandList = []
  const permsN = getMessage(c.lang, 'command.help.permsNormal')
  const permsT = getMessage(c.lang, 'command.help.permsTrusted')
  const permsO = getMessage(c.lang, 'command.help.permsOwner')
  const permList = [permsN, permsT, permsO]
  const colorList = ['green', 'red', 'dark_red']
  for (const i in cmds) {
    if (cmds[i].hidden) continue
    let cmdColor
    if (colorList[cmds[i].level]) {
      cmdColor = colorList[cmds[i].level]
    } else {
      cmdColor = colorList[0]
    }
    let usage = getMessage(c.lang, `command.${i}.usage`).split('||')
    let desc = getMessage(c.lang, `command.${i}.desc`)
    if (cmds[i].usage) {
      usage = cmds[i].usage.split('||')
    }
    if (cmds[i].desc) {
      desc = cmds[i].desc
    }
    const hoverText = []
    for (const item of usage) {
      hoverText.push({
        translate: getMessage(c.lang, 'command.help.commandUsage.lf'),
        color: c.colors.secondary,
        with: [
          {
            text: i,
            color: c.colors.primary
          },
          {
            text: item,
            color: c.colors.primary
          }
        ]
      })
    }
    hoverText.push({
      translate: getMessage(c.lang, 'command.help.commandDesc.lf'),
      color: c.colors.secondary,
      with: [
        {
          text: desc,
          color: c.colors.primary
        }
      ]
    })
    const rPerms = cmds[i].level ? cmds[i].level : 0
    hoverText.push({
      translate: getMessage(c.lang, 'command.help.commandPerms.lf'),
      color: c.colors.secondary,
      with: [
        {
          text: permList[rPerms],
          color: c.colors.primary
        }
      ]
    })
    hoverText.push({
      translate: getMessage(c.lang, 'command.help.runCommand'),
      color: c.colors.secondary
    })
    commandList.push(
      {
        translate: '%s ',
        color: cmdColor,
        with: [
          {
            text: i,
            hoverEvent: {
              action: 'show_text',
              value: hoverText,
              contents: hoverText
            },
            clickEvent: {
              action: 'suggest_command',
              value: `${c.prefix}${i}`
            }
          }
        ]
      }
    )
  }
  const permListFormat = []
  permList.forEach((item, i) => {
    permListFormat.push({
      translate: i === permList.length - 1 ? '%s' : '%s ',
      color: colorList[i],
      with: [
        item
      ]
    })
  })

  c.reply({
    translate: '%s %s',
    with: [
      {
        translate: '%s (%s):',
        with: [
          getMessage(c.lang, 'command.help.cmdList'),
          permListFormat
        ]
      },
      commandList.sort(sortHelp)
    ]
  })
}

const printCmdHelp = c => {
  let cmd
  if (c.args.length >= 1) cmd = c.args[0].toLowerCase()
  if (!cmds[cmd] || (cmds[cmd].hidden && c.type !== 'console')) {
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
  for (const item of usage) {
    c.reply({
      translate: getMessage(c.lang, 'command.help.commandUsage'),
      color: c.colors.secondary,
      with: [
        {
          text: cmd,
          color: c.colors.primary
        },
        {
          text: item,
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
  if (cmds[cmd].aliases) {
    const aliasList = []
    for (const item of cmds[cmd].aliases) {
      if (aliasList.length > 0) {
        aliasList.push({
          text: ', ',
          color: c.colors.secondary
        })
      }
      aliasList.push({
        text: item,
        color: c.colors.primary,
        clickEvent: {
          action: 'copy_to_clipboard',
          value: item
        },
        hoverEvent: {
          action: 'show_text',
          contents: {
            text: getMessage(c.lang, 'command.help.copyAlias'),
            color: c.colors.secondary
          },
          value: { // Added twice for backwards compatibility
            text: getMessage(c.lang, 'command.help.copyAlias'),
            color: c.colors.secondary
          }
        }
      })
    }
    c.reply({
      translate: getMessage(c.lang, 'command.help.commandAliases'),
      color: c.colors.secondary,
      with: [
        aliasList
      ]
    })
  }
  const permsN = getMessage(c.lang, 'command.help.permsNormal')
  const permsT = getMessage(c.lang, 'command.help.permsTrusted')
  const permsO = getMessage(c.lang, 'command.help.permsOwner')
  const rPerms = cmds[cmd].level ? cmds[cmd].level : 0
  c.reply({
    translate: getMessage(c.lang, 'command.help.commandPerms'),
    color: c.colors.secondary,
    with: [
      {
        text: [permsN, permsT, permsO][rPerms],
        color: c.colors.primary
      }
    ]
  })
}

const execute = c => {
  if (c.args.length > 0) {
    printCmdHelp(c)
  } else {
    printHelp(c)
  }
}
const aliases = [
  'heko' // Parker2991 request
]
export { execute, aliases }
