import { readdirSync } from 'node:fs'
import CommandR from './cr.js'

const registry = new CommandR();
const bpl = readdirSync('commands')

for (const plugin of bpl) {
  if (!plugin.endsWith('.js')) {
    continue
  }
  try {
    const commandName = plugin.split('.js')[0]
    import(`../commands/${plugin}`).then((pluginItem) => {
      registry.register(commandName, pluginItem.execute, pluginItem.level, pluginItem.consoleIndex, pluginItem.hidden, pluginItem.aliases, pluginItem.consoleOnly)
    })
  } catch (e) { console.log(e) }
}

export default registry
