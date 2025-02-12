import parse from '../util/chatparse_plain.js'
import parseNBT from '../util/parseNBT.js'

export default function load (b) {
  b.players = {}
  b._client.on('player_remove', (data) => {
    for (const item of data.players) {
      b.players[item].here = false
      b.emit('playerquit', item)
    }
  })
  b._client.on('player_info', (data) => {
    const buffer2 = {}
    for (const player of data.data) {
      let uuid
      if (player.uuid) {
        uuid = player.uuid
      } else if (player.UUID) {
        uuid = player.UUID
      }
      let displayName
      if (player.displayName !== undefined) {
        displayName = player.displayName
      } else {
        displayName = '{"text":"[[[[ No display name ]]]]"}'
      }
      if (player.player && player.player.name !== undefined) {
        buffer2[uuid] = { realName: player.player.name, displayName: parse(parseNBT(displayName)) }
      } else if (player.name !== undefined) {
        buffer2[uuid] = { realName: player.name, displayName: parse(parseNBT(displayName)) }
      } else if (player.displayName !== undefined) {
        buffer2[uuid] = { displayName: parse(parseNBT(displayName)) }
      }
    }
    for (const uuid in buffer2) {
      if (!b.players[uuid]) b.players[uuid] = { displayName: '', realName: '' }
      b.players[uuid].here = true
      let displayName = ''
      let realName = ''
      if (buffer2[uuid].displayName) {
        displayName = buffer2[uuid].displayName
        b.players[uuid].displayName = buffer2[uuid].displayName
      }
      if (buffer2[uuid].realName) {
        realName = buffer2[uuid].realName
        b.players[uuid].realName = buffer2[uuid].realName
      }
      b.emit('playerdata', uuid, displayName, realName)
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
    return '[[[[ no name ]]]]'
  }
  b.findRealNameFromUUID = (uuid) => {
    if (b.players[uuid]) {
      return b.players[uuid].realName
    } else {
      return uuid
    }
  }
  b.findDisplayName = (uuid) => {
    if (b.players[uuid]) {
      const displayName = b.players[uuid].displayName.split(' ')
      return displayName[displayName.length - 1]
    } else {
      return '[[[[ No display name ]]]]'
    }
  }
}
