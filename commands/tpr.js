import { getMessage } from '../util/lang.js'

const execute = function (c) {
  let uuid
  if (c.type === 'console') {
    uuid = c.bot._client.uuid
  } else {
    uuid = c.uuid
  }
  const originalPos = {
    x: Math.floor(Math.random() * 2000000) - 1000000,
    y: 100,
    z: Math.floor(Math.random() * 2000000) - 1000000
  }
  c.reply(
    {
      translate: getMessage(c.lang, 'command.tpr.success'),
      color: c.colors.secondary,
      with: [
        {
          text: c.username,
          color: c.colors.primary
        },
        {
          text: originalPos.x.toString(),
          color: c.colors.primary
        },
        {
          text: originalPos.y.toString(),
          color: c.colors.primary
        },
        {
          text: originalPos.z.toString(),
          color: c.colors.primary
        }
      ]
    }
  )
  c.bot.ccq.push(`/essentials:tp ${uuid} ${originalPos.x}.0 ${originalPos.y} ${originalPos.z}.0`)
}
const consoleIndex = true
const aliases = ['rtp']

export { execute, consoleIndex, aliases }
