import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import CommandRegistry from './CommandRegistry.js'
import Command from './Command.js'

const registry = new CommandRegistry()
const bpl = readdirSync(resolve(codeDir, 'commands'))

for (const plugin of bpl) {
  if (!plugin.endsWith('.ts') && !plugin.endsWith('.js') && !plugin.endsWith('.mjs')) {
    continue
  }
  try {
    import(`../commands/${plugin}`).then((pluginItem: {default: new () => Command}) => {
      console.log(pluginItem)
      registry.register(new pluginItem.default())
    })
  } catch (e) { console.log(e) }
}

export default registry
