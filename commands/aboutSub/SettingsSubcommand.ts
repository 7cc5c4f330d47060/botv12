import CommandContext from '../../util/CommandContext.js'
import Command from '../../util/Command.js'

export default class SettingsSubcommand extends Command {
  constructor () {
    super()
    this.name = "settings"
    this.execute = async (c: CommandContext) => {
      const reply = function (name: string, item: string) {
        return {
          text: 'listItem',
          parseLang: true,
          with: [
            {
              text: name
            },
            {
              text: item,
              copyable: true
            }
          ]
        }
      }
      for (const i in settings) {
        const output = settings[i] + ''
        if (i === 'colors' || i === 'servers' || i === 'keyTrusted' ||
          i === 'keyOwner' || i === 'onlineEmail' || i === 'onlinePass') continue
        c.reply(reply(i, output))
      }
      for (const i in settings.colors) {
        const output = settings.colors[i] + ''
        c.reply(reply(i, output))
      }
    }
  }
}
