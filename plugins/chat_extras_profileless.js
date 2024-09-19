const parsePlain = require('../util/chatparse_plain.js')
module.exports = {
  load: (b) => {
    b.on("chat_unparsed", data => {
      if(data.type == "profileless"){
        if(data.parsed) return
        if (data.playerChatType.translation_key === '%s') {
          const parsed = parsePlain(data.json)
          const split = parsed.split(': ')
          const chatName = split.splice(0, 1)[0]
          const chatNameSplit = chatName.split(' ')
          nickname = chatNameSplit[chatNameSplit.length - 1]
          username = b.findRealName(chatName)
          uuid = b.findUUID(username)
          message = split.join(': ')
          b.emit('chat', {
            json: data.json,
            type: data.type,
            subtype: "extras_profileless",
            uuid,
            message,
            nickname,
            username
          })
        }
      }
    })
  }
}
