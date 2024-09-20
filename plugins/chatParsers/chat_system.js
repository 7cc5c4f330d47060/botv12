const parsePlain = require('../../util/chatparse_plain.js')
module.exports = {
  parse: (data, b) => {
    if (data.type === 'system' || data.type === 'legacy') {
      let subtype = `generic_system`
      if (data.type === 'legacy' && data.uuid) subtype += '_withuuid'
      const parsed = parsePlain(data.json)
      const split = parsed.split(': ')
      const chatName = split.splice(0, 1)[0]
      const chatNameSplit = chatName.split(' ')
      const nickname = chatNameSplit[chatNameSplit.length - 1]
      const username = b.findRealName(chatName)
      const uuid = b.findUUID(username)
      return {
        parsed: true,
        json: data.json,
        type: data.type,
        subtype,
        uuid,
        message: split.join(': '),
        nickname,
        username
      }
    }
    return {
      parsed: false
    }
  },
  priority: 2
}
