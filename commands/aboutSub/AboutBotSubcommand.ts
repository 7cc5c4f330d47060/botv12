import version from '../../version.js'
import versionUtil from '../../util/version.js'
import CommandContext from '../../util/CommandContext.js'
import Command from '../../util/Command.js'

export default class AboutBotSubcommand extends Command {
  constructor () {
    super()
    this.name = "base"
    this.execute = async (c: CommandContext) => {
      c.reply({
        text: 'command.about.author',
        parseLang: true,
        color: '$secondary',
        with: [
          { text: version.botName, color: '$primary' },
          { text: version.botAuthor, color: '$primary' }
        ]
      })
      c.reply({
        text: 'command.about.version',
        parseLang: true,
        color: '$secondary',
        with: [
          { text: versionUtil, color: '$primary' }
        ]
      })
      for(const item of version.newCopyright) {
        c.reply({
          text: 'command.about.copyright',
          parseLang: true,
          color: '$secondary',
          with: [
            item.date,
            item.name
          ]
        })
      }
      c.reply({
        text: 'command.about.copyright.agpl',
        parseLang: true,
        color: '$secondary',
        with: [
          {
            text: 'clickHere',
            parseLang: true,
            color: '$primary',
            command: `${c.prefix}about license --info`
          }
        ]
      })
      /**/
      if (version.sourceURL) {
        c.reply({
          text: 'command.about.sourceCode',
          parseLang: true,
          with: [
            {
              text: version.sourceURL,
              linked: true,
              color: '$primary'
            }
          ]
        })
      } else process.exit(1)
    }
  }
}
