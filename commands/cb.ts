import CommandContext from '../util/CommandContext.js'

async function execute (c: CommandContext) {
  c.bot.commandCore.ccq.push(c.args.join(' '))
}
const consoleIndex = true
const aliases = ['commandblock', 'cmdblock']
export { execute, consoleIndex, aliases }
