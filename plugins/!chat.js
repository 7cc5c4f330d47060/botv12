const settings = require('../settings.json')
const console2 = require('./console.js')
const parsePlain = require('../util/chatparse_plain.js')
const parseConsole = require('../util/chatparse_console.js')
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
        const parsed = parsePlain(json)
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
          message: parsePlain(parse1204(data.message)),
          username: parsePlain(parse1204(data.name))
        })
      }
    })

    b._client.on('player_chat', (data) => {
      if (data.type === 4) {
        b.emit('chat', { json: parse1204(data.unsignedChatContent), type: 'player', uuid: data.senderUuid, message: data.plainMessage, username: parsePlain(parse1204(data.networkName)) })
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
          message: parsePlain(data.plainMessage),
          username: parsePlain(parse1204(data.networkName))
        })
      }
    })
    b._client.on('system_chat', (data) => {
      const json = parse1204(data.content)
      const parsed = parsePlain(json)
      const split = parsed.split(': ')
      const chatName = split.splice(0, 1)[0]
      const username = b.findRealName(chatName)
      const uuid = b.findUUID(username)
      b.emit('chat', { json, type: 'system', uuid, message: split.join(': '), username })
    })
    b._client.on('chat', (data) => { // Legacy chat
      const json = parse1204(data.message)
      const parsed = parsePlain(json)
      let chatName
      let username
      let message;
      let uuid;
      if(b.host.options.isVanilla && json.translate === "chat.type.text"){ // Servers without Extras chat
        message = parsePlain(json.with[1]);
        username = parsePlain(json.with[0]);
        uuid = b.findUUID(username);
      } else { // Servers with Extras chat, such as Kaboom
        const split = parsed.split(': ')
        message = split.join(': ')
        uuid = b.findUUID(username)
        chatName = split.splice(0, 1)[0]
        username = b.findRealName(chatName)
      }
      b.emit('chat', { json, type: 'legacy', uuid: data.uuid ? data.uuid : uuid, message, username })
    })
    b.on('chat', (data) => {
      const msgConsole = parseConsole(data.json)
      const msgPlain = parsePlain(data.json)
      if(settings.logJSONmessages) console.log(data.json)
      if (msgPlain.endsWith('\n\n\n\n\nThe chat has been cleared')) return
      if (msgPlain.startsWith('Command set: ')) return
      b.emit('plainchat', msgPlain)
      b.displayChat(data.type,`${msgConsole}\x1b[0m`)

      const fullCommand = data.message
      for (const i in b.prefix) {
        if (fullCommand.startsWith(b.prefix[i])) {
          const command = fullCommand.slice(b.prefix[i].length)
          b.runCommand(data.username, data.uuid, command, b.prefix[i])
        }
      }
    })
  }
}
