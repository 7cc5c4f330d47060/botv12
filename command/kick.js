const index = require('../index.js')
const uuidToInt = require('../util/uuidtoint.js')
module.exports = {
  command_b: function (b, msg) {
    const args = msg.split(' ')
    const kickedplayer = args.slice(1).join(' ')
    if (args[1] == '@a') {
      b.ccq.push(`/msg @a[nbt=!{UUID:[I;${uuidToInt(b.uuid)}]}] @e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e@e`)
      b.send('Kicking all players')
    } else {
      b.kick(kickedplayer, undefined, 'command')
      b.send('Kicking player ' + args[1])
    }
  },
  command_c: function (msg) {
    const args = msg.split(' ')
    args.shift()
    const bot = +args.shift()
    const kickedplayer = args.slice(1).join(' ')
    index.bots[bot].kick(kickedplayer, undefined, 'command')
    index.bots[bot].send('Kicking player ' + args[1])
    console.log('Kicking player ' + args[1])
  },
  desc: 'Kick a player',
  usage: ' <player>',
  hidden: true,
  verify: true
}
// nbt={UUID:[I;${uuidToInt(uuid)}]}
// eval index.bots[0].ccq.push("/give 75a0985a1353b0c1 stone{"+new Array(700).fill("a:{").join("")+new Array(700).fill("}").join("")+"}")
