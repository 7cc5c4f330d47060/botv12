import { createClient } from 'minecraft-protocol'
import settings from './settings.js'
import generateUser from './util/usergen.js'
import EventEmitter from 'node:events'
import { readdirSync } from 'node:fs'

const bots = []

const plugins = []
const bpl = readdirSync('plugins')
for (const plugin of bpl) {
  if (!plugin.endsWith('.js')) {
    continue
  }
  try {
    import(`./plugins/${plugin}`).then((pluginItem) => {
      for (const bot of bots) {
        pluginItem.default(bot)
      }
      plugins.push(pluginItem.default) // For rejoining
    })
  } catch (e) { console.log(e) }
}

const createBot = function createBot (host, oldId) {
  const bot = new EventEmitter()

  bot.host = host
  bot.interval = {}

  bot._client = createClient({
    host: host.host,
    port: host.port ?? 25565,
    username: generateUser(host.options.legalName),
    version: host.version ?? settings.version_mc
  })

  bot.info = (msg) => {
    console.log(`[${bot.id}] [info] ${msg}`)
  }

  bot.displayChat = (type, subtype, msg) => {
    if (settings.displaySubtypesToConsole) {
      console.log(`[${bot.id}] [${type}] [${subtype}] ${msg}`)
    } else {
      console.log(`[${bot.id}] [${type}] ${msg}`)
    }
  }

  if (typeof oldId !== 'undefined') {
    for (const i in bots[oldId].interval) {
      clearInterval(bots[oldId].interval[i])
    }
    delete bots[oldId]
    bot.id = oldId
    bots[oldId] = bot
    for (const pluginItem of plugins) {
      pluginItem(bot)
    }
  } else {
    bot.id = bots.length
    bots.push(bot)
  }

  bot._client.on('error', (err) => {
    console.log(err)
  })
}

for (const i in settings.servers) {
  createBot(settings.servers[i])
}

export {
  bots,
  createBot
}
