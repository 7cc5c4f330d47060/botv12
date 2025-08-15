import { getConnection } from '../util/database.js'
import { inspect } from 'node:util'

async function execute (c) {
  const connection = await getConnection()
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
