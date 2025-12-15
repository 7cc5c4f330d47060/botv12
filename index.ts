import settings from './settings.js'
import Botv12Client from './util/Botv12Client.ts'
import generateUser from './util/usergen.ts'
import version from './version.js'
//import { getMessage } from './util/lang.js'
import { readdirSync, writeFileSync } from 'node:fs'
import { createInterface } from 'node:readline'
//import { default as registry } from 'prismarine-registry'

const awaitLicense = function(callback: any){
  if(settings.debugMode) console.log('[debug] Checking license...')
  const rootFileList = readdirSync('.')
  if(!rootFileList.includes('.license_accepted')){
    if(settings.debugMode) console.log('[debug] License check failed.')
      console.log(`${version.botName} is licensed under the GNU Affero General Public License, version 3 or later.\n`+
      `This license requires, among other things, that the source code be made available to anybody \n`+
      `looking for it, even if you only host a fork of the bot. The bot includes a (currently\n`+
      `non-functional) download command to download the source. You may also use any publicly available\n`+
      `version control system, or any other method to distribute the source to those who want it. For more\n`+
      `information on licensing, check the "LICENSE" file in the root folder (same folder as index.ts).\n\n`+
      `To accept the license, type 'I accept' below. If you do not accept the license, you may \n`+
      `not use this software.`)
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '\x1b[0m> '
    })
    rl.on('line', (l: string) => {
      if(l.toLowerCase() == 'i accept'){
        if(settings.debugMode) console.log('[debug] License accepted, continuing...')
        writeFileSync('.license_accepted', '')
        rl.close()
        callback()
      } else {
        if(settings.debugMode) console.log('[debug] License declined, exiting...')
        process.exit(1)
      }
    })
    rl.prompt(false)
  } else {
    if(settings.debugMode) console.log('[debug] License check passed, continuing...')
    callback()
  }
}
if (settings.keyTrusted === undefined || settings.keyOwner === undefined) process.exit(1)

const bots: Botv12Client[] = []
const createBot = function createBot (host: any, oldId?: number) {
  const options = {
    host: host.host,
    fakeHost: host.fakeHost,
    port: host.port ?? 25565,
    username: host.options.username ?? generateUser(),
    password: host.options.password ?? null,
    auth: host.options.authServer ? 'mojang' : null,
    authServer: host.options.authServer ?? null,
    sessionServer: host.options.sessionServer ?? null,
    version: host.version ?? settings.version_mc
  }

  const bot = new Botv12Client(options)

  bot.host = host
  
  for (const pluginItem of plugins) {
    if (pluginItem) pluginItem(bot)
  }

  if (typeof oldId !== 'undefined') {
    // Replace old bot with new one
    for (const i in bots[oldId].interval) {
      clearInterval(bots[oldId].interval[i])
    }
    delete bots[oldId]
    bot.id = oldId
    bots[oldId] = bot
  } else {
    bot.id = bots.length
    bots.push(bot)
  }
}

const init = function () {
  for (const i in settings.servers) {
    createBot(settings.servers[i])
  }
}


const plugins: any[] = []
const loadPlugins = () => {
  const bpl = readdirSync('plugins')
  for (const plugin of bpl) {
    if (!plugin.endsWith('.ts')) {
      continue
    }
    try {
      import(`./plugins/${plugin}`).then((pluginItem) => {
        plugins.push(pluginItem.default) // For rejoining
        if (plugins.length === bpl.length) {
          init()
        }
      })
    } catch (e) { console.log(e) }
  }
}
awaitLicense(loadPlugins)

export {
  bots,
  createBot
}
