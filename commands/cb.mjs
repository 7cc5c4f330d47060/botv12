export default {
  execute: (c) => {
    c.bot.ccq.push(c.args.join(' '))
  },
  consoleIndex: true,
  aliases: ['commandblock', 'cmdblock']
}
