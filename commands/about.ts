/*import aboutServer from './aboutSub/server.js'
import displayServerList from './aboutSub/serverList.js'
import displaySettings from './aboutSub/settings.js'*/
import displayVersions from './aboutSub/version.js'
//import license from './aboutSub/license.js'
import aboutBot from './aboutSub/aboutBot.js'

import SubCommandRegistry from '../util/SubCommandRegistry.js'
import CommandContext from '../util/CommandContext.js'
const registry = new SubCommandRegistry(['info'])

registry.register('base', aboutBot)
/*registry.register('server', aboutServer, ['serverinfo', 'specs'])
registry.register('serverlist', displayServerList, ['servers'])
registry.register('settings', displaySettings)*/
registry.register('version', displayVersions)
//registry.register('license', license, ['licence'])

async function execute (c: CommandContext) {
  registry.runCommand(c)
}
const aliases = registry.aliases
export { execute, aliases }
