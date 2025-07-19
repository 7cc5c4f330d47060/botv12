import settings from '../settings.js'
import { getMessage } from '../util/lang.js'
const execute = c => {
  const msg = c.args.join(' ').slice(0, 512)
  if (msg.includes(settings.keyTrusted) && c.verify < 1) {
    c.bot.info(getMessage(c.lang, 'command.say.warning.trustedKey'))
    return
  } else if (msg.includes(settings.keyOwner) && c.verify < 2) {
    c.bot.info(getMessage(c.lang, 'command.say.warning.ownerKey'))
    return
  }

  if (c.verify < 1) {
    c.bot.tellraw('@a', {
      translate: '%s %s: %s',
      color: 'white',
      with: [
        {
          translate: '[%s]',
          color: 'dark_red',
          bold: true,
          with: [
            {
              text: 'OP',
              color: 'red'
            }
          ]
        },
        {
          text: c.bot._client.username,
          color: 'red'
        },
        msg
      ]
    })
    return
  }
  c.bot.chat(msg)
}
const consoleIndex = true
const aliases = ['echo']
export { execute, consoleIndex, aliases }
