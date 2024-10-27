import { createInterface, cursorTo, clearLine } from "node:readline"
import { default as settings } from '../settings.json' with {type: "json"}
import cmds from "../util/commands.js" 
import { bots } from "../index.js"
import Command from '../util/Command.js'
import parse2 from "../util/chatparse_console.js"
import { userInfo } from "node:os"

const consoleBotStub = {
  host: {
    host: "bot console ",
    port: 3
  },
  tellraw: (_unused, data) => console.log(parse2(data))
}
const uuid = "4d616465-6c69-6e65-2075-7775203a3300"
const user = userInfo().username // OS user the bot is running as
const nick = "console"

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\x1b[0m> '
})
rl.on('line', (l) => {
  try {
    if (cmds[l.split(' ')[0].toLowerCase()]) {
      if (cmds[l.split(' ')[0].toLowerCase()].consoleIndex) {
        const tmpcmd = l.split(' ')
        const index2 = tmpcmd.splice(1, 1)[0]
        if (index2 === '*') {
          for (let i = 0; i < index.bots.length; i++) {
            const cmd = new Command(uuid, user, nick, tmpcmd.join(' '), "console", "console", "console", "", bots[i], 2, {})
            cmds[l.split(' ')[0].toLowerCase()].execute(cmd)
          }
        } else {
          const cmd = new Command(uuid, user, nick, tmpcmd.join(' '), "console", "console", "console", "", bots[+index2], 2, {})
          cmds[l.split(' ')[0].toLowerCase()].execute(cmd)
        }
      } else {
        const cmd = new Command(uuid, user, nick, l, "console", "console", "console", "", consoleBotStub, 2, {})
        cmds[l.split(' ')[0].toLowerCase()].execute(cmd)
      }
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
    consoleWrite(`[${b.id}] [info] ${msg}`)
  }
  b.displayChat = (type, subtype, msg) => {
    if (settings.displaySubtypesToConsole) {
      consoleWrite(`[${b.id}] [${type}] [${subtype}] ${msg}`)
    } else {
      consoleWrite(`[${b.id}] [${type}] ${msg}`)
    }
  }
}