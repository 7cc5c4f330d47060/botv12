// const fs=require("fs")
// const ba=fs.readFileSync("./ba.txt").toString()
const settings = require('../settings.json')
module.exports = {
  load: function () {

  },
  load2: function (b) {
    // b.chatqueue=["/de","/gamerule doMobLoot false","/gamerule doMobSpawning false","/gamerule doTileDrops false","/gamerule doEntityDrops false","/de","/cspy on"];
    b.chatqueue = ['/commandspy on']
    b.chatqueuepaused = false
    if (b.o.cc_enabled) {
      b.chatqueue.unshift(`/fill ~ 10 ~ ~ 15 ~ command_block${b.o.legacy_cc ? '' : `{CustomName:"{\\"text\\":\\"${settings.coreName}\\"}"}`}`)
    }
    b.version_2 = +b.version.split('.')[1]
    b.legacy_command = b.version_2 <= 18
    if (!b.o.chatqueue_split) {
      b.o.chatqueue_split = 250
    }
    if (!b.o.chatqueue_speed) {
      b.o.chatqueue_speed = 150
    }
    if (!b.o.chatqueue_wait) {
      b.o.chatqueue_wait = 1000
    }
    b.chatqueue_regex = RegExp(`.{1,${b.o.chatqueue_split}}`, 'g')
    b.command = function (command, hasSlash) {
      if (hasSlash) {
        command = command.slice(1)
      }
      b.write('chat_command', {
        command,
        timestamp: BigInt(Date.now()),
        salt: 0n,
        argumentSignatures: [],
        messageCount: 0,
        acknowledged: Buffer.alloc(3),
        previousMessages: []
      })
    }
    b.advancecq = function () {
      if (b.chatqueuepaused == true) return
      if (b.chatqueue[0] && b.chatqueue[0].length != 0) {
        if (b.chatqueue[0].startsWith('/') && !b.legacy_command) {
          b.command(b.chatqueue[0].slice(1), false)
        } else {
          // console.log(b.id)
          b.chat(b.chatqueue[0])
        }
      }
      b.chatqueue.splice(0, 1)
    }
    b.send = function (msg) {
      if (b.version_2 <= 15) {
        msg = msg.replace(/§#[0-9A-Fa-f]{6}/g, '')
        msg = msg.replace(/&#[0-9A-Fa-f]{6}/g, '')
      }
      const msgs = msg.match(b.chatqueue_regex)
      for (const i in msgs) {
        b.chatqueue.push(msgs[i].replace(/[\xa7\x00-\x1f\x7f-\x9f]/g, 'ÿ'))
      }
    }
    b.on('success', function () {
      if (b.o.autocrash) {
        for (let i = 0; i <= 8; i++) {
          for (let j = 0; j <= 8; j++) {
            for (let k = 0; k <= 8; k++) {
              b.send('/kick @a @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e')
            }
          }
        }
      }
      // console.log("success packet")//ba.split("\n")
      // b.cqa=Function("index.p.advancecq()")//"+i+"
      setTimeout(() => { b.cqi = setInterval(b.advancecq, b.o.chatqueue_speed) }, b.o.chatqueue_wait) // adds up to 1150
    })
  }
}
