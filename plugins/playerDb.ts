import { getConnection } from '../util/database.js'
import Botv12Client from '../util/Botv12Client.js'

export default function load (b: Botv12Client) {
  if (!settings.dbEnabled) return
  b.on('playerdata', async function (uuid: string, displayName: string, realName: string) {
    try {
      const connection = await getConnection()
      const playerList = await connection.query('SELECT * FROM seenPlayers WHERE uuid = ?', [uuid])
      if (playerList.length === 0) {
        await connection.query(`INSERT INTO seenPlayers (
        userName,
        uuid,
        firstSeen,
        firstHost,
        firstPort,
        lastSeen,
        lastHost,
        lastPort,
        joinCount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
          realName,
          uuid,
          Date.now(),
          b.host.host,
          b.host.port,
          Date.now(),
          b.host.host,
          b.host.port,
          1
        ])
      } else {
        const joinCountList = await connection.query('SELECT joinCount FROM seenPlayers WHERE uuid = ?', [uuid])
        const joinCount = joinCountList[0].joinCount + 1
        if (realName.length) {
          await connection.query(`UPDATE seenPlayers
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
      connection.end()
    } catch (e) {
      if(debugMode) console.error(e)
    }
  })
  b.on('playerquit', async function (item: string) {
    try {
      const connection = await getConnection()
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
      connection.end()
    } catch (e) {
      if(debugMode) console.error(e)
    }
  })
}
