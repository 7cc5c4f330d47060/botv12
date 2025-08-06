import { default as db } from '../util/database.js'
import settings from '../settings.js'

let connection;
if(settings.dbEnabled){
  connection = await db.getConnection();
}

async function execute(c){
  const name = c.args.join(' ')
  let joinCount;
  let lastSeen;
  let userName;
  let player
  if (/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/.test(name)) { // Uuid code
    player = await connection.query('SELECT * FROM seenPlayers WHERE uuid = ?', [name]);
  } else { // Username code
    player = await connection.query('SELECT * FROM seenPlayers WHERE userName = ?', [name]);
  }
  if(player.length >= 1){
    joinCount = player[0].joinCount ?? 0;
    lastSeen = player[0].lastSeen ?? 0n;
    userName = player[0].userName ?? '';
    c.reply({
      text:'command.seen.success', 
      parseLang: true, 
      with: [
        userName, 
        Date(Number(lastSeen)), 
        joinCount,
        {
          text:`command.seen.success.time${(joinCount == 1) ? '' : 'Plural'}`, 
          parseLang: true, 
        }
      ]
    })
  } else {
    c.reply({
      text:'command.seen.neverSeen', 
      parseLang: true, 
      with: [
        name
      ]
    })
  }
}

export { execute }
