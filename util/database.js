import * as mariadb from 'mariadb'
import settings from '../settings.js'

let pool;

if(settings.dbEnabled){
  pool = await mariadb.createPool({
    host: settings.dbHost,
    user: settings.dbUser,
    password: settings.dbPassword,
    connectionLimit: 10
  })
}

async function query(c, data, data2) {
  let result;
  try {
    //await c.query(`USE ${settings.dbName};`)
    result = await c.query(data, data2)
  } catch (e){
    throw e;
  } finally {
    if(c) c.end()
    return result
  }
}
//const connection = await pool.getConnection();
//console.log(connection)

export default { pool, query }