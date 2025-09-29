import settings from '../settings.js'
import CommandContext from '../util/CommandContext'
//import { getMessage } from '../util/lang.js'
async function execute (c: CommandContext) {
  const msg = c.args.join(' ').slice(0, 512)
  if (msg.includes(settings.keyTrusted) && c.verify < 1) {
    return
  } else if (msg.includes(settings.keyOwner) && c.verify < 2) {
    return
  }

  if (c.verify < 1) {
    c.bot.commandCore.tellraw('@a', {
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
  c.bot.clientChat.send(msg)
}
const consoleIndex = true
const aliases = ['echo']
export { execute, consoleIndex, aliases }
