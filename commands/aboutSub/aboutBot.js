import version from '../../version.js'
import settings from '../../settings.js'

export default function aboutBot (c) {
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
    if (version.originalRepo) {
      c.reply({
        text: 'command.about.sourceCodeFork',
        parseLang: true,
        with: [
          {
            text: version.originalRepo,
            linked: true
          }
        ]
      })
    }
  }
}
