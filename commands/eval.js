import * as index from "../index.js" // Not used in the code, but may be used by users of the command
import { getMessage } from '../util/lang.js'

const execute = (c) => {
  if(c.verify != 2){
    c.reply({
      text: getMessage(c.lang, "command.disallowed.perms.short")
    })
    c.reply({
      text: getMessage(c.lang, "command.disabled.nonConsole")
    })
    return
  }
  const item = eval(c.args.join(' '))
  if (c.type === 'console') {
    console.log(item)
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
          text: item + '',
          color: c.colors.primary,
          clickEvent: {
            action: 'copy_to_clipboard',
            value: item + ''
          },
          hoverEvent: {
            action: 'show_text',
            contents: {
              text: getMessage(c.lang, 'copyText'),
              color: c.colors.secondary
            },
            value: { // Added twice for backwards compatibility
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

