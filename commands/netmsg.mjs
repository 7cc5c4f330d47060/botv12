import { bots } from '../index.mjs'
import { getMessage } from '../util/lang.mjs'
export default {
  execute: (c) => {
    if (c.bot.host && c.bot.host.options.hidden) {
      c.reply({
        text: getMessage(c.lang, 'command.netmsg.disabled'),
        color: c.colors.secondary
      })
      return
    }
    const json = {
      translate: '[%s] %s: %s',
      with: [
        {
          translate: '%s:%s',
          with: [
            {
              text: c.host,
              color: c.colors.primary
            },
            {
              text: c.port + '',
              color: c.colors.primary
            }
          ],
          color: c.colors.secondary
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
    for (const i in bots) {
      if (bots[i].host.options.hidden) continue
      bots[i].tellraw('@a', json)
    }
  }
}
