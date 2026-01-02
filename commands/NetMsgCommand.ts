import { bots } from '../index.js'
import * as rl from '../util/ratelimit.js'
import build from '../util/messageBuilder.js'
import CommandContext from '../util/CommandContext'
import Command from '../util/Command.js'

export default class NetMsgCommand extends Command {
  constructor () {
    super()
    this.name = 'netmsg'
    this.execute = async (c: CommandContext) => {
      if(clOptions.disableNetMsg){
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
      
      const msg = c.args.join(' ').slice(0, 512)

      const json: {text: string, with: [string, string, {text: string}]} = {
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
        item.commandCore.tellraw('@a', build(json, c.colors, "white", c.lang))
      })
    }
    this.blockChipmunkMod = true
  }
}
