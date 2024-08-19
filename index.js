import * as m from 'minecraft-protocol'
import { default as settings } from './settings.json' with {type: "json"}
import { generateUser } from './util/usergen.js'
import EventEmitter from 'node:events'
import * as fs from 'fs'

let botArray = []

const botplug = [];

import { default as botplug_test } from "./plugins/testing.mjs" // We have to load plugins manually, because auto-detection does not work in this format
import { default as botplug_chat } from "./plugins/cq.mjs" 
import { default as botplug_chatParse } from "./plugins/!chat.mjs" 
import { default as botplug_player } from "./plugins/player.mjs" 

botplug.push(botplug_test)
botplug.push(botplug_chat)
botplug.push(botplug_chatParse)
botplug.push(botplug_player)

const bpl = fs.readdirSync('plugins')

const loadplug = (botno) => {
  botplug.forEach((plug) => {
    try {
      if (plug.load) {
        plug.load(botArray[botno])
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
    for (const i in botArray[oldId].interval) {
      clearInterval(botArray[oldId].interval[i])
    }
    delete botArray[oldId]
    bot.id = oldId
    botArray[oldId] = bot
  } else {
    bot.id = botArray.length
    botArray.push(bot)
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

//module.exports.createBot = createBot
