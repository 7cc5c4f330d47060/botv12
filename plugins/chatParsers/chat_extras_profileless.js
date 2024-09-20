const parsePlain = require('../../util/chatparse_plain.js')
module.exports = {
  parse: (data, b) => {
    if (data.type === 'profileless') {
      if (data.parsed) return
      if (data.playerChatType.translation_key === '%s') {
        const parsed = parsePlain(data.json)
        const split = parsed.split(': ')
        const chatName = split.splice(0, 1)[0]
        const chatNameSplit = chatName.split(' ')
        const nickname = chatNameSplit[chatNameSplit.length - 1]
        const username = b.findRealName(chatName)
        const uuid = b.findUUID(username)
        const message = split.join(': ')
        b.emit('chat', {
          json: data.json,
          type: data.type,
          subtype: 'extras_profileless',
          uuid,
          message,
          nickname,
          username
        })
      }
    }
  }
}
