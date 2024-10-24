export default function load (b) {
  b._client.on('login', () => {
    b.interval.chatQueue = setInterval(() => {
      if (b.chatqueue.length !== 0) {
        b._client.chat(b.chatqueue[0])
        b.chatqueue.splice(0, 1)
      }
    }, 100)
  })
  b.matcherRegex = /.{1,255}/g
  b.chatqueue = []
  b.chat = function chat (msg) {
    if (msg.length === 0) return
    msg.match(b.matcherRegex).forEach(element => {
      b.chatqueue.push(element)
    })
  }
}
