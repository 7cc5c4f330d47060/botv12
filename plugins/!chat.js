const settings = require('../settings.json')
const parsePlain = require('../util/chatparse_plain.js')
const parseConsole = require('../util/chatparse_console.js')
const parse1204 = require('../util/parseNBT.js')
const { getMessage } = require('../util/lang.js')
const convertChatStyleItem = (item) => {
  const output = {}
  for (const i in item) {
    output[i] = item[i].value
  }
  return output
}
const convertChatTypeItem = (item) => {
  if (item.style) {
    return {
      translation_key: item.translation_key.value,
      parameters: item.parameters.value.value,
      style: convertChatStyleItem(item.style.value)
    }
  } else {
    return {
      translation_key: item.translation_key.value,
      parameters: item.parameters.value.value,
      style: {}
    }
  }
}
module.exports = {
  load: (b) => {
    b.messageCount = 0;
    b.chatDisabledUntil = 0;
    b.interval.antiSpam = setInterval(()=>{
      b.messageCount = 0;
    }, 4000)
    b.messageTypes = []
    b._client.on('registry_data', (data) => {
      if (data.codec.value['minecraft:chat_type']) {
        b.messageTypes = data.codec.value['minecraft:chat_type']
        const nbtItems = data.codec.value['minecraft:chat_type'].value.value.value.value
        nbtItems.forEach((item, i) => {
          b.messageTypes[i] = convertChatTypeItem(item.element.value.chat.value)
        })
      }
    })
    b._client.on('profileless_chat', (data) => {
      const messageType = b.messageTypes[data.type]
      const json = { translate: messageType.translation_key, with: [] }
      messageType.parameters.forEach((item, i) => {
        if (item === 'content') {
          json.with[i] = parse1204(data.message)
        } else if (item === 'sender') {
          json.with[i] = parse1204(data.name)
        } else if (item === 'target') {
          json.with[i] = parse1204(data.target)
        }
      })
      for (const i in messageType.style) {
        json[i] = messageType.style[i]
      }
      let username = ''
      let nickname = ''
      let uuid = '00000000-0000-0000-0000-000000000000'
      let message = ''
      if (messageType.translation_key === '%s') {
        const parsed = parsePlain(json)
        const split = parsed.split(': ')
        const chatName = split.splice(0, 1)[0]
        const chatNameSplit = chatName.split(' ')
        nickname = chatNameSplit[chatNameSplit.length - 1]
        username = b.findRealName(chatName)
        uuid = b.findUUID(username)
        message = split.join(': ')
      } else {
        message = parsePlain(parse1204(data.message))
        uuid = b.findUUID(parsePlain(parse1204(data.name)))
        nickname = b.findDisplayName(uuid)
        username = parsePlain(parse1204(data.name))
      }
      b.emit('chat', {
        json,
        type: 'profileless',
        uuid,
        message,
        nickname,
        username
      })
    })

    b._client.on('player_chat', (data) => {
      const messageType = b.messageTypes[data.type]
      const json = { translate: messageType.translation_key, with: [] }
      messageType.parameters.forEach((item, i) => {
        if (item === 'content') {
          if (messageType.translation_key === '%s') {
            json.with[i] = parse1204(data.unsignedChatContent)
          } else {
            json.with[i] = data.plainMessage
          }
        } else if (item === 'sender') {
          json.with[i] = parse1204(data.networkName)
        } else if (item === 'target') {
          json.with[i] = parse1204(data.networkTargetName)
        }
      })
      for (const i in messageType.style) {
        json[i] = messageType.style[i]
      }
      b.emit('chat', {
        json,
        type: 'player',
        uuid: data.senderUuid,
        message: data.plainMessage,
        nickname: parsePlain(parse1204(data.networkName)),
        username: b.findRealNameFromUUID(data.senderUuid)
      })
    })

    b._client.on('system_chat', (data) => {
      const json = parse1204(data.content)
      const parsed = parsePlain(json)
      const split = parsed.split(': ')
      const chatName = split.splice(0, 1)[0]
      const chatNameSplit = chatName.split(' ')
      const nickname = chatNameSplit[chatNameSplit.length - 1]
      const username = b.findRealName(chatName)
      const uuid = b.findUUID(username)
      b.emit('chat', {
        json,
        type: 'system',
        uuid,
        message: split.join(': '),
        nickname,
        username
      })
    })

    b._client.on('chat', (data) => { // Legacy chat for versions <1.19
      const json = parse1204(data.message)
      const parsed = parsePlain(json)
      let chatName
      let nickname
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
        const chatNameSplit = chatName.split(' ')
        nickname = chatNameSplit[chatNameSplit.length - 1]
        username = b.findRealName(chatName)
        uuid = b.findUUID(username)
        message = split.join(': ')
      }
      if (data.uuid) uuid = data.uuid
      b.emit('chat', {
        json,
        type: 'legacy',
        uuid,
        message,
        nickname,
        username
      })
    })

    b.on('chat', (data) => {
      b.messageCount++;
      if(Date.now() < b.chatDisabledUntil) return
      if(b.messageCount >= 100){
        b.info(getMessage(settings.defaultLang, "chat.antiSpamTriggered"))
        b.chatDisabledUntil = Date.now() + 30000
        return
      }
      const msgConsole = parseConsole(data.json)
      const msgPlain = parsePlain(data.json)
      if (settings.logJSONmessages) console.log(data.json)
      if (msgPlain.endsWith('\n\n\n\n\nThe chat has been cleared')) return
      if (msgPlain.startsWith('Command set: ')) return
      b.emit('plainchat', msgPlain, data.type)
      b.displayChat(data.type, `${msgConsole}\x1b[0m`)
    })
  }
}
