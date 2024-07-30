const { bot } = require('../../index.js')
module.exports = {
  execute: (c) => {
    const json = {
      translate: '[%s] %s: %s',
      with: [
        {
          translate: '%s:%s',
          with: [
            {
              text: c.host,
              color: c.colors.primary
            },
            {
              text: c.port + '',
              color: c.colors.primary
            }
          ],
          color: c.colors.secondary
        },
        {
          text: c.username,
          color: c.colors.primary
        },
        {
          text: c.args.join(' ')
        }
      ],
      color: 'white'
    }
    for (const i in bot) {
      bot[i].tellraw('@a', json)
    }
  }
}
