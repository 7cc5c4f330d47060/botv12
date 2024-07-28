const version = require('../../version.json')
const settings = require('../../settings.json')
const getMessage = require('../../util/lang.js')
const cp = require('child_process')
module.exports = {
  execute: function (c) {
    c.reply({
      translate: getMessage(c.lang, 'command.about.author'),
      color: c.colors.secondary,
      with: [
        {
          text: settings.name,
          color: c.colors.primary
        }
      ]
    })
    c.reply({ text: '' })
    const botVersion = version.bot
    let gitCommit
    try {
      gitCommit = cp.execSync('git rev-parse --short HEAD').toString('UTF-8').split('\n')[0]
    } catch (e) {
      gitCommit = false
    }
    if (gitCommit) {
      c.reply({
        translate: getMessage(c.lang, 'command.about.version'),
        color: c.colors.secondary,
        with: [
          [
            {
              text: botVersion,
              color: c.colors.primary
            },
            {
              translate: ' (%s)',
              color: 'white',
              with: [
                {
                  text: gitCommit,
                  color: c.colors.primary
                }
              ]
            }
          ]
        ]
      })
    } else {
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
    }
    c.reply({ text: '' })
    c.reply({
      translate: getMessage(c.lang, 'command.about.serverinfo'),
      color: c.colors.secondary,
      with: [
        {
          translate: '"%s"',
          color: 'white',
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
