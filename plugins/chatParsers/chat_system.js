const parsePlain = require('../../util/chatparse_plain.js')
module.exports = {
  parse: (data) => {
   
      if(data.type == "system" || data.type == "legacy"){
        if(data.parsed) return
        if (data.type == "legacy" && data.json.translate === 'chat.type.text') return
        let subtype = `generic_${data.type}`
        if(data.type == "legacy" && data.uuid) subtype += "_withuuid"
        const parsed = parsePlain(data.json)
        const split = parsed.split(': ')
        const chatName = split.splice(0, 1)[0]
        const chatNameSplit = chatName.split(' ')
        const nickname = chatNameSplit[chatNameSplit.length - 1]
        const username = b.findRealName(chatName)
        const uuid = b.findUUID(username)
        b.emit('chat', {
          json: data.json,
          type: data.type,
          subtype,
          uuid: uuid,
          message: split.join(': '),
          nickname: nickname,
          username: username
        })
      }
    
  }
}
