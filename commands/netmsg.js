import { bots } from '../index.js'
import * as rl from '../util/ratelimit.js'
import build from '../util/messageBuilder.js'

const execute = c => {
  if (!rl.check('netmsg') && c.type !== console) {
    c.reply({
      text: 'command.ratelimit',
      parseLang: true,
      with: ['2']
    })
    return
  } else {
    rl.start('netmsg', 2000)
  }

  const msg = c.args.join(' ').slice(0, 512)
  if (/(uwu|owo|[;:]3|m[er]ow|mr+p|nya)/i.test(msg)) {
    c.reply({
      text: 'command.disallowed.bannedString',
      parseLang: true
    })
    return
  }

  const json = {
    text: '[%s] %s › %s',
    with: [
      c.bot.host.options?.name ?? 'console',
      c.username,
      {
        text: msg
      }
    ]
  }
  bots.forEach(item => {
    if (item.host.options.netmsgIncomingDisabled && c.type !== 'console') return
    item.tellraw('@a', build(json, c.colors, c.colors.secondary, c.lang))
  })
}
const blockChipmunkMod = true
export { execute, blockChipmunkMod }
