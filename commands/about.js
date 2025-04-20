/*
  If you are forking the bot, you must comply with the MIT License, which only requires
  attribution. If you choose to remove or modify this command, you must find another way to comply
  with the MIT License, such as adding a message on join or in another command.
  You may also make your fork open source as well, and add a message in the readme.
  Additionally, if you're forking a fork with a different license, such as GPL, make sure you
  comply with any additional terms.
*/

import aboutServer from './aboutSub/server.js'
import displayServerList from './aboutSub/serverList.js'
import displaySettings from './aboutSub/settings.js'
import displayVersions from './aboutSub/version.js'
import aboutBot from './aboutSub/aboutBot.js'

const execute = c => {
  let subcmd
  if (c.args.length >= 1) subcmd = c.args[0].toLowerCase()
  if (subcmd === 'servers') subcmd = 'serverlist'
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
  } else {
    aboutBot(c)
  }
}
const aliases = ['info', 'serverlist', 'servers', 'serverinfo', 'specs', "version"]
export { execute, aliases }
