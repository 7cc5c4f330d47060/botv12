import * as mariadb from 'mariadb'
import settings from '../settings.js'

let pool

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

// const connection = await pool.getConnection();
// console.log(connection)

export { pool, getConnection }
