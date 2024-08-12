const m = require('minecraft-protocol')
const settings = require('./settings.json')
const generateUser = require('./util/usergen.js')
const EventEmitter = require('node:events')
const fs = require('fs')

module.exports.bot = []

const loadplug = (botno) => {
  const botplug = []
  const bpl = fs.readdirSync('plugins')
  for (const i in bpl) {
    if (!bpl[i].endsWith('.js')) {
      continue
    }
    try {
      botplug.push(require(`./plugins/${bpl[i]}`))
    } catch (e) { console.log(e) }
  }
  botplug.forEach((plug) => {
    try {
      if (plug.load) {
        plug.load(module.exports.bot[botno])
      }
    } catch (e) { console.log(e) }
  })
}

const createBot = function createBot (host, oldId) {
  if (host.options.disabled) {
    return
  }
  const bot = new EventEmitter()
  bot._client = m.createClient({
    host: host.host,
    port: host.port ? host.port : 25565,
    username: generateUser(host.options.legalName),
    version: host.version ? host.version : settings.version_mc
  })
  if (typeof oldId !== 'undefined') {
    for (const i in module.exports.bot[oldId].interval) {
      clearInterval(module.exports.bot[oldId].interval[i])
    }
    delete module.exports.bot[oldId]
    bot.id = oldId
    module.exports.bot[oldId] = bot
  } else {
    bot.id = module.exports.bot.length
    module.exports.bot.push(bot)
  }

  bot.host = host
  bot.interval = {}

  bot.info = (msg) => {
    console.log(`[${bot.id}] [info] ${msg}`)
  }

  bot.displayChat = (type, msg) => {
    console.log(`[${bot.id}] [${type}] ${msg}`)
  }

  loadplug(bot.id)
  bot._client.on('error', (err) => {
    console.log(err)
  })
}

for (const i in settings.servers) {
  createBot(settings.servers[i])
}

module.exports.createBot = createBot
