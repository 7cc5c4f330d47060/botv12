const parsePlain = require('../../util/chatparse_plain.js')
module.exports = {
  parse: (data) => {
      if(data.type == "legacy"){
        if(data.parsed) return
        let subtype = `vanilla_${data.type}`
        if(data.type == "legacy" && data.uuid) subtype += "_withuuid"
        if (data.json.translate === 'chat.type.text') { // Servers without Extras chat
          let message;
          let username;
          let uuid;
          let nickname;
          if (data.json.with && data.json.with.length >= 2) {
            message = parsePlain(data.json.with[1])
            username = parsePlain(data.json.with[0])
          }
          uuid = b.findUUID(username)
          nickname = b.findDisplayName(uuid)
          b.emit('chat', {
            json: data.json,
            type: data.type,
            subtype: subtype,
            uuid,
            message,
            nickname,
            username
          })
        }
      }
  }
}
