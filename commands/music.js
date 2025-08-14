async function execute (c) {
  c.reply({
    text: 'command.error.notImplemented',
    parseLang: true
  })
}
const consoleIndex = true
export { execute, consoleIndex }