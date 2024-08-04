const version = require('../version.json')
const { getMessage } = require('../util/lang.js')
const botVersion = require('../util/version.js')
module.exports = {
  execute: function (c) {
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
    c.reply({ text: '' })
    c.reply({
      translate: getMessage(c.lang, 'command.about.version'),
      color: c.colors.secondary,
      with: [
        {
          text: botVersion,
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
            },
            value: { // Added twice for backwards compatibility
              text: getMessage(c.lang, 'command.about.sourceCode.openInBrowser')
            }
          }
        }
      ]
    })
    c.reply({ text: '' })
    c.reply({
      translate: getMessage(c.lang, 'command.about.serverinfo'),
      color: c.colors.secondary,
      with: [
        {
          translate: '"%s"',
          color: c.colors.secondary,
          with: [
            {
              text: 'serverinfo',
              color: c.colors.primary
            }
          ]
        }
      ]
    })
  },
  aliases: ['info']
}
