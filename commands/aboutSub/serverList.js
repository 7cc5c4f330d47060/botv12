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
      text: 'command.about.serverListItem',
      parseLang: true,
      with: [
        i.toString(),
        {
          text: `${host}:${port}`,
          copyable: true
        }
      ]
    })
  })
}
