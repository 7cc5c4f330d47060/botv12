import * as index from '../index.js' // Not used in the code, but may be used by users of the command
import { getMessage } from '../util/lang.js'
import { inspect } from 'node:util'
import settings from '../settings.js'
import chatlog from '../util/chatlog.js'

const execute = c => {
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
  if (c.type === 'console') {
    console.log(result)
  } else {
    c.reply({
      translate: '%s: %s',
      color: c.colors.primary,
      with: [
        {
          text: getMessage(c.lang, 'command.eval.output'),
          color: c.colors.secondary
        },
        {
          text: result + '',
          color: c.colors.primary,
          clickEvent: {
            action: 'copy_to_clipboard',
            value: result + ''
          },
          hoverEvent: {
            action: 'show_text',
            contents: {
              text: getMessage(c.lang, 'copyText'),
              color: c.colors.secondary
            }
          }
        }
      ]
    })
  }
}
const level = 2
export { execute, level }
