const settings = require('../settings.json')
module.exports = {
  command_b: function (b, msg, sender, username) {
    const args = msg.split(' ')
    const original_pos = {
      x: Math.floor(Math.random() * 2000000) - 1000000,
      y: 100,
      z: Math.floor(Math.random() * 2000000) - 1000000
    }
    if (args[1] != '-s' && args[1] != '--silent') {
      b.tellraw('@a', JSON.stringify(
        {
          translate: 'Teleporting %s to %s, %s, %s',
          color: settings.colors.secondary,
          with: [
            {
              text: username,
              color: settings.colors.primary
            },
            {
              text: original_pos.x.toString(),
              color: settings.colors.primary
            },
            {
              text: original_pos.y.toString(),
              color: settings.colors.primary
            },
            {
              text: original_pos.z.toString(),
              color: settings.colors.primary
            }
          ]
        }
      ))
    }
    if (b.o.cc_enabled) {
      b.ccq.push('/tp ' + sender + ' ' + original_pos.x + '.0 ' + original_pos.y + ' ' + original_pos.z + '.0')
    } else {
      b.send('/tp ' + sender + ' ' + original_pos.x + '.0 ' + original_pos.y + ' ' + original_pos.z + '.0')
    }
  },
  command_c: function () {
    // nothing
  },
  desc: 'Teleport to a random location',
  usage: ' [-s]',
  aliases: ['rtp']
}
