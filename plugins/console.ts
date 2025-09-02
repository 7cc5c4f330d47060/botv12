import { createInterface, cursorTo, clearLine } from 'node:readline'
import registry from '../util/commands.ts'
import Command from '../util/Command.ts'
import parse3 from '../util/chatparse.ts'
import { userInfo } from 'node:os'
import { bots } from '../index.ts'
import settings from '../settings.js'
import UBotClient from '../util/UBotClient.ts'
//import { getMessage } from '../util/lang.js'

const consoleBotStub = {
  host: {
    host: 'bot console',
    port: 25565
  },
  tellraw: (_unused, data) => console.log(parse3(data, 'none'))
}
const uuid = '01234567-89ab-cdef-0123-456789abcdef'
const user = userInfo().username // OS user the bot is running as
const nick = user

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\x1b[0m> '
})
rl.on('line', (l: string) => {
  const args = l.split(' ')
  const cmdName = args[0].toLowerCase()

  try {
    const cmd = registry.getCommand(cmdName)

    if (!cmd) {
      rl.prompt(false)
      return
    }

    // Block running eval in normal mode
    if (cmd.debugOnly && !settings.debugMode) {
      //console.log(getMessage(settings.defaultLang, 'command.disabled.debugOnly'))
      console.log('This command must be run with Debug Mode enabled.') // Hard-coded until language is readded
      return
    }

    if (cmd.consoleIndex) {
      const index2 = args.splice(1, 1)[0]
      if (index2 === '*') {
        for (let i = 0; i < bots.length; i++) {
          const context = new Command(uuid, user, nick, args.join(' '), 'console', 'console', 'console', '', bots[i])
          context.verify = 2
          cmd.execute(context)
        }
      } else {
        const context = new Command(uuid, user, nick, args.join(' '), 'console', 'console', 'console', '', bots[+index2])
        context.verify = 2
        cmd.execute(context)
      }
    } else {
      const context = new Command(uuid, user, nick, l, 'console', 'console', 'console', '', consoleBotStub)
      context.verify = 2
      cmd.execute(context)
    }
  } catch (e) {
    console.log(e)
  }

  rl.prompt(false)
})
rl.prompt()

function consoleWrite (text) {
  cursorTo(process.stdout, 0)
  clearLine(process.stdout, 0)
  process.stdout.write(text + '\n')
  rl.prompt(true)
}

export default function load (b: UBotClient) {
  b.info = (msg) => {
    consoleWrite(`[${b.id}] ['info'] ${msg}`)
  }
  b.displayChat = (type, subtype, msg) => {
    if (settings.debugMode) {
      consoleWrite(`[${b.id}] [${type}] [${subtype}] ${msg}`)
    } else {
      consoleWrite(`[${b.id}] [${type}] ${msg}`)
    }
  }
}
