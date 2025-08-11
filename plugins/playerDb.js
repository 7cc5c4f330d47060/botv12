import { default as db } from '../util/database.js'
import settings from '../settings.js'


export default function load (b) {
  if(!settings.dbEnabled) return
  b.on('playerdata', async function (uuid, displayName, realName) {
    try {
      const connection = await db.getConnection();
      const playerList = await connection.query('SELECT * FROM seenPlayers WHERE uuid = ?', [uuid]);
      if(playerList.length === 0) await connection.query(`INSERT INTO seenPlayers (
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
      connection.end();
    } catch (e) {

    }
  })
  b.emit('playerquit', async function (item){
    try {
      const connection = await db.getConnection();
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
      connection.end();
    } catch (e) {

    }
  })
}

