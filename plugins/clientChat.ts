const matcherRegex = /.{1,255}/g
export default function load (b) {
  b.clientChat = {}
  b._client.on('login', () => {
    b.interval.chatQueue = setInterval(() => {
      if (b.clientChat.chatqueue.length !== 0) {
        b._client.chat(b.clientChat.chatqueue[0])
        b.clientChat.chatqueue.splice(0, 1)
      }
    }, 100)
  })
  
  b.clientChat.chatqueue = []
  b.clientChat.send = function chat (...msgs: string[]) {
    for(const msg of msgs){
      if (msg.length === 0) return
      msg.match(matcherRegex)?.forEach(element => {
        b.clientChat.chatqueue.push(element)
      })
    }
  }
}
