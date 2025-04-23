import aboutServer from './aboutSub/server.js'
import displayServerList from './aboutSub/serverList.js'
import displaySettings from './aboutSub/settings.js'
import displayVersions from './aboutSub/version.js'
import license from './aboutSub/license.js'
import aboutBot from './aboutSub/aboutBot.js'

const execute = c => {
  let subcmd
  if (c.args.length >= 1) subcmd = c.args[0].toLowerCase()
  if (subcmd === 'licence') subcmd = 'license'
  if (subcmd === 'servers') subcmd = 'serverlist'
  if (c.cmdName.toLowerCase() === 'licence' || c.cmdName.toLowerCase() === 'license') subcmd = 'license'
  if (c.cmdName.toLowerCase() === 'serverinfo' || c.cmdName.toLowerCase() === 'specs') subcmd = 'server'
  if (c.cmdName.toLowerCase() === 'serverlist' || c.cmdName.toLowerCase() === 'servers') subcmd = 'serverlist'
  if (c.cmdName.toLowerCase() === 'version') subcmd = 'version'
  if (subcmd === 'server') {
    aboutServer(c)
  } else if (subcmd === 'serverlist') {
    displayServerList(c)
  } else if (subcmd === 'settings') {
    displaySettings(c)
  } else if (subcmd === 'version') {
    displayVersions(c)
  } else if (subcmd === 'license') {
    license(c)
  } else {
    aboutBot(c)
  }
}
const aliases = ['info', 'serverlist', 'servers', 'serverinfo', 'specs', 'version', 'licence', 'license']
export { execute, aliases }
