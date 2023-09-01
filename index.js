// this was linted with a demo of https://standardjs.com/demo.html
const mp = require('minecraft-protocol')
const fs = require('fs')
const crypto = require('crypto')
const servers = require('./servers.json')
const settings = require('./settings.json')
if (servers.length === 0) {
  console.log('There are no servers in servers.json. Please add a server.')
  process.exit(1)
}
const cp = require('child_process')

const secureMode = false
const user = cp.execSync('whoami').toString('UTF-8').split('\n')[0] // Only tested on Linux so far
if (secureMode && (user === 'root' || user.toLowerCase().includes('nt authority'))) {
  process.exit(2)
}

const bots = []
const en = [ // Eaglercraft names
  'Yee',
  'Yeer',
  'Yeeg',
  'Yeeish',
  'Yeeler',
  'Eagl',
  'Eagler',
  'Vigg',
  'Darver',
  'Darvler',
  'Vool',
  'Yigg',
  'Deev'
]
const rb = function (length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').substring(0, length)
}
const usernameGen = (legal) => {
  let prefix
  if (legal) {
    return en[Math.floor(Math.random() * en.length)] + en[Math.floor(Math.random() * en.length)] + (Math.floor(Math.random() * 90) + 10)
  } else {
    prefix = '@a[bb_'
  }
  const chars = 16 - prefix.length
  const suffix = rb(chars)
  return prefix + suffix
}
const createBot = (h, p, o) => {
  if (o.disabled) {
    // console.log('[Info] Bot connecting to ' + h + ':' + (p || 25565) + ' is not enabled.')
    return 4
  }
  let username
  let password
  let authType
  if (settings.onlineuser.startsWith('file:')) {
    const file = require(settings.onlineuser.slice(5))
    username = file.onlineEmail
    password = file.onlinePass
    authType = file.onlineType
  } else {
    username = settings.onlineuser
    password = settings.onlinepass
    authType = 'microsoft'
  }
  const b = mp.createClient({
    host: h,
    port: p,
    username: o.om ? username : usernameGen(o.legal_username),
    password: o.om ? password : null,
    auth: o.om ? authType : 'offline',
    version: o.version ? o.version : '1.19.2',
    hideErrors: true
  })
  b.o = o
  b.on('error', (e) => {
    console.log(`[Error/${b.id}] ${e}`)
  })
  b.host = h
  b.port = p
  b.real = true
  return b
}

// plugins (everything because of habit & modular bots are better)
// for the most part this is from u6
// let p={};

// DO NOT TOUCH
module.exports.createBot = createBot
module.exports.bots = bots
// module.exports.p=p;
module.exports.secure = secureMode
// end of DO NOT TOUCH

global.loadplug = (botno) => {
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
        if (plug.load2) {
          plug.load2(bots[botno])
        }
        // console.log("reload")
      } else {
        plug.load()
        // console.log("non-reload")
      }
      // console.log(`[Info] Loaded ${plug.description}`)
    } catch (e) { console.log(e) }
  })
}

global.loadplug()
// require("./test.js")
// console.log(JSON.stringify(p))

for (const i in servers) {
  const mcb = createBot(servers[i].host, servers[i].port, servers[i].opt)
  if (mcb === 4) {
    bots[i] = {
      id: i,
      real: false,
      send: () => {},
      host: servers[i].host,
      port: servers[i].port,
      o: servers[i].opt
    }
    continue
  }
  bots.push(mcb)
  bots[i].id = i
  global.loadplug(i)
}
