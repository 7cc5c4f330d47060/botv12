const readln = require('readline')
const index = require('../index.js')
const ConsoleCommand = require('../util/ConsoleCommand.js')
const cmds = require("../util/commands.js")
const rl = readln.createInterface({
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
          for (let i = 0; i < index.bot.length; i++) {
            const cmd = new ConsoleCommand(tmpcmd.join(' '), i)
            cmds[l.split(' ')[0].toLowerCase()].execute(cmd)
          }
        } else {
          const cmd = new ConsoleCommand(tmpcmd.join(' '), +index2)
          cmds[l.split(' ')[0].toLowerCase()].execute(cmd)
        }
      } else {
        const cmd = new ConsoleCommand(l, -2)
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
  readln.cursorTo(process.stdout, 0)
  readln.clearLine(process.stdout, 0)
  process.stdout.write(text + '\n')
  rl.prompt(true)
}
module.exports = {
  load: (b) => {
    b.info = (msg) => {
      consoleWrite(`[${b.id}] [info] ${msg}`)
    }
    b.displayChat = (type, msg) => {
      consoleWrite(`[${b.id}] [${type}] ${msg}`)
    }
  }
}
