import registry from '../util/commands.js'
import { getMessage } from '../util/lang.js'

const sortHelp = function sortHelp (c1, c2) {
  const level1 = c1.level ? c1.level : 0
  const level2 = c2.level ? c2.level : 0
  return level1 - level2
}

function printHelp(c){
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
    commandList.push({
      text: `${cmd.name} `,
      color: cmdColor
    })
  }

  const permListFormat = []
  for (let i = 0; i <= 2; i++) {
    permListFormat.push({
      text: `command.perms${i}`,
      parseLang: true,
      color: colorList[i]
    })
    if (i !== 2) permListFormat.push(' ')
  }

  c.reply({
    text: '%s (%s) (%s): %s',
    with: [
      getMessage(c.lang, 'command.help.cmdList'),
      commandList.length + '',
      {
        text: '%s'.repeat(permListFormat.length),
        with: permListFormat
      },
      {
        text: '%s'.repeat(commandList.length),
        with: commandList
      }
    ]
  })
}

function printCmdHelp(c){
  let cmd
  if (c.args.length >= 1) cmd = c.args[0].toLowerCase()
  const cmdItem = registry.getCommand(cmd)
  if (!cmdItem) {
    return
  }

  const usage = getMessage(c.lang, `commands.${cmdItem.name}.usage`).split('||')
  const desc = getMessage(c.lang, `commands.${cmdItem.name}.desc`)
  for (const item of usage) {
    c.reply({
      text: 'command.help.commandUsage',
      parseLang: true,
      with: [
        cmdItem.name,
        item
      ]
    })
  }
  c.reply({
    text: 'command.help.commandDesc',
    parseLang: true,
    with: [
      desc
    ]
  })
  if (cmdItem.aliases) {
    const aliasList = []
    for (const item of cmdItem.aliases) {
      if (aliasList.length > 0) {
        aliasList.push({
          text: ', '
        })
      }
      aliasList.push({
        text: item
      })
    }
    c.reply({
      text: 'command.help.commandAliases',
      parseLang: true,
      with: [
        {
          text: '%s'.repeat(aliasList.length),
          with: aliasList
        }
      ]
    })
  }
  const rPerms = cmdItem.level ? cmdItem.level : 0
  c.reply({
    text: 'command.help.commandPerms',
    parseLang: true,
    with: [
      {
        text: `command.perms${rPerms}`,
        parseLang: true
      }
    ]
  })
}

async function execute(c){
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
