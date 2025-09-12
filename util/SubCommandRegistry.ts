import CommandRegistry from "./CommandRegistry"

export default class SubCommandRegistry extends CommandRegistry {
  aliases: any
  runCommand: any

  constructor (aliases) {
    super()

    this.aliases = aliases // Alias list sent to the top level command

    this.runCommand = function (context) {
      const args = context.args
      let subcommand
      if (args.length === 0) {
        subcommand = context.cmdName
      } else {
        subcommand = args[0]
      }
      const command = this.getCommand(subcommand)
      command.execute(context)
    }

    this.register = function (name, payload, aliases) {
      if (name !== 'base') this.aliases.push(name)
      const command: any = {}
      command.execute = payload
      if (aliases) {
        for (const alias of aliases) {
          this._aliases[alias] = name
          this.aliases.push(alias)
        }
      }
      command.aliases = aliases
      this._commands[name] = command
    }

    this.getCommand = function (name) {
      name = name.toLowerCase()
      if (this._commands[name]) {
        return this._commands[name]
      } else if (this._aliases[name]) {
        return this._commands[this._aliases[name]]
      } else {
        return this._commands.base
      }
    }
  }
}
