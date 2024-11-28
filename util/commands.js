import { readdirSync } from 'node:fs'

const cmds = Object.create(null)
const bpl = readdirSync('commands')

for (const plugin of bpl) {
  if (!plugin.endsWith('.js')) {
    continue
  }
  try {
    const commandName = plugin.split('.js')[0]
    import(`../commands/${plugin}`).then((pluginItem) => {
      cmds[commandName] = pluginItem // For rejoining
      if (cmds[commandName].aliases) {
        for (const j in cmds[commandName].aliases) {
          cmds[cmds[commandName].aliases[j]] = {
            execute: cmds[commandName].execute,
            alias: commandName,
            usage: cmds[commandName].usage,
            level: cmds[commandName].level,
            hidden: true,
            consoleIndex: cmds[commandName].consoleIndex
          }
        }
      }
    })
  } catch (e) { console.log(e) }
}

export default cmds
