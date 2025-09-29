import { bots, createBot } from '../index.ts'
import { inspect } from 'node:util'
import CommandContext from '../util/CommandContext'

async function execute (c: CommandContext) {
  const index = { 
    bots,
    createBot
  }
  const payload = c.args.join(' ')
  let result
  try {
    result = inspect(eval(payload))
  } catch (e) {
    result = inspect(e)
  }
  console.log(result)
}
const level = 2
const consoleOnly = true
const debugOnly = true
export { execute, level, consoleOnly, debugOnly }
