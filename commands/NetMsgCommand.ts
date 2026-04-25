import * as rl from '../util/hf/ratelimit.js'
import build from '../util/text/messageBuilder.js'
import CommandContext from '../util/game/botcmd/CommandContext.js'
import Command from '../util/game/botcmd/Command.js'
import uwuText from '../util/hf/botv8-uwu.js'
import type TextFormat from '../util/interface/TextFormat.js'

export default class NetMsgCommand extends Command {
  constructor () {
    super()
    this.name = 'netmsg'
    this.execute = async (c: CommandContext) => {
      if (clOptions.disableNetMsg) {
        c.reply({ text: 'command.disabled.cli', parseLang: true })
        return
      }
      if (!rl.check('netmsg') && c.type !== 'console') {
        c.reply({
          text: 'command.ratelimit',
          parseLang: true,
          with: ['2']
        })
        return
      } else {
        rl.start('netmsg', 2000)
      }

      let msg = c.args.join(' ').slice(0, 512)
      if (settings.kawaiiMode) msg = uwuText(msg)

      const json: TextFormat = {
        text: '[%s] %s › %s',
        with: [
          { text: c.bot.host?.options.name ?? 'console', color: '$primary' },
          { text: c.username, color: '$primary' },
          { text: msg, color: '$tertiary' }
        ]
      }
      bots.forEach(item => {
        if (item.host.options.netmsgIncomingDisabled && c.type !== 'console') return
        item.commandCore.tellraw('@a', build(json, c.colors, 'white', c.lang))
      })
    }
    this.blockChipmunkMod = true
  }
}
