const fs = require('fs')

if (!fs.readdirSync('.').includes('settings.json')) {
  console.log('Settings file is missing, using defaults.')
  fs.copyFileSync('settings_example.json', 'settings.json')
}

if (!fs.readdirSync('.').includes('secret.json')) {
  console.log('Secrets file is missing, using defaults.')
  fs.copyFileSync('secret_example.json', 'secret.json')
  console.log('Please change the hashing keys in the secrets file. It is also recommended to remove permissions of other users to read from this file, for example, by giving it 600 permissions if running on a Unix or Unix-like OS.')
}

const m = require('minecraft-protocol')
const generateUser = require('./util/usergen.js')
const EventEmitter = require('node:events')
const settings = require('./settings.json')
const secret = require('./secret.json')
const version = require('./version.json')
const protover = require('./util/getProtocolVersion.js')
const mcd = require("minecraft-data")
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

let bypassWarningShown = false;

const createBot = function createBot (host, oldId) {
  if (host.options.disabled) {
    return
  }
  const options = {
    host: host.host,
    port: host.port ? host.port : 25565,
    version: host.version ? host.version : settings.version_mc
  }
  if(protover(options.version) < version.minimumMcVersion) {
    if(!settings.bypassVersionRequirement){
      console.error(`[error] ${version.botName} does not support Minecraft versions below ${version.minimumMcVersion} (${mcd.postNettyVersionsByProtocolVersion.pc[version.minimumMcVersion][0].minecraftVersion})`)
      return
    } else {
      if(!bypassWarningShown) console.warn(`[warning] You have disabled the version requirement, allowing the bot to join to servers with old Minecraft versions. These versions are unsupported and may break at any time. Any issues on such versions will not be fixed.`)
      bypassWarningShown = true;
    }
  }
  if (host.options.online) {
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
  if (bot.host.host.includes(':')) {
    bot.host.options.displayAsIPv6 = true
  }
  bot.interval = {}

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

  loadplug(bot.id)
  bot._client.on('error', (err) => {
    console.log(err)
  })
}

for (const server of settings.servers) {
  createBot(server)
}

module.exports.createBot = createBot
