import parse3 from '../util/chatparse.js'
import parseNBT from '../util/parseNBT.js'
import Botv12Client from '../util/Botv12Client.js'

export default function load (b: Botv12Client) {
  b.playerInfo = {}
  b.playerInfo.players = {}
  b._client.on('player_remove', async function (data) {
    for (const item of data.players) {
      if (!b.playerInfo.players[item]) continue
      delete b.playerInfo.players[item]
      b.emit('playerquit', item)
    }
  })
  b._client.on('player_info', async function (data) {
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
        buffer2[uuid] = { realName: player.player.name, displayName: parse3(parseNBT(displayName), 'none') }
      } else if (player.name !== undefined) {
        buffer2[uuid] = { realName: player.name, displayName: parse3(parseNBT(displayName), 'none') }
      } else if (player.displayName !== undefined) {
        buffer2[uuid] = { displayName: parse3(parseNBT(displayName), 'none') }
      }
    }
    for (const uuid in buffer2) {
      if (!b.playerInfo.players[uuid]) b.playerInfo.players[uuid] = { displayName: '', realName: '' }
      b.playerInfo.players[uuid].here = true
      let displayName = ''
      let realName = ''
      if (buffer2[uuid].displayName) {
        displayName = buffer2[uuid].displayName
        b.playerInfo.players[uuid].displayName = buffer2[uuid].displayName
      }
      if (buffer2[uuid].realName) {
        realName = buffer2[uuid].realName
        b.playerInfo.players[uuid].realName = buffer2[uuid].realName
      }
      b.emit('playerdata', uuid, displayName, realName)
    }
  })

  b.playerInfo.findUUID = name => {
    for (const i in b.playerInfo.players) {
      if (b.playerInfo.players[i].realName === name) {
        return i
      }
    }
    return '00000000-0000-0000-0000-000000000000'
  }
  b.playerInfo.findRealName = name => {
    for (const i in b.playerInfo.players) {
      if (b.playerInfo.players[i].displayName === name) {
        return b.playerInfo.players[i].realName
      }
    }
    return '[[[[ no name ]]]]'
  }
  b.playerInfo.findRealNameFromUUID = uuid => {
    if (b.playerInfo.players[uuid]) {
      return b.playerInfo.players[uuid].realName
    } else {
      return uuid
    }
  }
  b.playerInfo.findDisplayName = uuid => {
    if (b.playerInfo.players[uuid]) {
      const displayName = b.playerInfo.players[uuid].displayName.split(' ')
      return displayName[displayName.length - 1]
    } else {
      return '[[[[ No display name ]]]]'
    }
  }
}
