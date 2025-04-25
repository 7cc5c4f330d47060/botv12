import { bots } from '../index.js'
import { getMessage } from '../util/lang.js'
import * as rl from '../util/ratelimit.js'
import build from '../util/messageParser.js'
const execute = c => {
  if (!rl.check('netmsg') && c.type !== console) {
    c.reply(getMessage(c.lang, 'command.ratelimit', ['2']))
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
  msg = msg.replace(/:3/g, '') // Block users from sending :3

  const json = {
    text: '[%s] %s › %s',
    with: [
      c.bot.host.options?.name ?? 'console',
      c.username,
      {
        text: msg,
        color: '$tertiary'
      }
    ],
  }
  bots.forEach(item => {
    if (item.host.options.netmsgIncomingDisabled && c.type !== 'console') return
    item.tellraw('@a', console.log(build(json, c.colors, c.colors.secondary, c.lang)))
  })
}

const blockChipmunkMod = true
export { execute, blockChipmunkMod }
