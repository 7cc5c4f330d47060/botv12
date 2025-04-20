import { getMessage } from '../../util/lang.js'
import { bots } from '../../index.js'

export default function displayServerList (c) {
  bots.forEach((item, i) => {
    if (c.bot.id === i && c.bot.host.options.hideLocally) return
    if (item.host.options && item.host.options.hidden && c.verify !== 2 && c.bot.id !== i) return
    let host = item.host.host
    const port = item.host.port
    if (item.host.options && item.host.options.displayAsIPv6) {
      host = `[${host}]`
    }
    c.reply({
      translate: getMessage(c.lang, 'command.about.serverListItem'),
      color: c.colors.secondary,
      with: [
        {
          text: i.toString(),
          color: c.colors.primary
        },
        {
          text: `${host}:${port}`,
          color: c.colors.primary,
          clickEvent: {
            action: 'copy_to_clipboard',
            value: `${host}:${port}`
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
  })
}
