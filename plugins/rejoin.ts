import { createBot } from '../index.js'
import Botv12Client from '../util/Botv12Client.js'
export default function load (b: Botv12Client) {
  b._client.on('end', () => {
    b.info(`Bot ${b.id} disconnected`)
    for (const i in b.interval) {
      clearInterval(b.interval[i])
    }
    if(!b.disconnect) setTimeout(() => {
      b.info(`Re-connecting bot ${b.id}`)
      createBot(b.host, b.id)
    }, 5000)
  })
}
