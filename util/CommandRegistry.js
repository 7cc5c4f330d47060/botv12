export default class CommandRegistry {
  constructor () {
    this._commands = Object.create(null)
    this._aliases = Object.create(null)

    this.register = function (name, payload, level, consoleIndex, hidden, aliases, consoleOnly, blockChipmunkMod) {
      const command = {}
      command.name = name
      command.execute = payload
      command.level = level
      command.hidden = hidden
      if (aliases) for (const alias of aliases) this._aliases[alias] = name
      command.aliases = aliases
      command.consoleIndex = consoleIndex
      command.consoleOnly = consoleOnly
      command.blockChipmunkMod = blockChipmunkMod
      this._commands[name] = command
    }

    this.getCommand = function (name) {
      if (this._commands[name]) {
        return this._commands[name]
      }
      if (this._aliases[name]) {
        return this._commands[this._aliases[name]]
      }
      return false
    }

    this.listCommands = function (includeHidden) {
      if (includeHidden) return this._commands
      const list = {}
      for (const item in this._commands) {
        if (!this._commands[item].hidden) list[item] = this._commands[item]
      }
      return list
    }
  }
}
