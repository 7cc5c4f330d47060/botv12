const parse = require('../util/chatparse.js')
const parse1204 = require('../util/chatparse_1204.js')
module.exports = {
  load: (b) => {
    b.players = {}
    b._client.on('player_info', (data) => {
      const buffer2 = {}
      for (const i in data.data) {
        let uuid
        if (data.data[i].uuid) {
          uuid = data.data[i].uuid
        } else if (data.data[i].UUID) {
          uuid = data.data[i].UUID
        }
        if (data.data[i].player && data.data[i].player.name !== undefined) {
          buffer2[uuid] = { realName: data.data[i].player.name, displayName: parse(parse1204(data.data[i].displayName))[1] }
        } else if (data.data[i].name !== undefined) {
          buffer2[uuid] = { realName: data.data[i].name, displayName: parse(parse1204(data.data[i].displayName))[1] }
        } else if (data.data[i].displayName !== undefined) {
          buffer2[uuid] = { displayName: parse(parse1204(data.data[i].displayName))[1] }
        }
      }
      for (const uuid in buffer2) {
        if (!b.players[uuid]) b.players[uuid] = { displayName: '', realName: '' }
        if (buffer2[uuid].displayName) b.players[uuid].displayName = buffer2[uuid].displayName
        if (buffer2[uuid].realName) b.players[uuid].realName = buffer2[uuid].realName
      }
    })
    b.findUUID = (name) => {
      for (const i in b.players) {
        if (b.players[i].realName === name) {
          return i
        }
      }
      return '00000000-0000-0000-0000-000000000000'
    }
    b.findRealName = (name) => {
      for (const i in b.players) {
        if (b.players[i].displayName === name) {
          return b.players[i].realName
        }
      }
      return 'Geometrical Dominator'
    }
  }
}
