import { default as db } from '../util/database.js'
import settings from '../settings.js'
import { inspect } from 'node:util'


async function execute(c){
  const connection = await db.getConnection();
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
const debugOnly = true
export { execute, level, consoleOnly, debugOnly }
