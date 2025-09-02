import * as index from '../index.ts' // Not used in the code, but may be used by users of the command
import { inspect } from 'node:util'
import settings from '../settings.js'
//import chatlog from '../util/chatlog.js'

async function execute (c) {
  const payload = c.args.join(' ')
  let result
  try {
    result = inspect(eval(payload))
  } catch (e) {
    result = inspect(e)
  }
  console.log(result)
}
const level = 2
const consoleOnly = true
const debugOnly = true
export { execute, level, consoleOnly, debugOnly }
