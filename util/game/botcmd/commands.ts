import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import CommandRegistry from './CommandRegistry.js'
import Command from './Command.js'
import UnknownCommand from './UnknownCommand.js'

const registry = new CommandRegistry(new UnknownCommand())
const bpl = await readdir(resolve(codeDir, 'commands'))

for (const plugin of bpl) {
  if (!plugin.endsWith('.ts') && !plugin.endsWith('.js') && !plugin.endsWith('.mjs')) {
    continue
  }
  try {
    import(`../../../commands/${plugin}`).then((pluginItem: { default: new () => Command }) => {
      const CommandItem = pluginItem.default
      registry.register(new CommandItem())
    })
  } catch (e) { console.log(e) }
}

export default registry
