
import Command from '../util/Command.js'
import CommandContext from '../util/CommandContext.js'
//import { getMessage } from '../util/lang.js'
export default class SayCommand extends Command {
  constructor () {
    super()
    this.name = 'say'
    this.execute = async (c: CommandContext) => {
      const msg = c.args.join(' ').slice(0, 512)
      if (msg.includes(settings.keyTrusted) && c.verify < 1) {
        return
      } else if (msg.includes(settings.keyOwner) && c.verify < 2) {
        return
      }

      if (c.verify < 1) {
        c.bot.commandCore.tellraw('@a', {
          translate: '%s %s: %s',
          color: 'white',
          with: [
            {
              translate: '[%s]',
              color: 'dark_red',
              bold: true,
              with: [
                {
                  text: 'OP',
                  color: 'red'
                }
              ]
            },
            {
              text: c.bot._client?.username ?? '',
              color: 'red'
            },
            msg
          ]
        })
        return
      }
      c.bot.clientChat.send(msg)
    }
    this.consoleIndex = true
    this.aliases = ['echo']
  }
}
