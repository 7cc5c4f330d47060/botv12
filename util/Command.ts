import CommandContext from "./CommandContext";

export default class Command {
  name: string
  execute: (c: CommandContext) => void
  level: number
  hidden: boolean
  aliases: string[]
  consoleIndex: boolean
  consoleOnly: boolean
  debugOnly: boolean
  blockChipmunkMod: boolean

  constructor () {
    this.name = 'command'
    this.execute = async (c: CommandContext) => { c.reply("Testing") }
    this.level = 0
    this.hidden = false
    this.aliases = []
    this.consoleIndex = false
    this.consoleOnly = false
    this.debugOnly = false
    this.blockChipmunkMod = false

          /*
      command.name = name
      command.execute = payload
      command.level = level
      command.hidden = hidden
      if (aliases) for (const alias of aliases) this._aliases[alias] = name
      command.aliases = aliases
      command.consoleIndex = consoleIndex
      command.consoleOnly = consoleOnly
      command.debugOnly = debugOnly
      command.blockChipmunkMod = blockChipmunkMod
      */
  }
}