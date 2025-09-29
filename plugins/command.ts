import registry from '../util/commands.js'
import settings from '../settings.js'
import CommandContext from '../util/CommandContext.js'
import hashcheck from '../util/hashcheck.js'
import { getMessage } from '../util/lang.js'
import UBotClient from '../util/UBotClient.js'

export default function load (b: UBotClient) {
  b.commands = {}
  b.on('chat', (data) => {
    const fullCommand = data.message
    for (const prefix of settings.prefixes) {
      if (fullCommand.startsWith(prefix)) {
        const command = fullCommand.slice(prefix.length)
        b.commands.runCommand(data.username, data.nickname, data.uuid, command, data.type, data.subtype, prefix)
      }
    }
  })
  b.commands.runCommand = async function (user, nick, uuid, command, type, subtype, prefix) {
    if (uuid === '00000000-0000-0000-0000-000000000000') return
    if (Date.now() - b.commands.lastCmd <= 500) return
    b.commands.lastCmd = Date.now()

    const context = new CommandContext(uuid, user, nick, command, 'minecraft', type, subtype, prefix, b)

    b.emit('command', context)
    if (context.cancel === true) return
    const commandItem = registry.getCommand(context.cmdName)

    const cmdsplit = command.split(' ')
    const verify = hashcheck(cmdsplit, uuid)

    // Block running eval in normal mode
    if (commandItem.debugOnly && !settings.debugMode) {
      b.commandCore.tellraw(uuid, {
        text: getMessage(context.lang, 'command.disabled.debugOnly')
      })
      return
    }

    // Block running eval in minecraft
    if (commandItem.consoleOnly) {
      b.commandCore.tellraw(uuid, {
        text: getMessage(context.lang, 'command.disabled.consoleOnly')
      })
      return
    }

    // "Block ChipmunkMod" functionality
    if (commandItem.blockChipmunkMod && subtype !== 'generic_player') {
      b.commandCore.tellraw(uuid, {
        text: getMessage(context.lang, 'command.disabled.chipmunkmod')
      })
      return
    }

    // Block ChipmunkMod Format in the trusted commands
    if (commandItem && commandItem.level !== undefined && subtype !== 'generic_player') {
      b.commandCore.tellraw(uuid, {
        text: getMessage(context.lang, 'command.disallowed.perms.chipmunkmod')
      })
      return
    }

    if (commandItem && commandItem.level !== undefined && commandItem.level > verify) {
      b.commandCore.tellraw(uuid, {
        text: getMessage(context.lang, 'command.disallowed.perms')
      })
      const cmdPerms = getMessage(context.lang, `command.perms${commandItem.level}`)
      b.commandCore.tellraw(uuid, {
        text: getMessage(context.lang, 'command.disallowed.perms.cmdLevel', [cmdPerms])
      })
      const yourPerms = getMessage(context.lang, `command.perms${verify}`)
      b.commandCore.tellraw(uuid, {
        text: getMessage(context.lang, 'command.disallowed.perms.yourLevel', [yourPerms])
      })
      return
    } else if (verify > 0) {
      context.rewriteCommand(cmdsplit.slice(0, cmdsplit.length - 1).join(' '))
      context.verify = verify
    }

    if (commandItem) {
      try {
        const startDate = Date.now()
        await commandItem.execute(context)
        const timeSpent = Date.now() - startDate
        if (settings.debugMode) {
          context.reply({
            text: 'debug.commandFinished',
            parseLang: true,
            with: [timeSpent]
          })
        }
      } catch (e) {
        console.log(e)
        b.commandCore.tellraw(uuid, {
          text: getMessage(context.lang, 'command.error'),
          color: settings.colors.error,
          hover_event: {
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
