// Copied from U6
const index = require('../index.js')
module.exports = {
  description: 'Rejoin on leave',
  load: function () {},
  load2: (b) => {
    b.reconnect = true
    b.on('end', () => {
      if (!b.reconnect) return
      clearInterval(b.cqi)
      clearInterval(b.fi)
      clearInterval(b.di)
      clearInterval(b.kickqueuei)
      if (!b.o.partial_op && !b.o.deop) {
        clearInterval(b.ccqi)
        clearInterval(b.cfqi)
      }
      if (b.cloops) {
        for (const i in b.cloops) {
          clearInterval(b.cloops[i].interval)
        }
      }
      setTimeout(() => {
        let dr
        if (b.discordReady) dr = 1
        index.bots[b.id] = index.createBot(b.host, b.port, b.o)
        global.loadplug(b.id)
        index.bots[b.id].id = b.id
        index.bots[b.id].whitelist = b.whitelist
        if (dr) {
          index.bots[b.id].emit('dr')
        }
        index.bots[b.id].discordReady = dr
      }, 5000)
    })
  }
}
