import { createClient } from 'minecraft-protocol'
import settings from './settings.js'
import generateUser from './util/usergen.js'
import EventEmitter from 'node:events'
import { readdirSync } from 'node:fs'

if(settings.keyTrusted === undefined || settings.keyOwner === undefined) process.exit(1)

const bots=[]
const createBot = function createBot (host, oldId) {
  const bot = new EventEmitter()

  bot.host = host
  bot.interval = {}

  const options = {
    host: host.host,
    fakeHost: host.fakeHost,
    port: host.port ?? 25565,
    username: generateUser(host.options.legalName),
    version: host.version ?? settings.version_mc
  }

  if (host.options.online) {
    options.username = settings.onlineEmail
    options.password = settings.onlinePass
    options.auth = 'microsoft'
  }

  bot._client = createClient(options)

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

  for (const pluginItem of plugins) {
    pluginItem(bot)
  }

  if (typeof oldId !== 'undefined') {
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

  bot._client.on('error', (err) => {
    console.log(err)
  })
}

const init = function(){
  for (const i in settings.servers) {
    createBot(settings.servers[i])
  }
}

const plugins = []
const bpl = readdirSync('plugins')
for (const plugin of bpl) {
  if (!plugin.endsWith('.js')) {
    continue
  }
  try {
    import(`./plugins/${plugin}`).then((pluginItem) => {
      plugins.push(pluginItem.default) // For rejoining
      if(plugins.length === bpl.length) {
        init()
      }
    })
  } catch (e) { console.log(e) }
}

export {
  bots,
  createBot
}
