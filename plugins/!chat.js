const settings = require('../settings.json')
const parsePlain = require('../util/chatparse_plain.js')
const parseConsole = require('../util/chatparse_console.js')
const parse1204 = require('../util/parseNBT.js')
const messageTypes = [
  '',
  'chat.type.emote',
  'commands.message.display.incoming',
  'commands.message.display.outgoing',
  '',
  'chat.type.announcement',
  'chat.type.team.text',
  'chat.type.team.sent'
]
module.exports = {
  load: (b) => {
    b._client.on('profileless_chat', (data) => {
      if (data.type === 4) {
        const json = parse1204(data.message)
        const parsed = parsePlain(json)
        const split = parsed.split(': ')
        const chatName = split.splice(0, 1)[0]
        const chatNameSplit = chatName.split(" ");
        const nickname = chatNameSplit[chatNameSplit.length-1]
        const username = b.findRealName(chatName)
        const uuid = b.findUUID(username)
        b.emit('chat', {
          json,
          type: 'profileless',
          uuid,
          message: split.join(': '),
          nickname,
          username
        })
      } else if (data.type === 6 || data.type === 7) {
        const uuid = b.findUUID(parsePlain(parse1204(data.name)))
        const nickname = b.findDisplayName(uuid)
        console.log(uuid)
        b.emit('chat', {
          json: {
            translate: messageTypes[data.type],
            color: (data.type === 2 || data.type === 3) ? 'gray' : 'reset',
            with: [
              parse1204(data.target),
              parse1204(data.name),
              data.message
            ]
          },
          type: 'profileless',
          uuid,
          message: parsePlain(data.message),
          nickname,
          username: parsePlain(parse1204(data.name))
        })
      } else {
        const uuid = b.findUUID(parsePlain(parse1204(data.name)))
        const nickname = b.findDisplayName(uuid)
        b.emit('chat', {
          json: {
            translate: messageTypes[data.type],
            color: (data.type === 2 || data.type === 3) ? 'gray' : 'reset',
            with: [
              parse1204(data.name),
              parse1204(data.message)
            ]
          },
          type: 'profileless',
          uuid,
          message: parsePlain(parse1204(data.message)),
          nickname,
          username: parsePlain(parse1204(data.name))
        })
      }
    })

    b._client.on('player_chat', (data) => {
      console.log(parsePlain(parse1204(data.networkName)))
      if (data.type === 4) {
        b.emit('chat', {
          json: parse1204(data.unsignedChatContent),
          type: 'player', uuid: data.senderUuid,
          message: data.plainMessage,
          nickname: parsePlain(parse1204(data.networkName)),
          username: b.findRealNameFromUUID(data.senderUuid)
        })
      } else if (data.type === 6 || data.type === 7) {
        b.emit('chat', {
          json: {
            translate: messageTypes[data.type],
            color: data.type === 2 ? 'gray' : 'reset',
            with: [
              parse1204(data.networkTargetName),
              parse1204(data.networkName),
              data.plainMessage
            ]
          },
          type: 'player',
          uuid: data.senderUuid,
          message: parsePlain(data.plainMessage),
          nickname: parsePlain(parse1204(data.networkName)),
          username: b.findRealNameFromUUID(data.senderUuid)
        })
      } else {
        b.emit('chat', {
          json: {
            translate: messageTypes[data.type],
            color: (data.type === 2 || data.type === 3) ? 'gray' : 'reset',
            with: [
              parse1204(data.networkName),
              data.plainMessage
            ]
          },
          type: 'player',
          uuid: data.senderUuid,
          message: parsePlain(data.plainMessage),
          nickname: parsePlain(parse1204(data.networkName)),
          username: b.findRealNameFromUUID(data.senderUuid)
        })
      }
    })

    b._client.on('system_chat', (data) => {
      const json = parse1204(data.content)
      const parsed = parsePlain(json)
      const split = parsed.split(': ')
      const chatName = split.splice(0, 1)[0]
      const chatNameSplit = chatName.split(" ");
      const nickname = chatNameSplit[chatNameSplit.length-1]
      const username = b.findRealName(chatName)
      const uuid = b.findUUID(username)
      b.emit('chat', {
        json,
        type: 'system',
        uuid, message: split.join(': '),
        nickname,
        username
      })
    })

    b._client.on('chat', (data) => { // Legacy chat
      const json = parse1204(data.message)
      const parsed = parsePlain(json)
      let chatName
      let username
      let message
      let uuid
      if (b.host.options.isVanilla && json.translate === 'chat.type.text') { // Servers without Extras chat
        if (json.with && json.with.length >= 2) {
          message = parsePlain(json.with[1])
          username = parsePlain(json.with[0])
        }
        uuid = b.findUUID(username)
      } else { // Servers with Extras chat, such as Kaboom
        const split = parsed.split(': ')
        chatName = split.splice(0, 1)[0]
        username = b.findRealName(chatName)
        uuid = b.findUUID(username)
        message = split.join(': ')
      }
      b.emit('chat', { json, type: 'legacy', uuid: data.uuid ? data.uuid : uuid, message, username })
    })

    b.on('chat', (data) => {
      const msgConsole = parseConsole(data.json)
      const msgPlain = parsePlain(data.json)
      if (settings.logJSONmessages) console.log(data.json)
      if (msgPlain.endsWith('\n\n\n\n\nThe chat has been cleared')) return
      if (msgPlain.startsWith('Command set: ')) return
      b.emit('plainchat', msgPlain, data.type)
      b.displayChat(data.type, `${msgConsole}\x1b[0m`)

      const fullCommand = data.message
      for (const i in b.prefix) {
        if (fullCommand.startsWith(b.prefix[i])) {
          const command = fullCommand.slice(b.prefix[i].length)
          b.runCommand(data.username, data.nickname, data.uuid, command, b.prefix[i])
        }
      }
    })
  }
}
