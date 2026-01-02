import Command from "./Command.js"
import UnknownCommand from "./UnknownCommand.js"

export default class CommandRegistry {
  _commands: Record<string, Command>
  _aliases: Record<string, string>
  register: (command: Command) => void
  getCommand: (name: string) => Command
  listCommands: (includeHidden?: boolean) => Record<string, Command>
  constructor () {
    this._commands = Object.create(null)
    this._aliases = Object.create(null)

    this.register = function (command: Command) {

      this._commands[command.name] = command
    }

    this.getCommand = function (name: string) {
      if (this._commands[name]) {
        return this._commands[name]
      }
      if (this._aliases[name]) {
        return this._commands[this._aliases[name]]
      }
      return new UnknownCommand()
    }

    this.listCommands = function (includeHidden?: boolean) {
      if (includeHidden) return this._commands
      const list: Record<string, Command> = {}
      for (const item in this._commands) {
        if (!this._commands[item].hidden) list[item] = this._commands[item]
      }
      return list
    }
  }
}
