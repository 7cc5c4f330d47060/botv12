import * as mariadb from 'mariadb'
import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'node:path'
let pool: mariadb.Pool

if (settings.dbEnabled) {
  if(settings.dbType == 'mysql' || settings.dbType == 'mariadb') {
    pool = await mariadb.createPool({
      host: settings.dbHost,
      user: settings.dbUser,
      password: settings.dbPassword,
      connectionLimit: 10
    })
    dbEnabled = true
  } else if(settings.dbType == 'sqlite') {
    dbEnabled = true
  } else {
    console.warn(`[warning] Unknown database type: ${settings.dbType}`)
  }
}

async function getConnection () {
  if(settings.dbType == 'mysql' || settings.dbType == 'mariadb') {
    const connection = await pool.getConnection()
    connection.query(`USE ${settings.dbName}`)
    return connection
  } else if(settings.dbType == 'sqlite') {
    if(typeof settings.dbHost !== 'string') return
    const database = new DatabaseSync(resolve(dataDir, settings.dbHost));
    return {
      query: async function (a: string, d: (number | string)[] = []) {
        return database.prepare(a).all(...d)
      }
    }
  } else {
    return {
      query: async function () {
        if(debugMode) console.warn('[warning] An attempt to access the database occurred but the database is disabled.')
        return []
      }
    }
  }
}

export { pool, getConnection }
