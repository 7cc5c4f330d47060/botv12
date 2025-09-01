import settings from './settings.js'
import UBotClient from './util/UBotClient.ts'
import generateUser from './util/usergen.ts'
//import { getMessage } from './util/lang.js'

//import { readdirSync } from 'node:fs'
//import { default as registry } from 'prismarine-registry'

if (settings.keyTrusted === undefined || settings.keyOwner === undefined) process.exit(1)

const bots = []
const createBot = function createBot (host: any) {
  const options = {
    host: host.host,
    fakeHost: host.fakeHost,
    port: host.port ?? 25565,
    username: host.options.forceName ?? generateUser(),
    version: host.version ?? settings.version_mc
  }

  const bot = new UBotClient(options)
}

const init = function () {
  for (const i in settings.servers) {
    createBot(settings.servers[i])
  }
}

init()

export {
  bots,
  createBot
}
