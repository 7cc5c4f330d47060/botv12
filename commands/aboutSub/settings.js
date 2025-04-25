import { getMessage } from '../../util/lang.js'
import settings from '../../settings.js'

export default function displaySettings (c) {
  const reply = function (name, item) {
    return {
      text: 'listItem',
      parseLang: true,
      with: [
        {
          text: name,
          color: "$primary"
        },
        {
          text: item,
          copyable: true
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
