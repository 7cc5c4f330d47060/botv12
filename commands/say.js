module.exports = {
  execute: (c) => {
    if (c.args[0].startsWith('/') && c.verify < 1) return
    c.bot.chat(c.args.join(' ').slice(0,512))
  },
  consoleIndex: true,
  aliases: ['echo']
}
