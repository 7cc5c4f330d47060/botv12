import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import CommandRegistry from './CommandRegistry.js'

const registry = new CommandRegistry()
const bpl = readdirSync(resolve(codeDir, 'commands'))

for (const plugin of bpl) {
  if (!plugin.endsWith('.ts') && !plugin.endsWith('.js') && !plugin.endsWith('.mjs')) {
    continue
  }
  try {
    const ending = plugin.split('.').reverse()[0]
    const commandName = plugin.split(`.${ending}`)[0]
    console.log(commandName)
    import(`../commands/${plugin}`).then((pluginItem) => {
      registry.register(commandName, pluginItem.execute, pluginItem.level, pluginItem.consoleIndex, pluginItem.hidden, pluginItem.aliases, pluginItem.consoleOnly, pluginItem.debugOnly, pluginItem.blockChipmunkMod)
    })
  } catch (e) { console.log(e) }
}

export default registry
