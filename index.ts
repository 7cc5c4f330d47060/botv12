import settings from './settings.js'
import UBotClient from './util/UBotClient.ts'
import generateUser from './util/usergen.ts'
//import { getMessage } from './util/lang.js'
import { readdirSync } from 'node:fs'
//import { default as registry } from 'prismarine-registry'

if (settings.keyTrusted === undefined || settings.keyOwner === undefined) process.exit(1)

const bots: UBotClient[] = []
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

  const bot = new UBotClient(options)

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


export {
  bots,
  createBot
}
