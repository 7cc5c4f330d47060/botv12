import * as db from './database.js'

const connection = await db.getConnection()

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
