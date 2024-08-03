module.exports = {
  execute: (c) => {
    c.reply({
      text: c.verify + ''
    })
    c.reply({
      text: c.command
    })
  },
  aliases: ['validate'],
  level: 1
}
