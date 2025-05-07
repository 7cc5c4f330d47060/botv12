import { createInterface, cursorTo, clearLine } from 'node:readline'
import registry from '../util/commands.js'
import Command from '../util/Command.js'
import parse2 from '../util/chatparse_plain.js'
import { userInfo } from 'node:os'
import { bots } from '../index.js'
import settings from '../settings.js'
import { getMessage } from '../util/lang.js'

const consoleBotStub = {
  host: {
    host: 'bot console',
    port: 25565
  },
  tellraw: (_unused, data) => console.log(parse2(data))
}
const uuid = '01234567-89ab-cdef-0123-456789abcdef'
const user = userInfo().username // OS user the bot is running as
const nick = user

let lastServer = 0;

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\x1b[0m> '
})

rl.on('line', (l) => {
  try {
    if(l.startsWith(".")){
      const args = l.slice(1).split(' ')
      const cmdName = args[0].toLowerCase()   
      const cmd = registry.getCommand(cmdName)
      if (!cmd) {
        rl.prompt(false)
        return
      }

      if (cmd.consoleIndex) {
        const index2 = args.splice(1, 1)[0]
        if (index2 === '*') {
          for (let i = 0; i < bots.length; i++) {
            const context = new Command(uuid, user, nick, args.join(' '), 'console', 'console', 'console', '.', bots[i])
            context.verify = 2
            cmd.execute(context)
          }
        } else {
          const context = new Command(uuid, user, nick, args.join(' '), 'console', 'console', 'console', '.', bots[+index2])
          context.verify = 2
          cmd.execute(context)
        }
      } else {
        const context = new Command(uuid, user, nick, args.join(' '), 'console', 'console', 'console', '.', consoleBotStub)
        context.verify = 2
        cmd.execute(context)
      }
    } else {
      const args = l.split(' ')
      if(/^\d+$/.test(args[0])){
        lastServer = +args[0]
        args.splice(0,1)
      }
      if(args.length > 0) bots[lastServer].chat(args.join(' '))
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

export default function load (b) {
  b.info = (msg) => {
    consoleWrite(`[${b.id}] [${getMessage(settings.defaultLang, 'console.info')}] ${msg}`)
  }
  b.displayChat = (type, subtype, msg) => {
    if (settings.displaySubtypesToConsole) {
      consoleWrite(`[${b.id}] [${getMessage(settings.defaultLang, `console.chat.${type}`)}] [${subtype}] ${msg}`)
    } else {
      consoleWrite(`[${b.id}] [${getMessage(settings.defaultLang, `console.chat.${type}`)}] ${msg}`)
    }
  }
}
