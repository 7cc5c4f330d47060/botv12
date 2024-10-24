import { default as parsePlain } from '../util/chatparse_plain.js'

const priority = 1
const parse = (data, b) => {
  if (data.type === 'profileless') {
    if (data.playerChatType.translation_key === '%s') {
      const parsed = parsePlain(data.json)
      const split = parsed.split(': ')
      const chatName = split.splice(0, 1)[0]
      const chatNameSplit = chatName.split(' ')
      const nickname = chatNameSplit[chatNameSplit.length - 1]
      const username = b.findRealName(chatName)
      const uuid = b.findUUID(username)
      const message = split.join(': ')
      return {
        parsed: true,
        json: data.json,
        type: data.type,
        subtype: 'extras_profileless',
        uuid,
        message,
        nickname,
        username
      }
    }
  }
  return {
    parsed: false
  }
}
export { priority, parse }