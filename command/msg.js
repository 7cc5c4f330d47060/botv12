const index = require('../index.js')
module.exports = {
  command_b: function (b, msg) {
    b.message(msg.split(' ').slice(1).join(' '))
  },
  command_c: function (msg) {
    if (msg.split(' ')[1] === '*') {
      for (let i = 0; i < index.bots.length; i++) {
        if (index.bots[i].real) index.bots[i].message(msg.split(' ').slice(2).join(' '))
      }
    } else {
      index.bots[+(msg.split(' ')[1])].message(msg.split(' ').slice(2).join(' '))
    }
  },
  desc: 'Send a bot announcement message',
  usage: ' <botid | *> <message>'
}
