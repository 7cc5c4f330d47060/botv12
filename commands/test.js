import { getMessage } from '../util/lang.js'
const execute = (c) => {
  const reply = function (name, item) {
    return {
      translate: '%s: %s',
      color: c.colors.primary,
      with: [
        {
          text: getMessage(c.lang, `command.test.${name}`),
          color: c.colors.secondary
        },
        {
          text: item,
          color: c.colors.primary,
          clickEvent: {
            action: 'copy_to_clipboard',
            value: item
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
    }
  }
  c.reply(reply('uuid', c.uuid))
  c.reply(reply('username', c.username))
  c.reply(reply('nickname', c.nickname))
  c.reply(reply('command', c.command.slice(0, 1024)))
  c.reply(reply('msgType', c.msgType))
  c.reply(reply('msgSubtype', c.msgSubtype))
  c.reply(reply('prefix', c.prefix))
  c.reply(reply('args', c.args.join(', ').slice(0, 1024)))
  c.reply(reply('verify', c.verify.toString()))
  c.reply(reply('host', c.host))
  c.reply(reply('port', c.port.toString()))
  c.reply(reply('lang', c.lang))
  c.reply(reply('colorPrimary', c.colors.primary))
  c.reply(reply('colorSecondary', c.colors.secondary))
  c.reply(reply('colorTertiary', c.colors.tertiary))
  c.reply(reply('colorWarning', c.colors.warning))
  c.reply(reply('colorError', c.colors.error))
  c.reply(reply('colorFatalError', c.colors.fatalError))
}
export { execute }
