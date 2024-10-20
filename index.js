import { createClient } from "minecraft-protocol";
import { default as settings } from './settings.json' with {type: "json"}
import { generateUser } from './util/usergen.js'
import EventEmitter from 'node:events'

const bots = [];

const createBot = function createBot (host, oldId) {
  const bot = new EventEmitter()
  bot._client = createClient({
    host: host.host,
    port: host.port ? host.port : 25565,
    username: generateUser(host.options.legalName),
    version: host.version ? host.version : settings.version_mc
  })
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
  
  bot.host = host
  bot.interval = {}

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
