const settings = require('../settings.json')
const version = require('../version.json')
module.exports = {
  execute: (c) => {
    if (c.verify < 1){
      c.bot.tellraw("@a",{
        translate: "%s %s: %s",
        color: "white",
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
                    text: c.bot.prefix[0],
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
  },
  consoleIndex: true,
  aliases: ['echo']
}
