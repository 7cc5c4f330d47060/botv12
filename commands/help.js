import registry from '../util/commands.js'
import { getMessage } from '../util/lang.js'

const sortHelp = function sortHelp (c1, c2) {
  const level1 = c1.level ? c1.level : 0
  const level2 = c2.level ? c2.level : 0
  return level1 - level2
}

const printHelp = c => {
  const cmds = registry.listCommands()
  const keys = Object.keys(cmds).sort()
  const commands = []
  for (const key of keys) {
    commands.push({
      name: key,
      level: cmds[key].level
    })
  }
  const sortedCommands = commands.sort(sortHelp)
  const commandList = []
  const colorList = ['green', 'red', 'dark_red']

  for (const cmd of sortedCommands) {
    let cmdColor
    if (colorList[cmd.level]) {
      cmdColor = colorList[cmd.level]
    } else {
      cmdColor = colorList[0]
    }
    commandList.push(
      {
        translate: '%s ',
        color: cmdColor,
        with: [
          {
            text: cmd.name,
            clickEvent: {
              action: 'suggest_command',
              value: `${c.prefix}${cmd.name}`
            }
          }
        ]
      }
    )
  }

  const permListFormat = []
  for (let i = 0; i <= 2; i++) {
    permListFormat.push({
      color: colorList[i],
      text: getMessage(c.lang, `command.perms${i}`)
    })
    if (i !== 2) permListFormat.push(' ')
  }

  c.reply({
    translate: '%s (%s) (%s): %s',
    with: [
      getMessage(c.lang, 'command.help.cmdList'),
      commandList.length + '',
      permListFormat,
      commandList
    ]
  })
}

const printCmdHelp = c => {
  let cmd
  if (c.args.length >= 1) cmd = c.args[0].toLowerCase()
  let usage = getMessage(c.lang, `commands.${cmd}.usage`).split('||')
  let desc = getMessage(c.lang, `commands.${cmd}.desc`)
  const cmdItem = registry.getCommand(cmd)
  if (!cmdItem) {
    return
  }
  if (cmdItem.alias) {
    usage = getMessage(c.lang, `command.${cmdItem.alias}.usage`).split('||')
    desc = getMessage(c.lang, 'command.help.alias', [cmdItem.alias])
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
  if (cmdItem.aliases) {
    const aliasList = []
    for (const item of cmdItem.aliases) {
      if (aliasList.length > 0) {
        aliasList.push({
          text: ', ',
          color: c.colors.secondary
        })
      }
      aliasList.push({
        text: item,
        color: c.colors.primary
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
  const rPerms = cmdItem.level ? cmdItem.level : 0
  c.reply({
    translate: getMessage(c.lang, 'command.help.commandPerms'),
    color: c.colors.secondary,
    with: [
      {
        text: getMessage(c.lang, `command.perms${rPerms}`),
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
