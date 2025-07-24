import { default as db } from './database.js'
import { getMessage } from './lang.js'
import settings from '../settings.js'

const connection = await db.pool.getConnection();
connection.query(`USE ${settings.dbName}`)
connection.query(`CREATE TABLE seenPlayers (
  userName VARCHAR(255) NOT NULL,
  uuid VARCHAR(255) NOT NULL,
  firstSeen BIGINT UNSIGNED NOT NULL,
  firstHost VARCHAR(255) NOT NULL,
  firstPort SMALLINT UNSIGNED NOT NULL,
  lastSeen BIGINT UNSIGNED NOT NULL,
  lastHost VARCHAR(255) NOT NULL,
  lastPort SMALLINT UNSIGNED NOT NULL,
  joinCount INT UNSIGNED NOT NULL
)`)
db.pool.end()