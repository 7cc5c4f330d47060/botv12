const { bot } = require('../index.js')
const { getMessage } = require('../util/lang.js')
module.exports = {
  execute: (c) => {
    let host = c.host
    let port = c.port
    if (c.bot.host.options && c.bot.host.options.hidden) {
      host = 'localhost' // Makes hidden servers appear as localhost
      port = '25565'
    }
    const json = {
      translate: '[%s] %s: %s',
      with: [
        {
          text: c.serverName,
          hoverEvent: {
            action: 'show_text',
            value: {
              translate: '%s: %s:%s',
              with: [
                {
                  text: getMessage(c.lang, 'command.netmsg.serverAddress'),
                  color: c.colors.primary
                },
                {
                  text: host,
                  color: c.colors.primary
                },
                {
                  text: port + '',
                  color: c.colors.primary
                }
              ],
              color: c.colors.secondary
            }
          },
          color: c.colors.primary
        },
        {
          text: c.username,
          color: c.colors.primary
        },
        {
          text: c.args.join(' ')
        }
      ],
      color: 'white'
    }
    bot.forEach(item => {
      if(item.host.options && item.host.options.netmsgIncomingDisabled && c.type !== "console") return
      item.tellraw('@a', json)
    })
  }
}
