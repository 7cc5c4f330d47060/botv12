import settings from '../settings.js'
import version from '../version.js'
const execute = (c) => {
  if (c.verify < 1) {
    c.bot.tellraw('@a', {
      translate: '%s %s: %s',
      color: 'white',
      with: [
        {
          translate: '[%s]',
          color: 'white',
          with: [
            {
              translate: '%s: %s',
              color: settings.colors.secondary,
              with: [
                {
                  text: 'Prefix'
                },
                {
                  text: settings.prefixes[0],
                  color: settings.colors.primary
                }
              ]
            }
          ]
        },
        {
          text: version.botName,
          color: settings.colors.primary
        },
        c.args.join(' ').slice(0, 512)
      ]
    })
    return
  }
  c.bot.chat(c.args.join(' ').slice(0, 512))
}
const consoleIndex = true
const aliases = ['echo']
export { execute, consoleIndex, aliases }
