import Botv12Client from './util/game/Botv12Client.js'
import type HostOptions from './util/interface/HostOptions.js'
import { resolve } from 'node:path'
import { readdir, writeFile } from 'node:fs/promises'
import exists from './util/hf/existsAsync.js'
import generateUser from './util/startup/usergen.js'
import version from './version.js'
import { createInterface } from 'node:readline'
import type { ClientOptions } from 'minecraft-protocol'

import './util/startup/init.js'

if (debugMode) console.debug('[debug] Loading...\x1b[0m')

const _awaitLicense = async function (a: (x?: string)=>void, b: ()=>void) {
  if (debugMode) console.debug('[debug] Checking license...')

  if (!await exists(resolve(dataDir, '.license_accepted'))) {
    if (debugMode) console.debug('[debug] License check failed.')
    console.log(`${version.botName} is licensed under the GNU Affero General Public License, version 3 or later. ` +
    'This license requires, among other things, that the source code be made available to anybody ' +
    'looking for it, even if you only host a fork of the bot. The bot includes a ' +
    'download command to download the source. You may also use any public ' +
    'version control system, or any other method to distribute the source to those who want it. For more ' +
    'information on licensing, check the "LICENSE" file in the root folder (same folder as index.ts).\n\n' +
    'To accept the license, type \'I accept\' below. If you do not accept the license, you may ' +
    'not use this software.')
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '\x1b[0m> '
    })
    rl.on('line', (l: string) => {
      if (l.toLowerCase() === 'i accept') {
        if (debugMode) console.debug('[debug] License accepted, continuing...')
        writeFile(resolve(dataDir, '.license_accepted'), '')
        rl.close()
        a()
      } else {
        if (debugMode) console.debug('[debug] License declined, exiting...')
        b()
      }
    })
    rl.prompt(false)
  } else {
    if (debugMode) console.debug('[debug] License check passed, continuing...')
    a()
  }
}

globalThis.bots = []
globalThis.createBot = function createBot (host: HostOptions, oldId?: number) {
  const startTimeBot = Date.now()
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
    version: host.version ?? settings.minecraftVersion
  }

  if (debugMode) console.debug(`[debug] Connecting bot to ${host.options.hidden ? 'hidden' : options.host}:${options.port}...\x1b[0m`)
  const bot = new Botv12Client(options)

  bot.host = host

  for (const pluginItem of plugins) {
    if (pluginItem) pluginItem(bot)
  }

  bot.ready = true

  if (typeof oldId !== 'undefined') {
    // Replace old bot with new one
    if (bots[oldId]?.interval) {
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

const startBot = function () {
  if (debugMode) console.debug(`[debug] Loaded in ${Date.now() - startTime}ms\x1b[0m`)
  if (settings.format !== version.settingsFormat) {
    console.warn(`[warning] The settings file is using a different major format version (${settings.format}) than this version of ${version.botName} expects (${version.settingsFormat}). Unexpected issues and/or crashes may occur.`)
  }
  for (const i in settings.servers) {
    createBot(settings.servers[i])
  }
}

const plugins: ((b: Botv12Client) => void)[] = []
const loadPlugins = async () => {
  const bpl = await readdir(resolve(codeDir, 'plugins'))
  for (const plugin of bpl) {
    if (!plugin.endsWith('.ts') && !plugin.endsWith('.js') && !plugin.endsWith('.mjs')) {
      continue
    }
    try {
      if (debugMode) console.debug(`[debug] Loading plugin ${plugin}...\x1b[0m`)
      import(`./plugins/${plugin}`).then((pluginItem) => {
        plugins.push(pluginItem.default) // For rejoining
        if (plugins.length === bpl.length) {
          startBot()
        }
      })
    } catch (e) { console.log(e) }
  }
}

const a = new Promise(_awaitLicense)
await a
await loadPlugins()
