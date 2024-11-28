import { getMessage } from '../util/lang.js'

const execute = (c) => {
  const permsN = getMessage(c.lang, 'command.help.permsNormal')
  const permsT = getMessage(c.lang, 'command.help.permsTrusted')
  const permsO = getMessage(c.lang, 'command.help.permsOwner')
  c.reply({
    translate: getMessage(c.lang, 'command.verify.success'),
    color: c.colors.secondary,
    with: [
      {
        text: [permsN, permsT, permsO][c.verify],
        color: c.colors.primary
      }
    ]
  })
}
const aliases = ['verify']
const level = 1

export { execute, aliases, level }
