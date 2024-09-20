module.exports = {
  parse: (data, b) => {
    if (data.type === 'player' || data.type === 'profileless') {
      return {
        parsed: true,
        json: data.json,
        type: data.type,
        subtype: `generic_${data.type}`,
        uuid: data.uuid,
        message: data.message,
        nickname: data.nickname,
        username: data.username
      }
    }
    return {
      parsed: false
    }
  },
  priority: 2
}
