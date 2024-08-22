const fs = require('fs')
const cmds = Object.create(null)
const bpl = fs.readdirSync('./commands')
for (const plugin of bpl) {
  if (!plugin.endsWith('.js')) {
    continue
  }
  try {
    const commandName = plugin.split('.js')[0]
    cmds[commandName] = require(`../commands/${plugin}`)
    if (cmds[commandName].level === undefined) {
      cmds[commandName].level = 0
    }
    if (cmds[commandName].aliases) {
      for (const alias of cmds[commandName].aliases) {
        cmds[alias] = {
          execute: cmds[commandName].execute,
          alias: commandName,
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
