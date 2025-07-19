import { bots } from '../index.js'
import * as rl from '../util/ratelimit.js'
import build from '../util/messageBuilder.js'

async function execute(c){
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
