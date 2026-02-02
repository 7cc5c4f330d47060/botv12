import * as mariadb from 'mariadb'

let pool: mariadb.Pool

if (settings.dbEnabled) {
  pool = await mariadb.createPool({
    host: settings.dbHost,
    user: settings.dbUser,
    password: settings.dbPassword,
    connectionLimit: 10
  })
}

async function getConnection () {
  const connection = await pool.getConnection()
  connection.query(`USE ${settings.dbName}`)
  return connection
}

export { pool, getConnection }
