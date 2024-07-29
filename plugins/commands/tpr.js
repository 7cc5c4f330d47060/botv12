module.exports = {
  execute: function (c) {
    if(c.type == console) return; //this can not run at console
    const original_pos = {
      x: Math.floor(Math.random() * 2000000) - 1000000,
      y: 100,
      z: Math.floor(Math.random() * 2000000) - 1000000
    }
    c.reply(
      {
        translate: 'Teleporting %s to %s, %s, %s',
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
    c.bot.ccq.push(`/essentials:tp ${c.uuid} ${original_pos.x}.0 ${original_pos.y} ${original_pos.z}.0`)
  },
  desc: 'Teleport to a random location',
  usage: ' [-s]',
  aliases: ['rtp']
}
