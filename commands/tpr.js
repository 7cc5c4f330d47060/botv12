import { getMessage } from '../util/lang.js'

const execute = c => {
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
      text: 'command.tpr.success',
      parseLang: true,
      with: [
        c.username,
        originalPos.x.toString(),
        originalPos.y.toString(),
        originalPos.z.toString()
      ]
    }
  )
  c.bot.ccq.push(`/essentials:tp ${uuid} ${originalPos.x}.0 ${originalPos.y} ${originalPos.z}.0`)
}
const consoleIndex = true
const aliases = ['rtp']

export { execute, consoleIndex, aliases }
