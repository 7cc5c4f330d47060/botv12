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

//const connection = await pool.getConnection();
//console.log(connection)

export default { pool }