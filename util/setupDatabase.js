import { default as db } from './database.js'
import { getMessage } from './lang.js'
import settings from '../settings.js'

const connection = await db.pool.getConnection();
connection.query(`USE ${settings.dbName}`)
connection.query(`CREATE TABLE seenPlayers (
  firstSeen BIGINT UNSIGNED,
  firstHost VARCHAR(255),
  firstPort SMALLINT UNSIGNED,
  lastSeen BIGINT UNSIGNED,
  lastHost VARCHAR(255),
  lastPort SMALLINT UNSIGNED,
  userName VARCHAR(255),
  uuid VARCHAR(255),
  joinCount INT UNSIGNED
)`)
db.pool.end()