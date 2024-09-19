const parsePlain = require('../util/chatparse_plain.js')
module.exports = {
  load: (b) => {
    b.on("chat_unparsed", data => {
      if(data.type == "system" || data.type == "legacy"){
        if(data.parsed) return
        if (data.json.translate === '%s %s › %s' || data.json.translate === '[%s] %s › %s') {
          let subtype = 'chipmunkmod_';
          if(data.json.translate === '%s %s › %s'){
            subtype += 'name3_'
          } else if(data.json.translate === '[%s] %s › %s'){
            subtype += 'chomens_'
          } 
          subtype += `${data.type}`
          if (data.json.with && data.json.with[1] && data.json.with[2]) {
            const username = parsePlain(data.json.with[1])
            const uuid = b.findUUID(username)
            const nickname = b.findDisplayName(uuid)
            const message = parsePlain(data.json.with[2].extra)
            data.parsed = true
            b.emit('chat', {
              json: data.json,
              type: data.type,
              subtype: subtype,
              uuid,
              message,
              nickname,
              username
            })
          } else {
            subtype += "_invalid"
            b.emit('chat', {
              json: data.json,
              type: data.type,
              subtype: subtype,
              uuid: '00000000-0000-0000-0000-000000000000',
              message: '',
              nickname: '',
              username: ''
            })
            data.parsed = true
          }
        }
      }
    })
  }
}
