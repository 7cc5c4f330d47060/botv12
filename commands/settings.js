const { languages, getMessage } = require('../util/lang.js')
const fs = require('fs')
module.exports = {
  execute: (c) => {
    if (c.type === 'console') {
      c.reply({
        text: getMessage(c.lang, 'command.settings.disabled.console'),
        color: c.colors.secondary
      })
      return
    }
    const subcmd = c.args.splice(0, 1)[0]
    switch (subcmd) {
      case 'set':{
        const allowedKeys = ['colorPrimary', 'colorSecondary', 'lang']
        const key = c.args.splice(0, 1)[0]
        if (!allowedKeys.includes(key)) {
          c.reply({
            text: getMessage(c.lang, 'command.settings.error.invalidKey'),
            color: c.colors.secondary
          })
          return
        }
        const value = c.args.join(' ')
        if (value === '' && key === 'lang') {
          // Show all valid languages to user
          for (const item of languages) {
            c.reply({
              translate: '%s (%s)',
              color: c.colors.secondary,
              with: [
                {
                  text: getMessage(item, 'language.name'),
                  color: c.colors.primary
                },
                {
                  text: getMessage(item, 'language.region'),
                  color: c.colors.primary
                }
              ],
              hoverEvent: {
                action: 'show_text',
                value: {
                  translate: getMessage(item, 'command.settings.setLanguage'),
                  with: [
                    {
                      text: `${c.prefix}settings set lang ${item}`,
                      color: c.colors.secondary
                    }
                  ]
                }
              }
            })
          }
          return
        }
        if (value === '') {
          c.reply({
            text: getMessage(c.lang, 'command.settings.error.mustProvideValue'),
            color: c.colors.secondary
          })
          return
        }
        if (key === 'lang' && !languages.includes(value)) {
          c.reply({
            text: getMessage(c.lang, 'command.settings.error.invalidLanguage'),
            color: c.colors.secondary
          })
          return
        }
        c.prefs[key] = value

        // Save to file
        fs.writeFileSync(`userPref/${c.uuid}.json`, JSON.stringify(c.prefs))

        // Delete require cache
        for (const i in require.cache) {
          if (i.endsWith(`${c.uuid}.json`)) delete require.cache[i]
        }
        c.reply({
          text: getMessage(c.lang, 'command.settings.saved'),
          color: c.colors.secondary
        })
        break
      }
      case 'get':
        c.reply({
          translate: '%s: %s',
          color: c.colors.primary,
          with: [
            {
              text: getMessage(c.lang, 'command.settings.get.colorPrimary'),
              color: c.colors.secondary
            },
            {
              text: c.colors.primary,
              color: c.colors.primary
            }
          ]
        })
        c.reply({
          translate: '%s: %s',
          color: c.colors.primary,
          with: [
            {
              text: getMessage(c.lang, 'command.settings.get.colorSecondary'),
              color: c.colors.secondary
            },
            {
              text: c.colors.secondary,
              color: c.colors.secondary
            }
          ]
        })
        c.reply({
          translate: '%s: %s (%s)',
          color: c.colors.primary,
          with: [
            {
              text: getMessage(c.lang, 'command.settings.get.language'),
              color: c.colors.secondary
            },
            {
              text: getMessage(c.lang, 'language.name'),
              color: c.colors.primary
            },
            {
              text: getMessage(c.lang, 'language.region'),
              color: c.colors.primary
            }
          ]
        })
        break
      default:
        c.reply({
          translate: getMessage(c.lang, 'command.cloop.error.subcommand'),
          color: c.colors.secondary,
          with: [
            {
              text: `${c.prefix}help settings`,
              color: c.colors.primary
            }
          ]
        })
    }
  }
}
