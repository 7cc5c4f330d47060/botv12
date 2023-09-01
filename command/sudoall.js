const settings = require('../settings.json')
const index = require('../index.js')
module.exports = {
  command_b: function (b, msg, sender) {
    const args = msg.split(' ')
    args.shift()
    if (args.length == 1) {
      if (b.o.partial_op || b.o.deop || !b.o.cc_enabled) {
        b.send('You must provide a command!')
      } else {
        b.tellraw(sender, JSON.stringify({
          text: 'You must provide a command!',
          color: settings.colors.primary
        }))
      }
    }
    const players = Object.keys(b.players_o)
    // b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
    if (b.o.sudo_username) {
      if (!b.o.cc_enabled) {
        for (const i in players) {
          b.send(`/sudo ${b.players_o[players[i]].name} ${args.join(' ')}`)
        }
      } else {
        for (const i in players) {
          b.ccq.push(`/sudo ${b.players_o[players[i]].name} ${args.join(' ')}`)
        }
      }
    } else {
      if (!b.o.cc_enabled) {
        for (const i in players) {
          b.send(`/sudo ${players[i]} ${args.join(' ')}`)
        }
      } else {
        for (const i in players) {
          b.ccq.push(`/sudo ${players[i]} ${args.join(' ')}`)
        }
      }
    }
  },
  command_c: function (msg) {
    const args = msg.split(' ')
    args.shift()
    const bot = +args.shift()
    if (args.length == 0) {
      console.log('You must provide a command!')
    }
    const players = Object.keys(index.bots[bot].players_o)
    // b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
    if (index.bots[bot].o.sudo_username) {
      if (!index.bots[bot].o.cc_enabled) {
        for (const i in players) {
          index.bots[bot].send(`/sudo ${b.players_o[players[i]].name} ${args.join(' ')}`)
        }
      } else {
        for (const i in players) {
          index.bots[bot].ccq.push(`/sudo ${b.players_o[players[i]].name} ${args.join(' ')}`)
        }
      }
    } else {
      if (!index.bots[bot].o.cc_enabled) {
        for (const i in players) {
          index.bots[bot].send(`/sudo ${players[i]} ${args.join(' ')}`)
        }
      } else {
        for (const i in players) {
          index.bots[bot].ccq.push(`/sudo ${players[i]} ${args.join(' ')}`)
        }
      }
    }
  },
  desc: 'Force all players to run a command, even if the server blocks it',
  usage: ' <command>',
  hidden: false,
  delay: 60000
}
