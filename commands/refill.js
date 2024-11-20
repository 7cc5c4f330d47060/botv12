const execute= (c) => {
  c.bot.chat(c.bot.refillCoreCmd)
}
const consoleIndex= true
const aliases = ['refillcore', 'rc']

export { execute, consoleIndex, aliases }