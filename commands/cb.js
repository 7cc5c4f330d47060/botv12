async function execute(c){
  c.bot.ccq.push(c.args.join(' '))
}
const consoleIndex = true
const aliases = ['commandblock', 'cmdblock']
export { execute, consoleIndex, aliases }
