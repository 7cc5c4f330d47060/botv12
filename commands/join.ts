import { bots, createBot } from '../index.js'
import CommandContext from '../util/CommandContext.js'

async function execute (c: CommandContext) {
  if(c.args[0] === '-s') {
    console.log(bots[+c.args[1]].join())
  } else {
    const options = {
      host: c.args[0],
      port: c.args[1],
      options: {
        name: `temp_${Date.now()}`
      }
    }
    createBot(options)
  }
}
const level = 2
const debugOnly = true
export { execute, level, debugOnly }
