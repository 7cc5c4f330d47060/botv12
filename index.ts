declare global {
  var settings: any
  var codeDir: string
  var baseDir: string
  var debugMode: boolean
  var clOptions: any
}

// Global options
globalThis.codeDir = dirname(process.argv[1])
globalThis.baseDir = process.cwd()

const settings = (await import(resolve(baseDir, 'settings.js'))).default
globalThis.settings = settings

globalThis.debugMode = settings.debugMode

globalThis.clOptions = {
  disableWsServer: false
}

import { dirname, resolve } from 'node:path'

import ha from './util/argv.js'
ha()

import Botv12Client from './util/Botv12Client.js'
import generateUser from './util/usergen.js'
//import { getMessage } from './util/lang.js'
import { readdirSync } from 'node:fs'
//import { default as registry } from 'prismarine-registry'

if (debugMode) console.log('\x1b[33m[warning] Debug Mode is enabled.')

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
const bpl = readdirSync(resolve(codeDir, 'plugins'))
for (const plugin of bpl) {
  if (!plugin.endsWith('.ts') && !plugin.endsWith('.js') && !plugin.endsWith('.mjs')) {
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


export {
  bots,
  createBot
}
