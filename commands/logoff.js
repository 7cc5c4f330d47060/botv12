async function execute (c) {
  if (c.args[0] == '-n') c.bot.disconnect = true
  c.bot._client.end()
}
const consoleIndex = true
const level = 2
export { execute, consoleIndex, level }
