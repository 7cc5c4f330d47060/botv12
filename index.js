const m = require("minecraft-protocol")
const settings = require("./settings.json")
const secret = require(settings.secret)
const EventEmitter = require("node:events")
const crypto = require("crypto")
const fs=require("fs")

module.exports.bot=[];

const generateUser = function generateUser(){
	return "botvX"+crypto.randomBytes(4).toString("hex")
}

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
        if (botno !== undefined) {
          if (plug.loadBot) {
            plug.loadBot(module.exports.bot[botno])
          }
        } else {
          plug.load()
        }
      } catch (e) { console.log(e) }
    })
}
loadplug()

const createBot = function createBot(host){
    const bot = new EventEmitter();
    bot._client = m.createClient({
        host: host.host,
        port: host.port ? host.port : 25565,
        username: generateUser()
    })
    bot._client.on("success",()=>{
        //console.log(bot);
    })
    bot.id=module.exports.bot.length;
    module.exports.bot.push(bot);
    loadplug(bot.id);
}

for(const i in settings.servers){
    createBot(settings.servers[i]);
}

