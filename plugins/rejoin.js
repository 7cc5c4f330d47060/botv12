const index = require('../index.js')
module.exports = {
  load: () => {
  },
  loadBot: (b) => {
    b._client.on('end', () => {
      b.info('bot ' + b.id + ' disconnected')
      for (const i in b.interval) {
        clearInterval(b.interval[i])
      }
      setTimeout(() => {
        b.info('Re-connecting bot ' + b.id)
        index.createBot(b.host, b.id)
      }, 5000)
    })
  }
}
