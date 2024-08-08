const fs = require('fs')
const cmds = Object.create(null)
const bpl = fs.readdirSync('./commands')
for (const i in bpl) {
  if (!bpl[i].endsWith('.js')) {
    continue
  }
  try {
    const commandName = bpl[i].split('.js')[0]
    cmds[commandName] = require(`../commands/${bpl[i]}`)
    if (cmds[commandName].level === undefined) {
      cmds[commandName].level = 0
    }
    if (cmds[commandName].aliases) {
      for (const j in cmds[commandName].aliases) {
        cmds[cmds[commandName].aliases[j]] = {
          execute: cmds[commandName].execute,
          desc: 'Alias to ' + commandName,
          usage: cmds[commandName].usage,
          level: cmds[commandName].level,
          hidden: true,
          consoleIndex: cmds[commandName].consoleIndex
        }
      }
    }
  } catch (e) { console.log(e) }
}
module.exports = cmds
