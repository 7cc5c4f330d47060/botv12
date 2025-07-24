import parse3 from '../util/chatparse.js'
import parseNBT from '../util/parseNBT.js'
import { default as db } from '../util/database.js'
import settings from '../settings.js'

const connection = await db.pool.getConnection();
connection.query(`USE ${settings.dbName}`)

export default function load (b) {
  b.players = {}
  b._client.on('player_remove', async function (data) {
    for (const item of data.players) {
      if (!b.players[item]) continue
      delete b.players[item]
      b.emit('playerquit', item)
      await connection.query(`UPDATE seenPlayers 
        SET lastSeen = ?,
        lastHost = ?,
        lastPort = ?
        WHERE uuid = ?`,
      [
        Date.now(),
        b.host.host,
        b.host.port,
        item
      ])
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
      if(settings.dbEnabled) {
        const playerList = await connection.query('SELECT * FROM seenPlayers WHERE uuid = ?', [uuid]);
        if(playerList.length === 0) await connection.query(`INSERT INTO seenPlayers (
          firstSeen, 
          firstHost, 
          firstPort, 
          lastSeen, 
          lastHost, 
          lastPort, 
          userName, 
          uuid, 
          joinCount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
          Date.now(),
          b.host.host,
          b.host.port,
          Date.now(),
          b.host.host,
          b.host.port,
          realName,
          uuid,
          1
        ])
        else {
          let joinCountList = await connection.query('SELECT joinCount FROM seenPlayers WHERE uuid = ?', [uuid]);
          let joinCount = joinCountList[0].joinCount + 1
          if(realName.length) await connection.query(`UPDATE seenPlayers 
            SET userName = ?,
            joinCount = ?,
            lastSeen = ?,
            lastHost = ?,
            lastPort = ?
            WHERE uuid = ?`,
          [
            realName,
            joinCount,
            Date.now(),
            b.host.host,
            b.host.port,
            uuid
          ])
        }
      }
    }
  })

  b.findUUID = name => {
    for (const i in b.players) {
      if (b.players[i].realName === name) {
        return i
      }
    }
    return '00000000-0000-0000-0000-000000000000'
  }
  b.findRealName = name => {
    for (const i in b.players) {
      if (b.players[i].displayName === name) {
        return b.players[i].realName
      }
    }
    return '[[[[ no name ]]]]'
  }
  b.findRealNameFromUUID = uuid => {
    if (b.players[uuid]) {
      return b.players[uuid].realName
    } else {
      return uuid
    }
  }
  b.findDisplayName = uuid => {
    if (b.players[uuid]) {
      const displayName = b.players[uuid].displayName.split(' ')
      return displayName[displayName.length - 1]
    } else {
      return '[[[[ No display name ]]]]'
    }
  }
}
