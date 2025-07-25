import { default as db } from '../util/database.js'
import settings from '../settings.js'

let connection;
if(settings.dbEnabled){
  connection = await db.pool.getConnection();
  connection.query(`USE ${settings.dbName}`)
}

export default function load (b) {
  if(!settings.dbEnabled) return
  b.on('playerdata', async function (uuid, displayName, realName) {
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
  })
  b.emit('playerquit', async function (item){
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
  })
}

