const fs = require('fs')

if (!fs.readdirSync('.').includes('settings.json')) {
  console.log('Settings file is missing, using defaults.')
  fs.copyFileSync('settings_example.json', 'settings.json')
}

if (!fs.readdirSync('.').includes('secret.json')) {
  console.log('Secrets file is missing, using defaults.')
  fs.copyFileSync('secret_example.json', 'secret.json')
  console.log('Please change the hashing keys in the secrets file.')
}

const m = require('minecraft-protocol')
const generateUser = require('./util/usergen.js')
const EventEmitter = require('node:events')
const settings = require('./settings.json')
const secret = require('./secret.json')
module.exports.bots = []

const botplug = []
const bpl = fs.readdirSync('plugins')
for (const plugin of bpl) {
  if (!plugin.endsWith('.js')) {
    continue
  }
  try {
    botplug.push(require(`./plugins/${plugin}`))
  } catch (e) { console.log(e) }
}

const loadplug = (botno) => {
  botplug.forEach((plug) => {
    try {
      if (plug.load) {
        plug.load(module.exports.bots[botno])
      }
    } catch (e) { console.log(e) }
  })
}

const createBot = function createBot (host, oldId) {
  if (host.options.disabled) {
    return
  }
  const options = {
    host: host.host,
    port: host.port ? host.port : 25565,
    version: host.version ? host.version : settings.version_mc
  }
  if(host.options.online){
    options.username = secret.onlineEmail
    options.password = secret.onlinePass
    options.auth = 'microsoft'
  } else {
    options.username = generateUser(host.options.legalName)
  }
  const bot = new EventEmitter()
  bot._client = m.createClient(options)
  if (typeof oldId !== 'undefined') {
    for (const i in module.exports.bots[oldId].interval) {
      clearInterval(module.exports.bots[oldId].interval[i])
    }
    delete module.exports.bots[oldId]
    bot.id = oldId
    module.exports.bots[oldId] = bot
  } else {
    bot.id = module.exports.bots.length
    module.exports.bots.push(bot)
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

for (const server of settings.servers) {
  createBot(server)
}

module.exports.createBot = createBot
