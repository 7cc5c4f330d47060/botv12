const console2 = require('./console.js')
const parse = require('../util/chatparse.js')
const parse1204 = require('../util/chatparse_1204.js')
const messageTypes = [
  '',
  'chat.type.emote',
  'commands.message.display.incoming',
  '',
  '',
  'chat.type.announcement',
  '',
  ''
]
module.exports = {
  load: (b) => {
    b._client.on('profileless_chat', (data) => {
      if (data.type === 4) {
        const json = parse1204(data.message)
        const parsed = parse(json)[1]
        const split = parsed.split(': ')
        const chatName = split.splice(0, 1)[0]
        const username = b.findRealName(chatName)
        const uuid = b.findUUID(username)
        b.emit('chat', { json, type: 'profileless', uuid, message: split.join(': '), username })
      } else {
        b.emit('chat', {
          json: {
            translate: messageTypes[data.type],
            color: data.type === 2 ? 'gray' : 'reset',
            with: [
              parse1204(data.name),
              parse1204(data.message)
            ]
          },
          type: 'profileless',
          uuid: '00000000-0000-0000-0000-000000000000',
          message: parse(parse1204(data.message))[1],
          username: parse(parse1204(data.name))[1]
        })
      }
    })

    b._client.on('player_chat', (data) => {
      if (data.type === 4) {
        b.emit('chat', { json: parse1204(data.unsignedChatContent), type: 'player', uuid: data.senderUuid, message: data.plainMessage, username: parse(parse1204(data.networkName))[1] })
      } else {
        b.emit('chat', {
          json: {
            translate: messageTypes[data.type],
            color: data.type === 2 ? 'gray' : 'reset',
            with: [
              parse1204(data.networkName),
              data.plainMessage
            ]
          },
          type: 'player',
          uuid: data.senderUuid,
          message: parse(data.plainMessage)[1],
          username: parse(parse1204(data.networkName))[1]
        })
      }
    })
    b._client.on('system_chat', (data) => {
      const json = parse1204(data.content)
      const parsed = parse(json)[1]
      const split = parsed.split(': ')
      const chatName = split.splice(0, 1)[0]
      const username = b.findRealName(chatName)
      const uuid = b.findUUID(username)
      b.emit('chat', { json, type: 'system', uuid, message: split.join(': '), username })
    })
    b._client.on('chat', (data) => { // Legacy chat
      const json = parse1204(data.message)
      const parsed = parse(json)[1]
      const split = parsed.split(': ')
      const chatName = split.splice(0, 1)[0]
      const username = b.findRealName(chatName)
      const uuid = b.findUUID(username)
      b.emit('chat', { json, type: 'legacy', uuid: data.uuid ? data.uuid : uuid, message: split.join(': '), username })
    })
    b.on('chat', (data) => {
      const msg = parse(data.json)
      if (msg[1].endsWith('\n\n\n\n\nThe chat has been cleared')) return
      if (msg[1].startsWith('Command set: ')) return
      b.emit('plainchat', msg[1])
      console2.write(`[${b.id}] [${data.type}] ${msg[0]}\x1b[0m`)
      const fullCommand = data.message

      for (const i in b.prefix) {
        if (fullCommand.startsWith(b.prefix[i])) {
          const command = fullCommand.slice(b.prefix[i].length)
          b.runCommand(data.username, data.uuid, command, b.prefix[i])
        }
      }
    })
  },
  parse
}
