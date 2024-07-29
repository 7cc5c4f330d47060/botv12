const getMessage = require('../../util/lang.js')
module.exports = {
  execute: function (c) {
    let uuid;
    if(c.type == "console"){
      uuid = c.bot._client.uuid;
    } else {
      uuid = c.uuid;
    }
    const original_pos = {
      x: Math.floor(Math.random() * 2000000) - 1000000,
      y: 100,
      z: Math.floor(Math.random() * 2000000) - 1000000
    }
    c.reply(
      {
        translate: getMessage(c.lang,"command.tpr.success"),
        color: c.colors.secondary,
        with: [
          {
            text: c.username,
            color: c.colors.primary
          },
          {
            text: original_pos.x.toString(),
            color: c.colors.primary
          },
          {
            text: original_pos.y.toString(),
            color: c.colors.primary
          },
          {
            text: original_pos.z.toString(),
            color: c.colors.primary
          }
        ]
      }
    )
    c.bot.ccq.push(`/essentials:tp ${uuid} ${original_pos.x}.0 ${original_pos.y} ${original_pos.z}.0`)
  },
  consoleIndex: true,
  aliases: ['rtp']
}
