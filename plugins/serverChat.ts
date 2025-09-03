import settings from '../settings.js'
import parse3 from '../util/chatparse.ts'
import parse1204 from '../util/parseNBT.ts'
import { getMessage } from '../util/lang.js'
import { readdirSync } from 'node:fs'
import UBotClient from '../util/UBotClient.ts'
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

// Level 0: highly specific parsers for certain players
// Level 1: server chat format parsers
// Level 2: generic parsers

const parsers = [[], [], []]
/*const bpl = readdirSync('chatParsers')
for (const plugin of bpl) {
  if (!plugin.endsWith('.js')) {
    continue
  }
  try {
    import(`../chatParsers/${plugin}`).then((pluginItem) => {
      parsers[pluginItem.priority].push(pluginItem.parse)
    })
  } catch (e) { console.log(e) }
}*/

export default function load (b: UBotClient) {
  b.serverChat = {}
  b.serverChat.messageCount = 0
  b.serverChat.disabledUntil = 0
  b.serverChat.messageTypes = []
  b.interval.antiSpam = setInterval(() => {
    b.serverChat.messageCount = 0
  }, 4000)
  b._client.on('registry_data', (data) => {
    if (data.codec && data.codec.value['minecraft:chat_type']) {
      const nbtItems = data.codec.value['minecraft:chat_type'].value.value.value.value
      nbtItems.forEach((item, i) => {
        b.serverChat.messageTypes[i] = convertChatTypeItem(item.element.value.chat.value)
      })
    } else if (data.entries && data.id === 'minecraft:chat_type') {
      data.entries.forEach((item, i) => {
        b.serverChat.messageTypes[i] = convertChatTypeItem(data.entries[i].value.value.chat.value)
      })
    }
  })
  b._client.on('profileless_chat', (data) => {
    let messageType
    if (data.type.registryIndex) {
      messageType = b.serverChat.messageTypes[data.type.registryIndex - 1]
    } else if (data.type.chatType) {
      messageType = b.serverChat.messageTypes[data.type.chatType]
    } else {
      messageType = b.serverChat.messageTypes[data.type]
    }
    if (messageType === undefined) messageType = { translation_key: '%s', parameters: ['content'] }
    const json: any = { translate: messageType.translation_key, with: [] }
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
    const message = parse3(parse1204(data.message), 'none')
    const uuid = '00000000-0000-0000-0000-000000000000' //b.findUUID(parse3(parse1204(data.name), 'none'))
    const nickname = '' //b.findDisplayName(uuid)
    const username = parse3(parse1204(data.name), 'none')
    b.emit('chat_unparsed', {
      json,
      type: 'profileless',
      uuid,
      message,
      nickname,
      username,
      playerChatType: messageType
    })
  })

  b._client.on('player_chat', (data) => {
    let messageType
    if (data.type.registryIndex) {
      messageType = b.serverChat.messageTypes[data.type.registryIndex - 1]
    } else if (data.type.chatType) {
      messageType = b.serverChat.messageTypes[data.type.chatType]
    } else {
      messageType = b.serverChat.messageTypes[data.type]
    }
    if (messageType === undefined) messageType = { translation_key: '%s', parameters: ['content'] }
    const json: any = { translate: messageType.translation_key, with: [] }
    messageType.parameters.forEach((item, i) => {
      if (item === 'content') {
        if (messageType.translation_key === '%s') {
          if (!data.unsignedChatContent) json.with[i] = ''
          else json.with[i] = parse1204(data.unsignedChatContent)
        } else {
          json.with[i] = data.plainMessage
        }
      } else if (item === 'sender') {
        json.with[i] = parse1204(data.networkName)
      } else if (item === 'target' && data.networkTargetName) {
        json.with[i] = parse1204(data.networkTargetName)
      }
    })
    for (const i in messageType.style) {
      json[i] = messageType.style[i]
    }
    b.emit('chat_unparsed', {
      json,
      type: 'player',
      uuid: data.senderUuid,
      message: data.plainMessage,
      nickname: parse3(parse1204(data.networkName), 'none'),
      username: '', //b.findRealNameFromUUID(data.senderUuid),
      playerChatType: messageType
    })
  })

  b._client.on('system_chat', (data) => {
    const json = parse1204(data.content)
    b.emit('chat_unparsed', {
      json,
      type: 'system',
      uuid: '00000000-0000-0000-0000-000000000000',
      message: '',
      nickname: '',
      username: '',
      playerChatType: {}
    })
  })

  b.on('chat_unparsed', (data) => {
    /*for (const lvl of parsers) {
      for (const item of lvl) {
        const output = item(data, b)
        if (output.parsed) {
          b.emit('chat', output)
          return
        }
      }
    }*/
    b.emit('chat', {
      parsed: true,
      json: data.json,
      type: data.type,
      subtype: 'fallback',
      uuid: '00000000-0000-0000-0000-000000000000',
      message: '',
      nickname: '',
      username: ''
    })
  })

  b.on('chat', (data) => {
    if (data.json.translate === 'advMode.setCommand.success') return
    if (Date.now() < b.serverChat.disabledUntil) return
    const msgConsole = parse3(data.json, settings.terminalMode)
    const msgPlain = parse3(data.json, 'none')
    if (settings.logJSONmessages) console.log(data.json)
    if (msgPlain.endsWith('\n\n\n\n\nThe chat has been cleared')) return

    b.serverChat.messageCount++
    if (b.serverChat.messageCount >= 100) {
      b.info(getMessage(settings.defaultLang, 'chat.antiSpamTriggered'))
      b.serverChat.disabledUntil = Date.now() + 20000
      return
    }
    b.emit('plainchat', msgPlain, data.type, data.subtype)
    b.displayChat(data.type, data.subtype, `${msgConsole}\x1b[0m`)
  })
}
