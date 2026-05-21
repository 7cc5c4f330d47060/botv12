import { readFile } from 'node:fs/promises'
import type SettingsType from '../interface/SettingsType.js'
import { resolve } from 'node:path'
declare global {
  var settings: SettingsType
  var dbEnabled: boolean
  var baseDir: string
  var dataDir: string
}
globalThis.baseDir = process.cwd()
globalThis.dataDir = resolve(baseDir, 'data')
globalThis.dbEnabled = false

const settingsData = (await readFile(resolve(dataDir, 'settings.json'))).toString('utf-8')
globalThis.settings = JSON.parse(settingsData)

async function run () {
  const db = await import('./database.js')

  const connection = await db.getConnection()
  if (!connection) return

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
  if (db.pool) db.pool.end()
}

await run();
