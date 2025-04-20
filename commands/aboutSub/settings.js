import { getMessage } from '../../util/lang.js'
import settings from '../../settings.js'

export default function displaySettings (c) {
  const reply = function (name, item) {
    return {
      translate: '%s: %s',
      color: c.colors.primary,
      with: [
        {
          text: getMessage(c.lang, `command.about.settings.${name}`),
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
            }
          }
        }
      ]
    }
  }
  for (const i in settings) {
    const output = settings[i] + ''
    if (i === 'colors' || i === 'servers') continue
    if (i === 'keyTrusted' || i === 'keyOwner' || i === 'onlineEmail' || i === 'onlinePass') continue
    c.reply(reply(i, output))
  }
  for (const i in settings.colors) {
    const output = settings.colors[i] + ''
    c.reply(reply(i, output))
  }
}
