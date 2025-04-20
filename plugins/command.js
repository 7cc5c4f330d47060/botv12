import registry from '../util/commands.js'
import settings from '../settings.js'
import Command from '../util/Command.js'
import hashcheck from '../util/hashcheck.js'
import { getMessage } from '../util/lang.js'
export default function load (b) {
  b.on('chat', (data) => {
    const fullCommand = data.message
    for (const prefix of settings.prefixes) {
      if (fullCommand.startsWith(prefix)) {
        const command = fullCommand.slice(prefix.length)
        b.runCommand(data.username, data.nickname, data.uuid, command, data.type, data.subtype, prefix)
      }
    }
  })
  b.runCommand = function (user, nick, uuid, command, type, subtype, prefix) {
    if (uuid === '00000000-0000-0000-0000-000000000000') return
    if (Date.now() - b.lastCmd <= 1000) return
    b.lastCmd = Date.now()

    const context = new Command(uuid, user, nick, command, 'minecraft', type, subtype, prefix, b)

    b.emit('command', context)
    if (context.cancel === true) return

    const commandItem = registry.getCommand(context.cmdName)

    const cmdsplit = command.split(' ')
    const verify = hashcheck(cmdsplit, uuid)
    const permsN = getMessage(context.lang, 'command.help.permsNormal')
    const permsT = getMessage(context.lang, 'command.help.permsTrusted')
    const permsO = getMessage(context.lang, 'command.help.permsOwner')

    // Block running eval in minecraft
    if (commandItem.consoleOnly) {
      b.tellraw(uuid, {
        text: getMessage(context.lang, 'command.disabled.consoleOnly')
      })
      return
    }

    // "Block ChipmunkMod" functionality
    if (commandItem.blockChipmunkMod && subtype !== 'generic_player') {
      b.tellraw(uuid, {
        text: getMessage(context.lang, 'command.disabled.chipmunkmod')
      })
      return
    }

    // Block ChipmunkMod Format in the trusted commands
    if (commandItem && commandItem.level !== undefined && subtype !== 'generic_player') {
      b.tellraw(uuid, {
        text: getMessage(context.lang, 'command.disallowed.perms.chipmunkmod')
      })
      return
    }

    if (commandItem && commandItem.level !== undefined && commandItem.level > verify) {
      b.tellraw(uuid, {
        text: getMessage(context.lang, 'command.disallowed.perms')
      })
      b.tellraw(uuid, {
        text: getMessage(context.lang, 'command.disallowed.perms.yourLevel', [[permsN, permsT, permsO][verify]])
      })
      b.tellraw(uuid, {
        text: getMessage(context.lang, 'command.disallowed.perms.cmdLevel', [[permsN, permsT, permsO][commandItem.level]])
      })
      return
    } else if (verify > 0) {
      context.rewriteCommand(cmdsplit.slice(0, cmdsplit.length - 1).join(' '))
      context.verify = verify
    }

    if (commandItem) {
      try {
        commandItem.execute(context)
      } catch (e) {
        console.log(e)
        b.tellraw(uuid, {
          text: getMessage(context.lang, 'command.error'),
          color: context.colors.error,
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
