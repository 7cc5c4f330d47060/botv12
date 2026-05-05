import { createInterface, cursorTo, clearLine } from 'node:readline'
import registry from '../util/game/botcmd/commands.js'
import CommandContext from '../util/game/botcmd/CommandContext.js'
import parse3 from '../util/game/chat/jsonparse.js'
import Botv12Client from '../util/game/Botv12Client.js'
import { getMessage } from '../util/text/lang.js'
import type JsonFormat from '../util/interface/JsonFormat.js'
import botByName from '../util/hf/botByName.js'
import version from '../version.js'

const consoleBotStub = {
  host: {
    host: version.botName,
    port: -1,
    options: {
      name: version.botName
    }
  },
  commandCore: { tellraw: (_unused: string, data: JsonFormat | string) => console.log(parse3(data, settings.terminalMode)) }
}
const uuid = '01234567-89ab-cdef-0123-456789abcdef'
const user = version.botAuthor
const nick = user

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\x1b[0m> '
})
rl.on('line', async (l: string) => {
  const args = l.split(' ')
  const cmdName = args[0].toLowerCase()

  try {
    const cmd = registry.getCommand(cmdName)

    if (!cmd) {
      rl.prompt(false)
      return
    }

    // Block running eval in normal mode
    if (cmd.debugOnly && !debugMode) {
      console.log(getMessage(settings.defaultLang, 'command.disabled.debugOnly'))
      return
    }

    if (cmd.consoleIndex) {
      const index2 = args.splice(1, 1)[0]
      if (index2 === '*') {
        for (const bot of bots) {
          const context = new CommandContext(uuid, user, nick, args.join(' '), 'console', 'console', 'console', '', cmd.argsFormat, bot)
          context.verify = 3
          await cmd.execute(context)
        }
      } else {
        let index3: string | number = index2
        const bbn = botByName(index2)
        if (typeof bbn !== 'undefined') index3 = bbn
        const context = new CommandContext(uuid, user, nick, args.join(' '), 'console', 'console', 'console', '', cmd.argsFormat, bots[+index3])
        context.verify = 3
        await cmd.execute(context)
      }
    } else {
      const context = new CommandContext(uuid, user, nick, l, 'console', 'console', 'console', '', cmd.argsFormat, consoleBotStub)
      context.verify = 3
      await cmd.execute(context)
    }
  } catch (e) {
    console.log(e)
  }

  rl.prompt(false)
})
// rl.prompt() (Only when startup is complete, currently appears after first chat message)

function consoleWrite (text: string) {
  cursorTo(process.stdout, 0)
  clearLine(process.stdout, 0)
  process.stdout.write(text + '\n')
  rl.prompt(true)
}

export default function load (b: Botv12Client) {
  b.info = (msg: string) => {
    consoleWrite(`[${b.id}] [info] ${msg}`)
  }
  b.displayChat = (type: string, subtype: string, msg: string) => {
    if (debugMode) {
      consoleWrite(`[${b.host.options.name} (ID ${b.id})] [${type}] [${subtype}] ${msg}`)
    } else {
      consoleWrite(`[${b.host.options.name} (ID ${b.id})] [${type}] ${msg}`)
    }
  }
}
