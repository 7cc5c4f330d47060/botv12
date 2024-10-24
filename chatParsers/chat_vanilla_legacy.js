import { default as parsePlain } from '../util/chatparse_plain.js'

const priority = 1
const parse = (data, b) => {
  if (data.type === 'legacy') {
    let subtype = 'vanilla_legacy'
    if (data.type === 'legacy' && data.uuid) subtype += '_withuuid'
    if (data.json.translate === 'chat.type.text') { // Servers without Extras chat
      let message
      let username
      if (data.json.with && data.json.with.length >= 2) {
        message = parsePlain(data.json.with[1])
        username = parsePlain(data.json.with[0])
      }
      const uuid = b.findUUID(username)
      const nickname = b.findDisplayName(uuid)
      return {
        parsed: true,
        json: data.json,
        type: data.type,
        subtype,
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