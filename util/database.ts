import * as mariadb from 'mariadb'

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
  } else {
    if(debugMode) console.warn(`[warning] Unknown database type: ${settings.dbType}`)
  }
}

async function getConnection () {
  const connection = await pool.getConnection()
  connection.query(`USE ${settings.dbName}`)
  return connection
}

export { pool, getConnection }
