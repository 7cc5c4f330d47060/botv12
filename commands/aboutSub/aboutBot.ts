import version from '../../version.js'
import CommandContext from '../../util/CommandContext.js'

export default async function aboutBot (c: CommandContext) {
  c.reply({
    text: 'command.about.author',
    parseLang: true,
    with: [
      version.botName,
      version.botAuthor
    ]
  })
  for(const item of version.newCopyright) {
    c.reply({
      text: 'command.about.copyright',
      parseLang: true,
      with: [
        item.date,
        item.name
      ]
    })
  }
  c.reply({
    text: 'command.about.copyright.agpl1',
    parseLang: true
  })
  c.reply({
    text: 'command.about.copyright.agpl2',
    parseLang: true
  })
  c.reply({
    text: 'command.about.copyright.agpl3',
    parseLang: true,
    with: [
      {
        text: 'https://www.gnu.org/licenses/',
        linked: true
      }
    ]
  })
  if (version.sourceURL) {
    c.reply({
      text: 'command.about.sourceCode',
      parseLang: true,
      with: [
        {
          text: version.sourceURL,
          linked: true
        }
      ]
    })
  }

}
