import { bots } from '../index.js'
import { getMessage } from '../util/lang.js'
import * as rl from '../util/ratelimit.js'
const execute = c => {
  if (!rl.check('netmsg') && c.type !== console) {
    c.reply(getMessage(c.lang, "command.ratelimit", ["2"]))
    return
  } else {
    rl.start('netmsg', 2000)
  }
  let host = c.host
  let port = c.port
  if (c.bot.host.options && c.bot.host.options.hidden) {
    host = 'localhost' // Makes hidden servers appear as localhost
    port = '25565'
  } else if (c.bot.host.options && c.bot.host.options.displayAsIPv6) {
    host = `[${host}]`
  }
  let msg = c.args.join(' ').slice(0, 512)
  msg = msg.replace(/:3/g, '')
  const json = {
    translate: '[%s] %s: %s',
    with: [
      {
        text: c.bot.host.options?.name ?? 'console',
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
        text: msg
      }
    ],
    color: c.colors.tertiary
  }
  bots.forEach(item => {
    if (item.host.options.netmsgIncomingDisabled && c.type !== 'console') return
    item.tellraw('@a', json)
  })
  
}

const blockChipmunkMod = true
export { execute, blockChipmunkMod }
