import * as index from '../index.js' // Not used in the code, but may be used by users of the command
import { inspect } from 'node:util'
import settings from '../settings.js'
import chatlog from '../util/chatlog.js'
import { default as db } from '../util/database.js'

async function execute(c){
  const payload = c.args.join(' ')
  if (!settings.disableLogging && !settings.disableEvalLogging) chatlog('eval', `${c.host}:${c.port} ${c.username} (${c.uuid}) Payload: ${payload}`)
  let result
  try {
    result = inspect(eval(payload))
    if (!settings.disableLogging && !settings.disableEvalLogging) chatlog('eval', `${c.host}:${c.port} ${c.username} (${c.uuid}) Result: ${result}`)
  } catch (e) {
    result = inspect(e)
    if (!settings.disableLogging && !settings.disableEvalLogging) chatlog('eval', `${c.host}:${c.port} ${c.username} (${c.uuid}) Error: ${inspect(e)}`)
  }
  console.log(result)
}
const level = 2
const consoleOnly = true
export { execute, level, consoleOnly }
