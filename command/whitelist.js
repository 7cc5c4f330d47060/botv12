const index = require('../index.js')
const settings = require('../settings.json')
module.exports = {
  command_b: function (b, msg, sender, username, verify) {
    const args = msg.split(' ')
    let flags = ''
    let mode
    const full = false
    if (args[1].startsWith('-') && !args[1].startsWith('--')) {
      flags = args[1].slice(1)
      args.splice(1, 1)
    }
    if (flags.includes('l')) {
      mode = args[1] == 'on' ? 1 : 0
    } else {
      mode = args[1] == 'on' ? 2 : 0
    }
    if (mode == 2) {
      b.tellraw('@a', JSON.stringify({
        text: `[${settings.name}] Whitelist enabled.`
      }))
    } else if (mode == 1) {
      b.tellraw('@a', JSON.stringify({
        text: `[${settings.name}] Whitelist enabled (lockdown).`
      }))
    } else {
      b.tellraw('@a', JSON.stringify({
        text: `[${settings.name}] Whitelist disabled.`
      }))
    }
    b.whitelist_toggle(mode, full)
  },
  command_c: function (msg) {
    const args = msg.split(' ')
    let flags = ''
    let server
    let mode
    let full = false
    if (args[1].startsWith('-') && !args[1].startsWith('--')) {
      flags = args[1].slice(1)
      args.splice(1, 1)
    } else if (args[2].startsWith('-') && !args[2].startsWith('--')) {
      flags = args[2].slice(1)
      args.splice(2, 1)
    }
    if (flags.includes('f')) full = true
    if (flags.includes('l')) {
      mode = args[2] == 'on' ? 1 : 0
    } else {
      mode = args[2] == 'on' ? 2 : 0
    }
    server = +args[1]
    if (mode == 2) {
      index.bots[server].tellraw('@a', JSON.stringify({
        text: `[${settings.name}] Whitelist enabled.`
      }))
    } else if (mode == 1) {
      index.bots[server].tellraw('@a', JSON.stringify({
        text: `[${settings.name}] Whitelist enabled (lockdown).`
      }))
    } else {
      index.bots[server].tellraw('@a', JSON.stringify({
        text: `[${settings.name}] Whitelist disabled.`
      }))
    }
    index.bots[server].whitelist_toggle(mode, full)
  },
  desc: 'Testing command',
  usage: ' [-fl] <on | off>',
  verify: true
}
