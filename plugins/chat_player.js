module.exports = {
  load: (b) => {
    b.on("chat_unparsed", data => {
      if(data.type == "player" || data.type == "profileless"){
        if(data.parsed) return
        if (data.type == "profileless" && data.playerChatType.translation_key === '%s') return
        b.emit('chat', {
          json: data.json,
          type: data.type,
          subtype: `generic_${data.type}`,
          uuid: data.uuid,
          message: data.message,
          nickname: data.nickname,
          username: data.username
        })
      }
    })
  }
}
