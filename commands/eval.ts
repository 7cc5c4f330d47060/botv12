import { bots, createBot } from '../index.js'
import { inspect } from 'node:util'
import CommandContext from '../util/CommandContext'

async function execute (c: CommandContext) {
  c.reply({text:"No eval for you"})
  return
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
const level = 3
const debugOnly = true
export { execute, level, debugOnly }
