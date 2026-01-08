declare global {
  var settings: any
  var codeDir: string
  var baseDir: string
  var debugMode: boolean
  var clOptions: any
  var startTime: number
}

globalThis.startTime = Date.now();
// Global options
globalThis.debugMode = false;
globalThis.codeDir = dirname(process.argv[1])
globalThis.baseDir = process.cwd()
globalThis.clOptions = { disableWsServer: false }

import { dirname, resolve } from 'node:path'

import ha from './util/argv.js'
ha()

const settings = (await import(resolve(baseDir, 'settings.js'))).default
globalThis.settings = settings
globalThis.debugMode = settings.debugMode || globalThis.debugMode

if (debugMode) console.log('[debug] Loading...\x1b[0m')

import Botv12Client from './util/Botv12Client.js'
import generateUser from './util/usergen.js'
import version from './version.js'
//import { getMessage } from './util/lang.js'
import { readdirSync, writeFileSync } from 'node:fs'
import { createInterface } from 'node:readline'
//import { default as registry } from 'prismarine-registry'

const awaitLicense = function(callback: any){
  if(debugMode) console.log('[debug] Checking license...')
  const rootFileList = readdirSync(baseDir)
  if(!rootFileList.includes('.license_accepted')){
    if(debugMode) console.log('[debug] License check failed.')
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
        if(debugMode) console.log('[debug] License accepted, continuing...')
        writeFileSync(resolve(baseDir, '.license_accepted'), '')
        rl.close()
        callback()
      } else {
        if(debugMode) console.log('[debug] License declined, exiting...')
        process.exit(1)
      }
    })
    rl.prompt(false)
  } else {
    if(debugMode) console.log('[debug] License check passed, continuing...')
    callback()
  }
}

if (settings.keyTrusted === undefined || settings.keyAdmin === undefined || 
  settings.keyOwner === undefined) process.exit(1)

const bots: Botv12Client[] = []
const createBot = function createBot (host: any, oldId?: number, bypassStall?: boolean) {
  const startTimeBot = Date.now();
  const options = {
    host: host.host,
    fakeHost: host.fakeHost,
    port: host.port ?? 25565,
    username: host.options.username ?? generateUser(),
    password: host.options.password ?? null,
    session: host.options.session ?? null,
    auth: host.options.authServer ? 'mojang' : null,
    authServer: host.options.authServer ?? null,
    sessionServer: host.options.sessionServer ?? null,
    version: host.version ?? settings.version_mc
  }
  let bot: any;
  if(host.stall && !bypassStall){
    const newId = oldId ?? bots.length
    console.log(`[info] Stalling joining of bot ${newId}`)
    bot = {
      ready: false,
      join: function () {
        console.log(`[info] Joining stalled bot ${newId}`)
        createBot(host, newId, true)
      }
    }
  } else {
    if (debugMode) console.log(`[debug] Connecting bot to ${options.host}:${options.port}...\x1b[0m`)
    bot = new Botv12Client(options)

    bot.host = host
    
    for (const pluginItem of plugins) {
      if (pluginItem) pluginItem(bot)
    }

    bot.ready = true
  }


  if (typeof oldId !== 'undefined') {
    // Replace old bot with new one
    if(bots[oldId]?.interval){
      for (const i in bots[oldId].interval) {
        clearInterval(bots[oldId].interval[i])
      }
    }
    bot.id = oldId
    bots[oldId] = bot
  } else {
    bot.id = bots.length
    bots.push(bot)
  }
  if (debugMode) console.log(`[debug] Bot ${bot.id} loaded in ${Date.now() - startTimeBot}ms\x1b[0m`)
}

const init = function () {
  if (debugMode) console.log(`[debug] Loaded in ${Date.now() - startTime}ms\x1b[0m`)
  for (const i in settings.servers) {
    createBot(settings.servers[i])
  }
}

const plugins: ((b: Botv12Client) => void)[] = []
const loadPlugins = () => {
  const bpl = readdirSync(resolve(codeDir, 'plugins'))
  for (const plugin of bpl) {
    if (!plugin.endsWith('.ts') && !plugin.endsWith('.js') && !plugin.endsWith('.mjs')) {
      continue
    }
    try {
      if (debugMode) console.log(`[debug] Loading plugin ${plugin}...\x1b[0m`)
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
