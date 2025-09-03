import CommandContext from "../util/CommandContext"

async function execute (c: CommandContext) {
  process.exit(1)
}
const aliases = ['exit']
const level = 2
export { execute, aliases, level }
