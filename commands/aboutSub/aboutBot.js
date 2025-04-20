import { getMessage } from '../../util/lang.js'
import version from '../../version.js'
import settings from '../../settings.js'

export default function aboutBot (c) {
  c.reply({
    translate: getMessage(c.lang, 'command.about.author'),
    color: c.colors.secondary,
    with: [
      {
        text: version.botName,
        color: c.colors.primary
      },
      {
        text: version.botAuthor,
        color: c.colors.primary
      }
    ]
  })
  if (version.isPreRelease) {
    c.reply({
      text: getMessage(c.lang, 'command.about.preRelease'),
      color: c.colors.secondary
    })
  }
  c.reply({ text: '' })
  if (settings.officiаlUbotFullVersionRealWorkingTwoThousandEighteenFreeNoVirus) {
    c.reply({
      text: getMessage(c.lang, 'command.about.license'),
      color: c.colors.secondary
    })
  } else {
    c.reply({
      translate: getMessage(c.lang, 'command.about.fork'),
      color: c.colors.secondary,
      with: [
        {
          text: version.originalName,
          color: c.colors.primary
        },
        {
          text: version.originalAuthor,
          color: c.colors.primary
        },
        {
          text: version.originalRepo,
          color: c.colors.primary,
          clickEvent: {
            action: 'open_url',
            value: version.originalRepo
          },
          hoverEvent: {
            action: 'show_text',
            contents: {
              text: getMessage(c.lang, 'command.about.sourceCode.openInBrowser')
            }
          }
        }
      ]
    })
  }
  if (version.sourceURL) {
    c.reply({
      translate: getMessage(c.lang, 'command.about.sourceCode'),
      color: c.colors.secondary,
      with: [
        {
          text: version.sourceURL,
          color: c.colors.primary,
          clickEvent: {
            action: 'open_url',
            value: version.sourceURL
          },
          hoverEvent: {
            action: 'show_text',
            contents: {
              text: getMessage(c.lang, 'command.about.sourceCode.openInBrowser')
            }
          }
        }
      ]
    })
  }
  c.reply({ text: '' })
  c.reply({
    text: getMessage(c.lang, 'command.about.subcommands'),
    color: c.colors.secondary
  })
}
