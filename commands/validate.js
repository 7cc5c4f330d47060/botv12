const { getMessage } = require('../util/lang.js')
module.exports = {
  execute: (c) => {
    const permsN = getMessage(c.lang, 'command.help.permsNormal')
    const permsT = getMessage(c.lang, 'command.help.permsTrusted')
    const permsO = getMessage(c.lang, 'command.help.permsOwner')
    const permsC = getMessage(c.lang, 'command.help.permsConsole')
    c.reply({
      translate: getMessage(c.lang, 'command.verify.success'),
      color: c.colors.secondary,
      with: [
        {
          text: [permsN, permsT, permsO, permsC][c.verify],
          color: c.colors.primary
        }
      ]
    })
  },
  aliases: ['verify'],
  level: 1
}
