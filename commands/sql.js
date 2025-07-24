import { default as db } from '../util/database.js'
import settings from '../settings.js'
import { inspect } from 'node:util'

if(settings.dbEnabled){
  const connection = await db.pool.getConnection();
  connection.query(`USE ${settings.dbName}`)
}

async function execute(c){
  const payload = c.args.join(' ')
  let result
  try {
    result = await connection.query(payload)
  } catch (e) {
    result = e
  }
  console.log(inspect(result))
}
const level = 2
const consoleOnly = true
export { execute, level, consoleOnly }
