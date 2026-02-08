import Botv12Client from './util/Botv12Client.js'
import SettingsType from './util/interface/SettingsType.js'
import HostOptions from './util/interface/HostOptions.js'

declare global {
  var settings: SettingsType
  var codeDir: string
  var baseDir: string
  var dbEnabled: boolean
  var debugMode: boolean
  var clOptions: {
    disableWsServer?: boolean
    disableNetMsg?: boolean
  }
  var startTime: number
  var bots: Botv12Client[]
  var createBot: (host: HostOptions, oldId?: number, bypassStall?: boolean) => void
}

globalThis.startTime = Date.now();
// Global options
globalThis.dbEnabled = false;
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

if (debugMode) console.debug('[debug] Loading...\x1b[0m')

import generateUser from './util/usergen.js'
import version from './version.js'
//import { getMessage } from './util/lang.js'
import { readdirSync, writeFileSync } from 'node:fs'
import { createInterface } from 'node:readline'
import { ClientOptions } from 'minecraft-protocol'
//import { default as registry } from 'prismarine-registry'

const awaitLicense = function(callback: () => void){
  if (debugMode) console.debug('[debug] Checking license...')
  const rootFileList = readdirSync(baseDir)
  if(!rootFileList.includes('.license_accepted')){
    if (debugMode) console.debug('[debug] License check failed.')
    console.log(`${version.botName} is licensed under the GNU Affero General Public License, version 3 or later. `+
    `This license requires, among other things, that the source code be made available to anybody `+
    `looking for it, even if you only host a fork of the bot. The bot includes a `+
    `download command to download the source. You may also use any public `+
    `version control system, or any other method to distribute the source to those who want it. For more `+
    `information on licensing, check the "LICENSE" file in the root folder (same folder as index.ts).\n\n`+
    `To accept the license, type 'I accept' below. If you do not accept the license, you may `+
    `not use this software.`)
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '\x1b[0m> '
    })
    rl.on('line', (l: string) => {
      if(l.toLowerCase() == 'i accept'){
        if (debugMode) console.debug('[debug] License accepted, continuing...')
        writeFileSync(resolve(baseDir, '.license_accepted'), '')
        rl.close()
        callback()
      } else {
        if (debugMode) console.debug('[debug] License declined, exiting...')
        process.exit(1)
      }
    })
    rl.prompt(false)
  } else {
    if (debugMode) console.debug('[debug] License check passed, continuing...')
    callback()
  }
}

globalThis.bots = []
globalThis.createBot = function createBot (host: HostOptions, oldId?: number) {
  const startTimeBot = Date.now();
  const options: ClientOptions = {
    host: host.host,
    fakeHost: host.fakeHost,
    port: host.port ?? 25565,
    username: host.options.username ?? generateUser(),
    password: host.options.password ?? undefined,
    session: host.options.session ?? undefined,
    auth: host.options.authServer ? 'mojang' : 'offline',
    authServer: host.options.authServer ?? undefined,
    sessionServer: host.options.sessionServer ?? undefined,
    version: host.version ?? settings.version_mc
  }

  if (debugMode) console.debug(`[debug] Connecting bot to ${options.host}:${options.port}...\x1b[0m`)
  const bot = new Botv12Client(options)

  bot.host = host
    
  for (const pluginItem of plugins) {
    if (pluginItem) pluginItem(bot)
  }

  bot.ready = true

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
  if (debugMode) console.debug(`[debug] Bot ${bot.id} loaded in ${Date.now() - startTimeBot}ms\x1b[0m`)
}

const init = function () {
  if (debugMode) console.debug(`[debug] Loaded in ${Date.now() - startTime}ms\x1b[0m`)
  if(settings.format !== version.settingsFormat){
    console.warn(`[warning] The settings file is using a different major format version (${settings.format}) than this version of ${version.botName} expects (${version.settingsFormat}). Unexpected issues and/or crashes may occur.`)
  }
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
      if (debugMode) console.debug(`[debug] Loading plugin ${plugin}...\x1b[0m`)
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