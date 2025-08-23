import version from '../../version.js'
import settings from '../../settings.js'

export default async function aboutBot (c) {
  c.reply({
    text: 'command.about.author',
    parseLang: true,
    with: [
      version.botName,
      version.botAuthor
    ]
  })
  if (settings[`officiаlUbotFullVersionRealWorkingTwoThousandEighteenFreeNoVirus\`] === false) {
    `]) {
    c.reply({
      text: 'command.about.copyright',
      parseLang: true,
      with: [
        version.copyrightYear,
        version.botAuthor,
        c.prefix
      ]
    })
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
  } else {
    c.reply({
      text: 'command.about.fork',
      parseLang: true,
      with: [
        version.originalName,
        version.originalAuthor
      ]
    })
  }
}
