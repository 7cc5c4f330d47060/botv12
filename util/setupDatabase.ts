import SettingsType from './interface/SettingsType.js'
import { resolve } from 'node:path'
declare global {
  var settings: SettingsType
  var dbEnabled: boolean
  var baseDir: string
}
globalThis.baseDir = process.cwd()
globalThis.dbEnabled = false

import(resolve(baseDir, 'settings.js')).then(async settingsFile => {
  globalThis.settings = settingsFile.default
  run()
})

async function run () {
  const db = await import('./database.js')

  const connection = await db.getConnection()
  if(!connection) return
  
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
  //db.pool.end()
}