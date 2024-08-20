export default {
  execute: (c) => {
    c.bot.chat(c.bot.refillCoreCmd)
  },
  consoleIndex: true,
  aliases: ['refillcore', 'rc']
}
