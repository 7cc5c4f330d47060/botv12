import { createBot } from "../index.js"
const load = (b) => {
  b._client.on('end', () => {
    b.info(`Bot ${b.id} disconnected`)
    for (const i in b.interval) {
      clearInterval(b.interval[i])
    }
    setTimeout(() => {
      b.info(`Re-connecting bot ${b.id}`)
      createBot(b.host, b.id)
    }, 5000)
  })
}
export { load }