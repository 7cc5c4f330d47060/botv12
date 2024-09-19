const parsePlain = require('../util/chatparse_plain.js')
module.exports = {
  load: (b) => {
    b.on("chat_unparsed", data => {
      if(data.type == "system" || data.type == "legacy"){
        if(data.parsed) return
        if (data.json.extra && data.json.extra[4] && data.json.extra[3] && data.json.extra[5] && data.json.extra[4].text === ' » ') { // ChipmunkMod format - m_c_player
          const username = parsePlain(data.json.extra[3])
          const uuid = b.findUUID(username)
          const nickname = b.findDisplayName(uuid)
          const message = parsePlain(data.json.extra[5])
          b.emit('chat', {
            json,
            type: data.type,
            subtype: `chipmunkmod_mcp_${data.type}`.
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
